import { Box } from "@mui/material";
import CardProduto from "./components/CardProduto";
import Header from "./components/Header";
import ResumoCard from "./components/ResumoCard";
import { useState } from "react";
import ListaProdutosCard from "./components/ListaProdutosCard";

function App() {
  const [produtos, setProdutos] = useState([]);

  function adiconarProduto(produto) {
    setProdutos((prev) => [...prev, produto]);
  }

  function atualizarProduto(index, campo, valor) {
    const lista = [...produtos];
    lista[index][campo] = valor;
    setProdutos(lista);
  }

  function removeProduto(index) {
    const lista = produtos.filter((_, i) => i !== index);
    setProdutos(lista);
  }

  const totalProdutos = produtos.length; 
  const totalItens = produtos.reduce((acc, p) => acc + Number(p.quantidade), 0);
  const valorTotal = produtos.reduce((acc, p) => acc + Number(p.preco) * Number(p.quantidade), 0);

  return (
   <>
   <Box sx={{ minHeight: "110vh", backgroundColor: "#eff6ff"}}>
    <Box display="flex" gap={3} padding={2}>
    <Box width="35%">
      <Header />
      <div>
        <CardProduto onAdd={adiconarProduto} />
        <ResumoCard produtos={totalProdutos} itens={totalItens} valor={valorTotal} />
      </div>
      </Box>
    <Box width="65%">
      <ListaProdutosCard 
        produtos={produtos} 
        onUpdate={atualizarProduto} 
        onRemove={removeProduto}
      />
    </Box>
    </Box>
    </Box>
    
   </>
  );
}

export default App;
