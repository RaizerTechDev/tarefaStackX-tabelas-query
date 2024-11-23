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

    // Chamar as funções de exclusão após conectar ao banco de dados
    await deleteAlunos();
    await deleteProfessores();
    await deleteMaterias();
    await deleteProvas();

    process.exit(0); // Finaliza o processo com sucesso após as exclusões
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  }
};

// Excluir todos os alunos
const deleteAlunos = async () => {
  try {
    const result = await Aluno.deleteMany({});
    console.log("Alunos excluídos:", result);
  } catch (err) {
    console.error("Erro ao excluir alunos:", err);
  }
};

// Excluir todos os professores
const deleteProfessores = async () => {
  try {
    const result = await Professor.deleteMany({});
    console.log("Professores excluídos:", result);
  } catch (err) {
    console.error("Erro ao excluir professores:", err);
  }
};

// Excluir todos as materias
const deleteMaterias = async () => {
  try {
    const result = await Materia.deleteMany({});
    console.log("Materias excluídos:", result);
  } catch (err) {
    console.error("Erro ao excluir materias:", err);
  }
};

// Excluir todos as provas
const deleteProvas = async () => {
  try {
    const result = await Prova.deleteMany({});
    console.log("Provas excluídos:", result);
  } catch (err) {
    console.error("Erro ao excluir provas:", err);
  }
};

// Chamar função de conexão
connectDB();
