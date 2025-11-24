import { Box, Card, CardContent, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";


export default function ListaProdutosCard({ produtos, onUpdate, onRemove }) {
    return (
        <Card sx={{ width: "90%", padding: 2, marginTop: 15, borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                    Lista de Produtos
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    {produtos.length} produto(s) cadastrado(s)
                </Typography>

                <Box display="grid" gridTemplateColumns="1fr 120px 80px 120px 60px" fontWeight="bold" mb={1}>
                    <Typography>Produto</Typography>
                    <Typography>Preço Unit.</Typography>
                    <Typography>Qtd.</Typography>
                    <Typography>Subtotal</Typography>
                    <Typography>Ações</Typography>
                </Box>

                <Box sx={{ borderBottom: "1px solid #ddd", mb: 1 }} />

                {produtos.map((p) => (
                    <Box key={p.id}
                        display="grid"
                        gridTemplateColumns="1fr 120px 80px 120px 60px"
                        alignItems="center"
                        mb={2}>

                        <Typography>{p.nome}</Typography>

                        <TextField type="number"
                            size="small"
                            value={p.preco}
                            onChange={(e) => onUpdate(p.id, "preco", e.target.value)}
                            sx={{ backgroundColor: "#f2f2f2", width: "100px" }}
                        />
                        <TextField
                            type="number"
                            size="small"
                            value={p.quantidade}
                            onChange={(e) => onUpdate(p.id, "quantidade", e.target.value)}
                            sx={{ backgroundColor: "#f2f2f2", width: "70px" }}
                        />
                        <Typography sx={{ color: "green", fontWeight: "bold" }}>
                            R$ {(p.preco * p.quantidade).toFixed(2)}
                        </Typography>
                        <IconButton color="error" onClick={() => onRemove(p.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
}