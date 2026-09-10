import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
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
    <AppBar position="sticky" sx={{ bgcolor: "#5D4037" }}>
      <Toolbar>
        <Box
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", display: "flex", alignItems: "center" }}
        >
          <Box
            component="img"
            src="/images/logo.jpg"
            alt="Take One Bakery"
            sx={{ height: 40, mr: 1 }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </Box>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Catalog
          </Button>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/basket"
          >
            <Badge badgeContent={itemCount} color="error">
              <ShoppingBasketIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
