const mongoose = require('mongoose');

const ProvaSchema = new mongoose.Schema({
  id_aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aluno',
    required: true,
  },
  id_materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia',
    required: true,
  },
  nota: { type: Number, required: true },
  data_da_prova: { type: Date, required: true },
});

module.exports = mongoose.model('Prova', ProvaSchema);
