import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import CatalogPage from "./pages/catalog";
import DetailPage from "./pages/detail";
import BasketPage from "./pages/basket";
import OrderPage from "./pages/order";
import AddressPage from "./pages/address";
import PaymentPage from "./pages/payment";
import OrderDetailPage from "./pages/order-detail";

export default function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ minHeight: "100vh", py: 2 }}>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/product/:id" element={<DetailPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-detail" element={<OrderDetailPage />} />
        </Routes>
      </Container>
    </>
  );
}
