import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { useOrder } from "../../context/OrderContext";

export default function AddressPage() {
  const { order, updateAddress } = useOrder();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", address: "", notes: "" });

  useEffect(() => {
    if (!order) navigate("/basket");
  }, [order, navigate]);

  if (!order) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAddress(form);
    navigate("/payment");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Delivery Address
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Delivery Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Notes (optional)"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            placeholder="e.g. ring the bell, leave at front door..."
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ bgcolor: "#5D4037", "&:hover": { bgcolor: "#4E342E" } }}
          >
            Next: Payment
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
