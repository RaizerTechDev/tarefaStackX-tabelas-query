# Organização Banco de Dados - Airbnb

# Sumário

- [1. Organização e Estrutura do Projeto](#1-organização-e-estrutura-do-projeto)
  - [1.1 Na Raiz](#11-na-raiz)
  - [1.2 Pasta `src`](#12-pasta-src)
    - [1.2.1 Organização por Responsabilidades](#121-organização-por-responsabilidades)
  - [1.3 Conexão e Configuração do Banco de Dados](#13-conexão-e-configuração-do-banco-de-dados)
  - [1.4 Uso do MongoDB e Mongoose](#14-uso-do-mongodb-e-mongoose)
  - [1.5 Flexibilidade e Escalabilidade](#15-flexibilidade-e-escalabilidade)
- [2. Decisões de Design](#2-decisões-de-design)
  - [2.1 Relacionamentos](#21-relacionamentos)
  - [2.2 Estrutura e Campos](#22-estrutura-e-campos)
  - [2.3 Demonstração Tabelas](#23-demonstração-tabelas)
    - [- `models/User.js`](#--modelsuserjs)
    - [- `models/Place.js`](#--modelsplacejs)
    - [- `models/Booking.js`](#--modelsbookingjs)
    - [- `models/Review.js`](#--modelsreviewjs)
- [4. Conclusão](#4-conclusão)

---

## 1. Organização e Estrutura do Projeto

A estrutura do projeto foi projetada com foco em **separação de responsabilidades, modularidade e escalabilidade**, garantindo clareza, manutenibilidade e crescimento sustentável.

### 1.1 Na Raiz

- **`app.js`**

  - Inicializa o projeto conectando ao banco de dados via `connectDB` (definido na pasta `database/index.js`).
  - Popula o banco com dados iniciais usando a pasta `seed/seedData`.
  - Realiza consultas às tabelas `Aluno`, `Materia`, `Professor` e `Prova`, exibindo informações formatadas no terminal.
  - Utiliza `populate` para buscar e exibir dados relacionados, como `id_aluno` e `id_materia`.

- **`.env`**
  - Contém variáveis de ambiente, como a URL do MongoDB Atlas, promovendo segurança e flexibilidade.

### 1.2 Pasta `src`

#### 1.2.1 Organização por Responsabilidades

- **`models`**: Modelos separados por arquivo, garantindo modularidade:

  - **`Aluno.js`**: Define alunos com campos como `nome` e `data_nascimento`

  - **`Professor.js`**: Representa o professor que ensina a matéria para os alunos, referenciando os campos `nome` e `data_nascimento`

  - **`Materia.js`**: Representa a materia do professor relacionando `nome` e `id_professor`.

  - **`Provas.js`**: Conecta alunos e matéria, armazenando com `id_aluno`, `ìd_materia`, `nota` e `data_prova`.

});

- **`services`**:
  - Contém funções reutilizáveis para operações de exclusão e listagem de dados.

### 1.3 Conexão e Configuração do Banco de Dados

- **`database/index.js.js`**

  - Centraliza a lógica de conexão, facilitando manutenção e alterações futuras.

- **`seed/seedData.js`**
  - Popula o banco com dados de exemplo, ideal para testes controlados.

### 1.4 Uso do MongoDB e Mongoose

- O **Mongoose** foi escolhido para definir schemas claros e gerenciar relacionamentos.
- **`populate`** melhora a organização e a exibição de informações relacionadas.

### 1.5 Flexibilidade e Escalabilidade

- Arquivos pequenos e com responsabilidades únicas permitem escalabilidade sem comprometer a estrutura.
- A separação de responsabilidades simplifica o código e colabora para o trabalho em equipe.

---

## 2. Decisões de Design

### 2.1 Relacionamentos

- O uso de **ObjectId** cria uma estrutura robusta de relações entre tabelas:

- **Materia** relaciona-se com **`id_professor`**.
- **Provas** conecta-se **`id_aluno`** e **`id_materia`**.

- **`populate`** é usado para exibir dados relacionados com facilidade.

### 2.2 Estrutura e Campos

Cada tabela contém campos essenciais para sua funcionalidade:

- **`Aluno`**: Campos para nome e data_nascimento.
- **`Professor`**: Campos para nome e data_nascimento.
- **`Materia`**: Campos que relacionam `nome` e `id_professor`.
- **`Provas`**: Armazena `id_aluno`** e **`id_materia`\*\*..

---

### 2.3 Demonstração Tabelas

#### - `models/Aluno.js`

```javascript
const mongoose = require("mongoose");

const AlunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data_nascimento: { type: Date, required: true },
});

module.exports = mongoose.model("Aluno", AlunoSchema);
```

<br>

#### - `models/Professor.js`

```javascript
const mongoose = require("mongoose");

const ProfessorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data_nascimento: { type: Date, required: true },
});

module.exports = mongoose.model("Professor", ProfessorSchema);
```

<br>

#### - `models/Materia.js`

```javascript
const mongoose = require("mongoose");

const MateriaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  id_professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
    required: true,
  },
});

module.exports = mongoose.model("Materia", MateriaSchema);
```

<br>

#### - `models/Prova.js`

```javascript
const ProvaSchema = new mongoose.Schema({
  id_aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aluno",
    required: true,
  },
  id_materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Materia",
    required: true,
  },
  nota: { type: Number, required: true },
  data_da_prova: { type: Date, required: true },
});

module.exports = mongoose.model("Prova", ProvaSchema);
```

---

## 4. Conclusão

A estrutura reflete uma abordagem profissional, garantindo que o código seja sustentável, escalável e compreensível para outros desenvolvedores ou para manutenções futuras. Cada decisão foi tomada para balancear eficiência e organização, promovendo um sistema robusto e flexível.
