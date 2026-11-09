const mongoose = require("mongoose");

// A shared schema keeps this starter easy to extend. Module-specific fields
// are validated in the API layer using config/modules.js.
const recordSchema = new mongoose.Schema(
  {
    module: { type: String, required: true, index: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

recordSchema.index({ module: 1, createdAt: -1 });
module.exports = mongoose.model("Record", recordSchema);
