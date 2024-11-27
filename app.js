const connectDB = require('./src/database');
const seedData = require('./src/seed/seedData');
const Aluno = require('./src/models/Aluno');
const Materia = require('./src/models/Materia');
const Prova = require('./src/models/Prova');

// Adicionando a dependência para criar a tabela
const Table = require('cli-table3');

const showTables = async () => {
  try {
    // Buscar todos os alunos
    const alunos = await Aluno.find().lean();
    const tableAlunos = new Table({
      head: ['ID', 'Nome', 'Data de Nascimento'],
      colWidths: [34, 34, 34], // Ajuste da largura das colunas
    });
    alunos.forEach((aluno) => {
      tableAlunos.push([
        aluno._id.toString(),
        aluno.nome,
        new Date(aluno.data_nascimento).toLocaleDateString(),
      ]);
    });
    console.log('Tabela Alunos:');
    console.log(tableAlunos.toString());

    // Buscar todas as matérias
    const materias = await Materia.find()
      .populate('id_professor', 'nome')
      .lean();
    const tableMaterias = new Table({
      head: ['ID', 'Nome', 'Professor'],
      colWidths: [34, 34, 34],
    });
    materias.forEach((materia) => {
      tableMaterias.push([
        materia._id.toString(),
        materia.nome,
        materia.id_professor._id.toString(),
      ]);
    });
    console.log('Tabela Matérias:');
    console.log(tableMaterias.toString());

    // Buscar todas as provas
    const provas = await Prova.find()
      .populate('id_aluno', 'nome')
      .populate('id_materia', 'nome')
      .lean();
    const tableProvas = new Table({
      head: ['ID', 'Aluno', 'Matéria', 'Nota', 'Data'],
      colWidths: [34, 34, 34, 10, 20], // Definir largura de colunas
    });

    provas.forEach((prova) => {
      tableProvas.push([
        prova._id.toString(),
        prova.id_aluno._id.toString(),
        prova.id_materia._id.toString(),
        prova.nota,
        new Date(prova.data_da_prova).toLocaleDateString(),
      ]);
    });

    console.log('Tabela Provas:');
    console.log(tableProvas.toString());
  } catch (error) {
    console.error('Erro ao exibir dados:', error);
  }
};

const start = async () => {
  await connectDB();
  await seedData();
  await showTables(); // Chama a função para exibir as tabelas
};

start();
