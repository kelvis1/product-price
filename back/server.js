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

// ---------------------- ROTAS ---------------------- //

// Listar todos os produtos
app.get("/products", (req, res) => {
  const stmt = db.prepare("SELECT * FROM products");
  const rows = stmt.all();
  res.json(rows);
});

// Buscar um produto específico
app.get("/products/:id", (req, res) => {
  const stmt = db.prepare("SELECT * FROM products WHERE id = ?");
  const product = stmt.get(req.params.id);

  if (!product)
    return res.status(404).json({ error: "Produto não encontrado" });

  res.json(product);
});

// Criar novo produto
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

// Atualizar produto (nome opcional)
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const { nome, preco, quantidade } = req.body;

  // Verifica se existe
  const findStmt = db.prepare("SELECT * FROM products WHERE id = ?");
  const produto = findStmt.get(id);

  if (!produto)
    return res.status(404).json({ error: "Produto não encontrado" });

  // Atualização parcial usando COALESCE
  const updateStmt = db.prepare(`
      UPDATE products
      SET nome = COALESCE(?, nome),
          preco = COALESCE(?, preco),
          quantidade = COALESCE(?, quantidade)
      WHERE id = ?
    `);

  updateStmt.run(
    nome ?? null,
    preco ?? null,
    quantidade ?? null,
    id
  );

  // Retorna produto atualizado
  const updatedStmt = db.prepare("SELECT * FROM products WHERE id = ?");
  const atualizado = updatedStmt.get(id);

  res.json(atualizado);
});

// Remover produto
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;

  const deleteStmt = db.prepare("DELETE FROM products WHERE id = ?");
  const result = deleteStmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.json({ message: "Produto removido" });
});

// Porta 8000 (para combinar com seu frontend)
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Servidor rodando com SQLite em http://localhost:${PORT}`);
});
