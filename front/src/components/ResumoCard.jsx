import { Box, Card, CardContent, Typography } from "@mui/material";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CalculateIcon from '@mui/icons-material/Calculate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function ResumoCard({ produtos, itens, valor }) {
    return (
        <Card sx={{ maxWidth: 370, margin: "20px auto", padding: 2, marginLeft: "16px", borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Resumo
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                    <Box
                        sx={{
                            backgroundColor: "lightblue",
                            padding: "8px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                        }}
                    >
                        <LocalGroceryStoreIcon sx={{ color: "#5393ff", fontSize: 24, marginRight: "8px" }} />
                        <Typography variant="body1">Produtos: <strong>{produtos}</strong></Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
                    <Box
                        sx={{
                            backgroundColor: "#d7a8df",
                            padding: "8px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                        }}
                    >
                        <CalculateIcon sx={{ color: "#dd33fa", fontSize: 24, marginRight: "8px" }} />
                        <Typography variant="body1">Total de Itens: <strong>{itens}</strong></Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center">
                    <Box
                        sx={{
                            backgroundColor: "#b7deb8",
                            padding: "8px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                        }}
                    >
                        <AttachMoneyIcon sx={{ color: "#00a152", fontSize: 24, marginRight: "8px" }} />
                        <Typography variant="body1">Valor Total: <strong> {valor}</strong></Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

}