import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

export default function BasketPage() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Your basket is empty</Typography>
        <Button variant="contained" onClick={() => navigate("/")} sx={{ bgcolor: "#5D4037" }}>
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Your Basket
      </Typography>

      {items.map((item) => (
        <Card key={item.id} sx={{ display: "flex", mb: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 120, objectFit: "cover" }}
            image={item.images[0]}
            alt={item.name}
          />
          <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                <IconButton size="small" onClick={() => removeItem(item.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
              <Chip label={item.category} size="small" variant="outlined" sx={{ mb: 1 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="h6" fontWeight="bold" color="primary">
              {formatPrice((item.discountPrice || item.price) * item.quantity)}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">Total</Typography>
        <Typography variant="h5" fontWeight="bold">{formatPrice(total)}</Typography>
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={() => navigate("/order")}
        sx={{ bgcolor: "#5D4037", "&:hover": { bgcolor: "#4E342E" } }}
      >
        Proceed to Order
      </Button>
    </Container>
  );
}
