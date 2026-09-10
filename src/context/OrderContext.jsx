import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);

  const createOrder = (items, total) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items,
      total,
      address: null,
      paymentMethod: null,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setOrder(newOrder);
    return newOrder;
  };

  const updateAddress = (address) => {
    setOrder((prev) => ({ ...prev, address }));
  };

  const updatePayment = (paymentMethod) => {
    setOrder((prev) => ({ ...prev, paymentMethod, status: "confirmed" }));
  };

  const clearOrder = () => setOrder(null);

  return (
    <OrderContext.Provider
      value={{ order, createOrder, updateAddress, updatePayment, clearOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
