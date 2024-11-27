const Aluno = require('../models/Aluno');
const Professor = require('../models/Professor');
const Materia = require('../models/Materia');
const Prova = require('../models/Prova');

const seedData = async () => {
  try {
    // Criando professor
    const professor = await Professor.create({
      nome: 'Prof. João Silva',
      data_nascimento: new Date('1975-05-15'),
    });

    // Criando matéria
    const materia = await Materia.create({
      nome: 'Matemática',
      id_professor: professor._id,
    });

    // Criando alunos
    const alunos = await Aluno.insertMany([
      { nome: 'Lucas Gabriel', data_nascimento: new Date('2005-03-20') },
      { nome: 'Gabriel Menezes', data_nascimento: new Date('2004-11-05') },
      { nome: 'Glória Parisi', data_nascimento: new Date('2006-07-15') },
    ]);

    // Criando provas
    const provas = await Prova.insertMany([
      {
        id_aluno: alunos[0]._id,
        id_materia: materia._id,
        nota: 8.5,
        data_da_prova: new Date(),
      },
      {
        id_aluno: alunos[1]._id,
        id_materia: materia._id,
        nota: 9.0,
        data_da_prova: new Date(),
      },
      {
        id_aluno: alunos[2]._id,
        id_materia: materia._id,
        nota: 7.5,
        data_da_prova: new Date(),
      },
    ]);

    console.log('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  }
};

module.exports = seedData;
