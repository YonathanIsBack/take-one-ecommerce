import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ImageCarousel from "../components/ImageCarousel";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [snack, setSnack] = useState(null);

  const product = products.find((p) => p.id === Number(id));
  if (!product) return <Container sx={{ py: 4 }}><Typography>Product not found</Typography></Container>;

  const effectivePrice = product.discountPrice || product.price;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setSnack({ severity: "success", message: "Added to basket!" });
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate("/basket");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ImageCarousel images={product.images} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Chip label={product.category} color="primary" variant="outlined" />
            {product.discountPrice && (
              <Chip label="DISCOUNT" color="error" size="small" />
            )}
          </Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            {product.discountPrice ? (
              <>
                <Typography variant="h4" color="error" fontWeight="bold">
                  {formatPrice(product.discountPrice)}
                </Typography>
                <Typography variant="h5" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                  {formatPrice(product.price)}
                </Typography>
              </>
            ) : (
              <Typography variant="h4" fontWeight="bold">
                {formatPrice(product.price)}
              </Typography>
            )}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Stock: {product.stock} available
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Typography>Quantity:</Typography>
            <IconButton size="small" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ minWidth: 32, textAlign: "center" }}>{quantity}</Typography>
            <IconButton size="small" onClick={() => setQuantity((q) => q + 1)}>
              <AddIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              size="large"
              onClick={handleAddToCart}
              sx={{ bgcolor: "#5D4037", "&:hover": { bgcolor: "#4E342E" } }}
            >
              Add to Basket
            </Button>
            <Button
              variant="outlined"
              startIcon={<FlashOnIcon />}
              size="large"
              onClick={handleBuyNow}
              sx={{ borderColor: "#5D4037", color: "#5D4037" }}
            >
              Buy Now
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Subtotal: {formatPrice(effectivePrice * quantity)}
          </Typography>
        </Grid>
      </Grid>

      <Snackbar open={!!snack} autoHideDuration={2000} onClose={() => setSnack(null)}>
        <Alert severity={snack?.severity} onClose={() => setSnack(null)}>
          {snack?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
