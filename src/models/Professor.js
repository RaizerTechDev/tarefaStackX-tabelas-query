const mongoose = require("mongoose");

const ProfessorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data_nascimento: { type: Date, required: true },
});

module.exports = mongoose.model("Professor", ProfessorSchema);
