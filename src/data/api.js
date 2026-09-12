import productsData from "./products.json";

const API_DELAY = 600;

const simulateFetch = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), API_DELAY));

export const fetchProducts = () => simulateFetch(productsData);

export const fetchProductById = (id) =>
  simulateFetch(productsData.find((p) => p.id === Number(id)) || null);

export const fetchCategories = () =>
  simulateFetch([...new Set(productsData.map((p) => p.category))]);
