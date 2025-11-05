const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "../db/database.db"));

// Ativa chaves estrangeiras
db.pragma("foreign_keys = ON");

// Cria tabelas se não existirem
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

module.exports = db;