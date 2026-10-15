import { API_BASE_URL, API_PATHS } from "../constants/api";

const getImageUrl = (path) => `${API_BASE_URL}/${path}`;

const mapProduct = (item) => ({
  id: item.id,
  name: item.name,
  category: item.category?.name || "",
  price: Number(item.price?.sellingPrice) || 0,
  discountPrice: 0,
  description: item.description || "No story for this food just yet",
  thumbnail: item.thumbnail ? getImageUrl(item.thumbnail) : null,
  images: item.images?.map(getImageUrl) || [],
  stock: item.quantitySellable || 0,
  rating: 0,
  reviewCount: 0,
  tags: [],
  weight: "0g",
  ingredients: [],
  allergens: [],
  isAvailable: (item.quantitySellable || 0) > 0,
});

export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE_URL}${API_PATHS.products}`);
  const data = await res.json();
  return (data.items || []).map(mapProduct);
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_BASE_URL}${API_PATHS.products}/${id}`);
  const data = await res.json();
  return mapProduct(data);
};

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE_URL}${API_PATHS.categories}`);
  const data = await res.json();
  return data.items || [];
};
