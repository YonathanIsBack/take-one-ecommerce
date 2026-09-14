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
  Chip,
  Paper,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useOrder } from "../../context/OrderContext";
import { useCart } from "../../context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

const statusColors = {
  pending: "warning",
  confirmed: "info",
  processing: "primary",
  delivered: "success",
};

export default function OrderDetailPage() {
  const { order, clearOrder } = useOrder();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!order) navigate("/");
  }, [order, navigate]);

  if (!order) return null;

  const handleDone = () => {
    clearCart();
    clearOrder();
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <CheckCircleOutlinedIcon sx={{ fontSize: 64, color: "success.main" }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Order ID: {order.id}
        </Typography>
        <Chip
          label={order.status.toUpperCase()}
          color={statusColors[order.status] || "default"}
          sx={{ mt: 1 }}
        />
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Items
        </Typography>
        {order.items.map((item) => (
          <Card key={item.id} sx={{ display: "flex", mb: 1 }}>
            <CardMedia
              component="img"
              sx={{ width: 80, objectFit: "cover" }}
              image={item.images[0]}
              alt={item.name}
            />
            <CardContent sx={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography fontWeight="bold">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.quantity} x {formatPrice(item.discountPrice || item.price)}
                </Typography>
              </Box>
              <Typography fontWeight="bold">
                {formatPrice((item.discountPrice || item.price) * item.quantity)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Delivery Address
        </Typography>
        <Typography>{order.address?.name}</Typography>
        <Typography color="text.secondary">{order.address?.address}</Typography>
        {order.address?.notes && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Notes: {order.address?.notes}
          </Typography>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Payment Method
        </Typography>
        <Typography fontWeight="bold">{order.paymentMethod?.label}</Typography>
        <Typography variant="body2" color="text.secondary">
          {order.paymentMethod?.detail}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight="bold">Total Payment</Typography>
          <Typography variant="h5" fontWeight="bold" color="primary">
            {formatPrice(order.total)}
          </Typography>
        </Box>
      </Paper>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleDone}
        sx={{ bgcolor: "#5D4037", "&:hover": { bgcolor: "#4E342E" } }}
      >
        Done
      </Button>
    </Container>
  );
}
