const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const db = require("./db");

const app = express();

// 🔒 Configuração do CORS
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:5000"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// 💾 Sessão salva no SQLite
app.use(
  session({
    store: new SQLiteStore({ db: "sessions.sqlite", dir: "./db" }),
    secret: "segredo-super-seguro",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// ========== CADASTRO ==========
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Preencha todos os campos." });

  const userExists = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (userExists)
    return res.status(400).json({ error: "Usuário já cadastrado." });

  const hashed = await bcrypt.hash(password, 10);
  db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(email, hashed);

  res.json({ message: "Usuário cadastrado com sucesso!" });
});

// ========== LOGIN ==========
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) return res.status(400).json({ error: "Usuário não encontrado." });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Senha incorreta." });

  req.session.userId = user.id;
  req.session.email = user.email;

  res.json({ message: "Login bem-sucedido!", userId: user.id });
});

// ========== VERIFICAR LOGIN ==========
app.get("/api/session", (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, email: req.session.email });
  } else {
    res.json({ loggedIn: false });
  }
});

// ========== LOGOUT ==========
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logout realizado!" });
  });
});

// 🚀 Iniciar servidor
app.listen(5000, () => {
  console.log("Servidor rodando em http://localhost:5000");
});
