import { Item, ItemStore } from "types";
import { create } from "zustand";



const useItemStore = create<ItemStore>((set) => ({
  selectedItem: JSON.parse(localStorage.getItem("selectedItem") || "null"),
  setSelectedItem: (item: Item) => {
    localStorage.setItem("selectedItem", JSON.stringify(item)); // Save item to localStorage
    set({ selectedItem: item }); // Update Zustand store
  },
}));

export default useItemStore;
