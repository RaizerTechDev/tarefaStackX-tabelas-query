require("dotenv").config();
const mongoose = require("mongoose");
const Aluno = require("../models/Aluno");
const Professor = require("../models/Professor");
const Materia = require("../models/Materia");
const Prova = require("../models/Prova");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("Erro: MONGODB_URI não está definido no arquivo .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao MongoDB!");

    // Chamar as funções de listagem após conectar ao banco de dados
    await listAlunos();
    await listProfessores();
    await listMaterias();
    await listProvas();

    process.exit(0); // Finaliza o processo com sucesso após listar os dados
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  }
};

// Listar todos os alunos
const listAlunos = async () => {
  try {
    const alunos = await Aluno.find({});
    console.log("Alunos:", alunos);
  } catch (err) {
    console.error("Erro ao listar alunos:", err);
  }
};

// Listar todos os professores
const listProfessores = async () => {
  try {
    const professores = await Professor.find({});
    console.log("Professores:", professores);
  } catch (err) {
    console.error("Erro ao listar professores:", err);
  }
};

// Listar todas as materias
const listMaterias = async () => {
  try {
    const materias = await Materia.find({});
    console.log("Materias:", materias);
  } catch (err) {
    console.error("Erro ao listar materias:", err);
  }
};

// Listar todas as provas
const listProvas = async () => {
  try {
    const provas = await Prova.find({});
    console.log("Provas:", provas);
  } catch (err) {
    console.error("Erro ao listar provas:", err);
  }
};

// Chamar função de conexão
connectDB();
