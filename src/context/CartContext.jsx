import { createContext, useContext, useReducer, useEffect } from "react";
import { fetchProductById } from "../data/api";

const CartContext = createContext();
const STORAGE_KEY = "basket";

const getStoredItems = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity || 1 },
        ],
      };
    }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "HYDRATE_ITEMS":
      return {
        ...state,
        items: state.items.map((stored) => {
          const full = action.payload.find((f) => f.id === stored.id);
          return full ? { ...full, quantity: stored.quantity } : stored;
        }),
      };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, () => ({
    items: getStoredItems(),
  }));

  useEffect(() => {
    const stored = state.items.map(({ id, quantity }) => ({ id, quantity }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }, [state.items]);

  useEffect(() => {
    const stored = getStoredItems();
    if (stored.length === 0) return;
    Promise.all(
      stored
        .filter((s) => s.id != null && s.quantity != null)
        .map((s) => fetchProductById(s.id).catch(() => null))
    ).then((full) => {
      const valid = full.filter(Boolean);
      if (valid.length > 0) dispatch({ type: "HYDRATE_ITEMS", payload: valid });
    });
  }, []);

  const addItem = (product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

  const removeItem = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const total = state.items.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ ...state, addItem, updateQuantity, removeItem, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
