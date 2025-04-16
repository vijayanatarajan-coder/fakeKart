const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Admin", AdminSchema);
