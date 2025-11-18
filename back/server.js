import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import { nanoid } from "nanoid";

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com SQLite
const db = new Database("database.db");

// Criar tabela se não existir
db.exec(`
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    preco REAL NOT NULL,
    quantidade INTEGER NOT NULL,
    createdAt TEXT NOT NULL
);
`);

// --- ROTAS --- //

// Listar todos
app.get("/products", (req, res) => {
  const stmt = db.prepare("SELECT * FROM products");
  const rows = stmt.all();
  res.json(rows);
});

// Buscar 1
app.get("/products/:id", (req, res) => {
  const stmt = db.prepare("SELECT * FROM products WHERE id = ?");
  const product = stmt.get(req.params.id);

  if (!product) return res.status(404).json({ error: "Produto não encontrado" });

  res.json(product);
});

// Criar
app.post("/products", (req, res) => {
  const { nome, preco, quantidade } = req.body;

  if (!nome || preco == null || quantidade == null) {
    return res.status(400).json({ error: "Campos inválidos" });
  }

  const id = nanoid();
  const createdAt = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO products (id, nome, preco, quantidade, createdAt)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(id, nome, Number(preco), Number(quantidade), createdAt);

  res.status(201).json({
    id,
    nome,
    preco: Number(preco),
    quantidade: Number(quantidade),
    createdAt,
  });
});

// Atualizar
app.put("/products/:id", (req, res) => {
  const { nome, preco, quantidade } = req.body;
  const { id } = req.params;

  const check = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  if (!check) return res.status(404).json({ error: "Produto não encontrado" });

  const stmt = db.prepare(`
    UPDATE products
    SET nome = COALESCE(?, nome),
        preco = COALESCE(?, preco),
        quantidade = COALESCE(?, quantidade)
    WHERE id = ?
  `);

  stmt.run(
    nome !== undefined ? nome : null,
    preco !== undefined ? Number(preco) : null,
    quantidade !== undefined ? Number(quantidade) : null,
    id
  );

  const updated = db.prepare("SELECT * FROM products WHERE id = ?").get(id);

  res.json(updated);
});

// Deletar
app.delete("/products/:id", (req, res) => {
  const stmt = db.prepare("DELETE FROM products WHERE id = ?");
  const result = stmt.run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.status(204).end();
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando com SQLite em http://localhost:${PORT}`);
});
