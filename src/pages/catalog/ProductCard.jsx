import { Link as RouterLink } from "react-router-dom";
import { Typography, Box, Skeleton, Chip, Rating } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

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

const cardSx = {
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
};

function SkeletonView() {
  return (
    <Box sx={cardSx}>
      <Skeleton variant="rectangular" height={220} sx={{ borderRadius: "12px 12px 0 0" }} />
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" width="70%" height={28} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="35%" height={28} sx={{ mt: 1.5 }} />
      </Box>
    </Box>
  );
}

function ProductView({ product }) {
  return (
    <Box component={RouterLink} to={`/product/${product.id}`} sx={cardSx}>
      <Box sx={{ overflow: "hidden", height: 220, position: "relative" }}>
        <Box
          component="img"
          src={product.thumbnail || product.images[0]}
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
          <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ color: "#F9A825" }} />
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
                sx={{ textDecoration: "line-through", color: "#A1887F", fontSize: "0.85rem" }}
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
  );
}

export default function ProductCard({ product, loading }) {
  if (loading) return <SkeletonView />;
  if (!product) return null;
  return <ProductView product={product} />;
}
