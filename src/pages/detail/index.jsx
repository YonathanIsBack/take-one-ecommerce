import { useState, useEffect } from "react";
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
  Rating,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ImageCarousel from "./ImageCarousel";
import { fetchProductById } from "../../data/api";
import { useCart } from "../../context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [snack, setSnack] = useState(null);

  useEffect(() => {
    fetchProductById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="text" width="30%" height={32} />
            <Skeleton variant="text" width="70%" height={40} />
            <Skeleton variant="text" width="40%" height={36} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Product not found</Typography>
      </Container>
    );
  }

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
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Rating value={product.rating} precision={0.1} readOnly sx={{ color: "#F9A825" }} />
            <Typography variant="body2" color="text.secondary">
              {product.rating} ({product.reviewCount} reviews)
            </Typography>
          </Box>
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
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Stock: {product.stock} available
          </Typography>
          {!product.isAvailable && (
            <Chip label="Sold Out" color="error" sx={{ mb: 2 }} />
          )}
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
              disabled={!product.isAvailable}
              sx={{ bgcolor: "#5D4037", "&:hover": { bgcolor: "#4E342E" } }}
            >
              Add to Basket
            </Button>
            <Button
              variant="outlined"
              startIcon={<FlashOnIcon />}
              size="large"
              onClick={handleBuyNow}
              disabled={!product.isAvailable}
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
