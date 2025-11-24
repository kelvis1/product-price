import { Box } from "@mui/material";
import CardProduto from "./components/CardProduto";
import Header from "./components/Header";
import ResumoCard from "./components/ResumoCard";
import { useState, useEffect } from "react";
import ListaProdutosCard from "./components/ListaProdutosCard";

function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:8000/products");
      const data = await res.json();
      setProdutos(data);
    }
    load();
  }, []);

  async function adicionarProduto(produto) {
    const res = await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });

    const novo = await res.json();

    setProdutos((prev) => [...prev, novo]);
  }

  async function editarProduto(id, updates) {
    const res = await fetch(`http://localhost:8000/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    const atualizado = await res.json();

    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? atualizado : p))
    );
  }

  async function deletarProduto(id) {
    await fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    });

    setProdutos((prev) => prev.filter((p) => p.id !== id));
  }

  const totalProdutos = produtos.length;
  const totalItens = produtos.reduce(
    (acc, p) => acc + Number(p.quantidade),
    0
  );
  const valorTotal = produtos.reduce(
    (acc, p) => acc + Number(p.preco) * Number(p.quantidade),
    0
  );

  return (
    <>
      <Box sx={{ minHeight: "110vh", backgroundColor: "#eff6ff" }}>
        <Box display="flex" gap={3} padding={2}>
          
          <Box width="35%">
            <Header />
            <div>
              <CardProduto onAdd={adicionarProduto} />
              <ResumoCard
                produtos={totalProdutos}
                itens={totalItens}
                valor={valorTotal}
              />
            </div>
          </Box>

          <Box width="65%">
            <ListaProdutosCard
              produtos={produtos}
              onUpdate={(id, campo, valor) =>
                editarProduto(id, { [campo]: Number(valor) })
              }
              onRemove={deletarProduto}
            />
          </Box>

        </Box>
      </Box>
    </>
  );
}

export default App;
