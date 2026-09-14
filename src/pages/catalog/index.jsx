import { useState, useMemo, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  InputAdornment,
  Skeleton,
  Chip,
  Rating,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { fetchProducts } from "../../data/api";

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

function ProductSkeleton() {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Skeleton variant="rectangular" height={220} sx={{ borderRadius: "12px 12px 0 0" }} />
      <Box sx={{ p: 2, flexGrow: 1, bgcolor: "#FAF8F5", borderRadius: "0 0 12px 12px" }}>
        <Skeleton variant="text" width="70%" height={28} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="35%" height={28} sx={{ mt: 1.5 }} />
      </Box>
    </Box>
  );
}

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

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
  }, [products, search, category, sortBy]);

  const getTagIcon = (tag) => {
    switch (tag) {
      case "bestseller":
      case "trending":
        return <LocalFireDepartmentIcon sx={{ fontSize: 14 }} />;
      case "new":
        return <NewReleasesIcon sx={{ fontSize: 14 }} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#3E2723" }}>
        Our Products
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search products..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            minWidth: 250,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#FAF8F5",
              borderRadius: "8px",
              "& fieldset": { borderColor: "#D7CCC8" },
              "&:hover fieldset": { borderColor: "#8D6E63" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#8D6E63" }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel sx={{ color: "#5D4037" }}>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              bgcolor: "#FAF8F5",
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#D7CCC8" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#8D6E63" },
            }}
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel sx={{ color: "#5D4037" }}>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              bgcolor: "#FAF8F5",
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#D7CCC8" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#8D6E63" },
            }}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <ProductSkeleton />
              </Grid>
            ))
          : filtered.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <Box
                  component={RouterLink}
                  to={`/product/${product.id}`}
                  sx={{
                    textDecoration: "none",
                    display: "block",
                    borderRadius: "12px",
                    overflow: "hidden",
                    bgcolor: "#FAF8F5",
                    border: "1px solid #EFEBE9",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(93, 64, 55, 0.12)",
                      "& .product-image": { transform: "scale(1.03)" },
                    },
                  }}
                >
                  <Box sx={{ overflow: "hidden", height: 220, position: "relative" }}>
                    <Box
                      component="img"
                      src={product.images[0]}
                      alt={product.name}
                      className="product-image"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                    {product.tags?.length > 0 && (
                      <Box sx={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 0.5 }}>
                        {product.tags.map((tag) => (
                          <Chip
                            key={tag}
                            icon={getTagIcon(tag)}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: tag === "bestseller" || tag === "trending" ? "#D84315" : "#5D4037",
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              textTransform: "capitalize",
                              "& .MuiChip-icon": { color: "#fff" },
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    {!product.isAvailable && (
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          bgcolor: "rgba(0,0,0,0.5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>
                          Sold Out
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 600,
                        color: "#3E2723",
                        mb: 0.5,
                        lineHeight: 1.3,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#8D6E63",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        mb: 1,
                      }}
                    >
                      {product.category}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                      <Rating
                        value={product.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                        sx={{ color: "#F9A825" }}
                      />
                      <Typography variant="body2" sx={{ color: "#8D6E63", fontSize: "0.8rem" }}>
                        ({product.reviewCount})
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6D4C41",
                        lineHeight: 1.5,
                        mb: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                      {product.discountPrice ? (
                        <>
                          <Typography
                            sx={{
                              fontFamily: '"Playfair Display", serif',
                              fontWeight: 700,
                              fontSize: "1.15rem",
                              color: "#C62828",
                            }}
                          >
                            {formatPrice(product.discountPrice)}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: "line-through",
                              color: "#A1887F",
                              fontSize: "0.85rem",
                            }}
                          >
                            {formatPrice(product.price)}
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          sx={{
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: 700,
                            fontSize: "1.15rem",
                            color: "#3E2723",
                          }}
                        >
                          {formatPrice(product.price)}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}
