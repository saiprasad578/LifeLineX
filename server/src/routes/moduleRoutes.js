const express = require("express");
const mongoose = require("mongoose");
const definitions = require("../config/moduleDefinitions");
const ModuleRecord = require("../models/ModuleRecord");
const { requireAuth, allowRoles } = require("../middleware/auth");

const router = express.Router();
router.use(requireAuth);

function validate(moduleName, data) {
  const definition = definitions[moduleName];
  if (!definition) return "Unknown module.";
  if (!data || typeof data !== "object" || Array.isArray(data)) return "Request body must be an object.";

  for (const [field, rules] of Object.entries(definition.fields)) {
    const value = data[field];
    if (rules.required && (value === undefined || value === null || String(value).trim() === "")) return `${field} is required.`;
    if (value === undefined || value === null || value === "") continue;
    if (rules.type === "enum" && !rules.values.includes(value)) return `${field} must be one of: ${rules.values.join(", ")}.`;
    if (rules.type === "number" && (!Number.isFinite(Number(value)) || Number(value) < 0)) return `${field} must be a non-negative number.`;
    if (rules.type === "date" && Number.isNaN(Date.parse(value))) return `${field} must be a valid date.`;
    if (rules.type === "string" && typeof value !== "string") return `${field} must be text.`;
  }

  if (moduleName === "shiftSchedules" && Date.parse(data.shiftEnd) <= Date.parse(data.shiftStart)) {
    return "Shift end must be later than shift start.";
  }
  if (["responseFeedback", "responseFeedbackAnalysis"].includes(moduleName) && (Number(data.rating) < 1 || Number(data.rating) > 5)) {
    return "Rating must be between 1 and 5.";
  }
  if (moduleName === "shelterRegistrations" && Number(data.occupiedCapacity) > Number(data.totalCapacity)) {
    return "Occupied capacity cannot exceed total capacity.";
  }
  if (moduleName === "incidentImportValidations" && Number(data.validRows) + Number(data.rejectedRows) > Number(data.totalRows)) {
    return "Valid and rejected rows cannot exceed total rows.";
  }
  if (moduleName === "incidentRelationships" && data.sourceIncident === data.relatedIncident) {
    return "An incident cannot be related to itself.";
  }
  if (moduleName === "volunteerAttendanceRecords" && data.checkOutAt && Date.parse(data.checkOutAt) < Date.parse(data.checkInAt)) {
    return "Check-out time cannot be earlier than check-in time.";
  }
  if (moduleName === "equipmentCheckouts" && data.expectedReturnAt && Date.parse(data.expectedReturnAt) < Date.parse(data.checkedOutAt)) {
    return "Expected return time cannot be earlier than checkout time.";
  }
  if (moduleName === "notificationQuietHours" && !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.startTime || "")) {
    return "Start time must use HH:mm format.";
  }
  if (moduleName === "notificationQuietHours" && !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.endTime || "")) {
    return "End time must use HH:mm format.";
  }
  if (moduleName === "medicalSupplyInventory" && Number(data.minimumQuantity) > Number(data.availableQuantity)) {
    // Low stock is allowed; this is a warning state, not a validation failure.
  }

  return null;
}

router.get("/", (_req, res) => {
  res.json(Object.entries(definitions).map(([key, value]) => ({ key, label: value.label, fields: value.fields })));
});

router.get("/:module", async (req, res) => {
  try {
    const { module } = req.params;
    if (!definitions[module]) return res.status(404).json({ message: "Module not found." });

    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
    const [items, total] = await Promise.all([
      ModuleRecord.find({ module }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).populate("createdBy", "name email"),
      ModuleRecord.countDocuments({ module })
    ]);
    res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
  } catch {
    res.status(500).json({ message: "Could not load records." });
  }
});

router.post("/:module", async (req, res) => {
  try {
    const { module } = req.params;
    const issue = validate(module, req.body);
    if (issue) return res.status(400).json({ message: issue });

    const data = { ...req.body };
    for (const [field, rules] of Object.entries(definitions[module].fields)) {
      if (data[field] === undefined && rules.default !== undefined) data[field] = rules.default;
      if (rules.type === "number" && data[field] !== undefined) data[field] = Number(data[field]);
    }
    const item = await ModuleRecord.create({ module, data, createdBy: req.user._id });
    res.status(201).json({ item });
  } catch {
    res.status(500).json({ message: "Could not create record." });
  }
});

router.get("/:module/:id", async (req, res) => {
  try {
    if (!definitions[req.params.module]) return res.status(404).json({ message: "Module not found." });
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid record ID." });
    const item = await ModuleRecord.findOne({ _id: req.params.id, module: req.params.module }).populate("createdBy", "name email");
    if (!item) return res.status(404).json({ message: "Record not found." });
    res.json({ item });
  } catch {
    res.status(500).json({ message: "Could not load record." });
  }
});

router.patch("/:module/:id", async (req, res) => {
  try {
    const { module, id } = req.params;
    if (!definitions[module]) return res.status(404).json({ message: "Module not found." });
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid record ID." });

    const item = await ModuleRecord.findOne({ _id: id, module });
    if (!item) return res.status(404).json({ message: "Record not found." });
    const updated = { ...item.data, ...req.body };
    const issue = validate(module, updated);
    if (issue) return res.status(400).json({ message: issue });

    item.data = updated;
    item.updatedBy = req.user._id;
    await item.save();
    res.json({ item });
  } catch {
    res.status(500).json({ message: "Could not update record." });
  }
});

router.delete("/:module/:id", allowRoles("admin", "operator"), async (req, res) => {
  try {
    const { module, id } = req.params;
    if (!definitions[module]) return res.status(404).json({ message: "Module not found." });
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid record ID." });
    const item = await ModuleRecord.findOneAndDelete({ _id: id, module });
    if (!item) return res.status(404).json({ message: "Record not found." });
    res.json({ message: "Record deleted." });
  } catch {
    res.status(500).json({ message: "Could not delete record." });
  }
});

module.exports = router;
