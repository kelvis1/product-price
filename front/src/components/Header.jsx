import { Box, Typography } from "@mui/material";

export default function Header() {
    return (
        <Box component="header" sx={{ padding: "20px", textAlign: "left", }}>
            <Typography variant="h5" fontWeight="bold">
                Controle de Gastos
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
                Adicione produtos, defina preços e quantidades
            </Typography>
        </Box>
    );
}