import { useState, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { products, categories } from "../data/products";

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const filtered = useMemo(() => {
    let items = products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || p.category === category;
      return matchSearch && matchCat;
    });
    items.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
    return items;
  }, [search, category, sortBy]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Our Products
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search products..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filtered.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <Card
              component={RouterLink}
              to={`/product/${product.id}`}
              sx={{ textDecoration: "none", height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.images[0]}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Typography variant="h6" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Chip label={product.category} size="small" color="primary" variant="outlined" />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                  {product.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {product.discountPrice ? (
                    <>
                      <Typography variant="h6" color="error" fontWeight="bold">
                        {formatPrice(product.discountPrice)}
                      </Typography>
                      <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                        {formatPrice(product.price)}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h6" fontWeight="bold">
                      {formatPrice(product.price)}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
