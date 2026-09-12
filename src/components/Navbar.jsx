import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box,
  Button,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#3E2723",
        boxShadow: "0 2px 12px rgba(62, 39, 35, 0.15)",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", display: "flex", alignItems: "center" }}
        >
          <Box
            component="img"
            src="/images/logo.jpg"
            alt="Take One Bakery"
            sx={{ height: 45, mr: 1 }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              textTransform: "none",
              fontSize: "0.95rem",
              "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
            }}
          >
            Catalog
          </Button>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/basket"
            sx={{
              "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
            }}
          >
            <Badge
              badgeContent={itemCount}
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: "#D84315",
                  color: "#fff",
                  fontWeight: 600,
                },
              }}
            >
              <ShoppingBasketIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
