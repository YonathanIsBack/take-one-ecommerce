import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Divider,
} from "@mui/material";
import { useOrder } from "../context/OrderContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

const paymentMethods = [
  { value: "bca", label: "Bank BCA", detail: "Transfer to: 1234 5678 9012 a/n Take One Bakery" },
  { value: "mandiri", label: "Bank Mandiri", detail: "Transfer to: 9876 5432 1098 a/n Take One Bakery" },
  { value: "jenius", label: "Jenius (BTPN)", detail: "Transfer to: 0987 6543 2109 a/n Take One Bakery" },
  { value: "qris", label: "QRIS", detail: "Scan QR code at checkout counter" },
  { value: "cod", label: "Cash on Delivery (COD)", detail: "Pay when your order arrives" },
];

export default function PaymentPage() {
  const { order, updatePayment } = useOrder();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (!order) navigate("/basket");
  }, [order, navigate]);

  if (!order) return null;

  const handleConfirm = () => {
    const method = paymentMethods.find((m) => m.value === selected);
    updatePayment(method);
    navigate("/order-detail");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Payment
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Order Total</Typography>
        <Typography variant="h3" fontWeight="bold" color="primary">
          {formatPrice(order.total)}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 2, fontWeight: "bold" }}>Select Payment Method</FormLabel>
          <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
            {paymentMethods.map((method) => (
              <Paper
                key={method.value}
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 1,
                  border: selected === method.value ? "2px solid #5D4037" : "1px solid #e0e0e0",
                  bgcolor: selected === method.value ? "#FFF8E1" : "transparent",
                }}
              >
                <FormControlLabel
                  value={method.value}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography fontWeight="bold">{method.label}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {method.detail}
                      </Typography>
                    </Box>
                  }
                  sx={{ m: 0 }}
                />
              </Paper>
            ))}
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 3 }} />

        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={!selected}
          onClick={handleConfirm}
          sx={{ bgcolor: "#5D4037", "&:hover": { bgcolor: "#4E342E" } }}
        >
          Confirm Payment
        </Button>
      </Paper>
    </Container>
  );
}
