import { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";

export default function CardProduto({ onAdd }) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [quantidade, setQuantidade] = useState("");

    function handleSubmit() {
        onAdd({ nome, preco, quantidade});

        setNome("");
        setPreco("");
        setQuantidade("");
    }

    return (
        <Card sx={{ maxWidth: 400, margin: "20px auto", padding: "2", borderRadius: 3, marginLeft: "16px" }}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold">
                    Adicionar Produto
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    Preencha os dados do novo produto
                </Typography>

                <Box mb={2}>
                    <Typography>Nome do Produto</Typography>
                    <TextField fullWidth size="small" placeholder="Ex: Arroz" label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                </Box>

                <Box mb={2}>
                    <Typography>Preço</Typography>
                    <TextField fullWidth size="small" placeholder="Ex: R$0.00" type="number" label="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
                </Box>

                <Box mb={2}>
                    <Typography>Quantidade</Typography>
                    <TextField fullWidth size="small" placeholder="Ex: 1" type="number" label="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                </Box>

                <Button sx={{ borderRadius: 2, backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333", } }}
                    variant="contained" fullWidth onClick={handleSubmit}>
                    + Adicionar Produto
                </Button>

            </CardContent>
        </Card>
    );
}