import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

export default function OrderPage() {
  const { items, total } = useCart();
  const { createOrder } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) navigate("/basket");
  }, [items, navigate]);

  if (items.length === 0) return null;

  const handleNext = () => {
    createOrder(items, total);
    navigate("/address");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Order Summary
      </Typography>

      {items.map((item) => (
        <Card key={item.id} sx={{ display: "flex", mb: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 100, objectFit: "cover" }}
            image={item.images[0]}
            alt={item.name}
          />
          <CardContent sx={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Qty: {item.quantity} x {formatPrice(item.discountPrice || item.price)}
              </Typography>
            </Box>
            <Typography fontWeight="bold">
              {formatPrice((item.discountPrice || item.price) * item.quantity)}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">Total Payment</Typography>
        <Typography variant="h5" fontWeight="bold" color="primary">{formatPrice(total)}</Typography>
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleNext}
        sx={{ bgcolor: "#5D4037", "&:hover": { bgcolor: "#4E342E" } }}
      >
        Next: Delivery Address
      </Button>
    </Container>
  );
}
