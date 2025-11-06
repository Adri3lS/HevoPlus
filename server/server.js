const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// Serve index.html for the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// ========== CADASTRO ==========
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  const userExists = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (userExists) {
    return res.status(400).json({ error: "Usuário já cadastrado." });
  }

  const hashed = await bcrypt.hash(password, 10);
  db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(email, hashed);

  res.json({ message: "Usuário cadastrado com sucesso!" });
});

// ========== LOGIN ==========
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) {
    return res.status(400).json({ error: "Usuário não encontrado." });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ error: "Senha incorreta." });
  }

  res.json({ message: "Login bem-sucedido!", userId: user.id });
});

// ========== INICIA SERVIDOR ==========
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

