const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('Erro: MONGODB_URI não está definido no arquivo .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Conectado ao MongoDB!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
