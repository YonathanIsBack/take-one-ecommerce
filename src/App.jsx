import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import CatalogPage from "./pages/CatalogPage";
import DetailPage from "./pages/DetailPage";
import BasketPage from "./pages/BasketPage";
import OrderPage from "./pages/OrderPage";
import AddressPage from "./pages/AddressPage";
import PaymentPage from "./pages/PaymentPage";
import OrderDetailPage from "./pages/OrderDetailPage";

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
