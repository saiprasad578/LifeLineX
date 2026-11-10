const express = require("express");
const mongoose = require("mongoose");
const Record = require("../models/Record");
const modules = require("../config/modules");

const router = express.Router();

function validateData(moduleName, data) {
  const definition = modules[moduleName];
  if (!definition) return "Unknown module.";

  for (const [field, rules] of Object.entries(definition.fields)) {
    const value = data[field];

    if (rules.required && (value === undefined || value === null || String(value).trim() === "")) {
      return `${field} is required.`;
    }

    if (value !== undefined && value !== "" && rules.enum && !rules.enum.includes(value)) {
      return `${field} must be one of: ${rules.enum.join(", ")}.`;
    }

    if (value !== undefined && value !== "") {
      if (rules.type === "Number" && !Number.isFinite(Number(value))) {
        return `${field} must be a number.`;
      }
      if (rules.type === "Date" && Number.isNaN(Date.parse(value))) {
        return `${field} must be a valid date.`;
      }
    }
  }

  return null;
}

// List records for a module
router.get("/:module", async (req, res) => {
  try {
    const { module } = req.params;
    if (!modules[module]) return res.status(404).json({ message: "Module not found." });

    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
    const filter = { module };

    const [items, total] = await Promise.all([
      Record.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Record.countDocuments(filter)
    ]);

    res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: "Could not load records." });
  }
});

// Get one record
router.get("/:module/:id", async (req, res) => {
  try {
    if (!modules[req.params.module]) return res.status(404).json({ message: "Module not found." });
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid record ID." });

    const item = await Record.findOne({ _id: req.params.id, module: req.params.module });
    if (!item) return res.status(404).json({ message: "Record not found." });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Could not load record." });
  }
});

// Create a record
router.post("/:module", async (req, res) => {
  try {
    const { module } = req.params;
    const data = req.body;

    const validationError = validateData(module, data);
    if (validationError) return res.status(400).json({ message: validationError });

    const item = await Record.create({ module, data });
    res.status(201).json({ message: "Record created.", item });
  } catch {
    res.status(500).json({ message: "Could not create record." });
  }
});

// Update a record
router.patch("/:module/:id", async (req, res) => {
  try {
    const { module, id } = req.params;
    if (!modules[module]) return res.status(404).json({ message: "Module not found." });
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid record ID." });

    const existing = await Record.findOne({ _id: id, module });
    if (!existing) return res.status(404).json({ message: "Record not found." });

    const updatedData = { ...existing.data, ...req.body };
    const validationError = validateData(module, updatedData);
    if (validationError) return res.status(400).json({ message: validationError });

    existing.data = updatedData;
    await existing.save();
    res.json({ message: "Record updated.", item: existing });
  } catch {
    res.status(500).json({ message: "Could not update record." });
  }
});

// Delete a record
router.delete("/:module/:id", async (req, res) => {
  try {
    const { module, id } = req.params;
    if (!modules[module]) return res.status(404).json({ message: "Module not found." });
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid record ID." });

    const deleted = await Record.findOneAndDelete({ _id: id, module });
    if (!deleted) return res.status(404).json({ message: "Record not found." });
    res.json({ message: "Record deleted." });
  } catch {
    res.status(500).json({ message: "Could not delete record." });
  }
});

module.exports = router;
