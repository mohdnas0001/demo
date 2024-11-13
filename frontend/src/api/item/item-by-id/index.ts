import apiClient from "src/api/apiClient";
import { Item } from "types";

// Fetch items by id
export const fetchItemById = async (id: number) => {
  const response = await apiClient.get<Item>(`/items/${id}`);
  return response.data;
};
