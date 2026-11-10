const mongoose = require("mongoose");

const moduleRecordSchema = new mongoose.Schema({
  module: { type: String, required: true, index: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

moduleRecordSchema.index({ module: 1, createdAt: -1 });
module.exports = mongoose.model("ModuleRecord", moduleRecordSchema);
