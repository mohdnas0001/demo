import { Item } from 'types';
import { create } from 'zustand';

// Define the type for the store
interface ItemStore {
  selectedItem: Item | null;  // Item type, or null if no item is selected
  setSelectedItem: (item: Item) => void;
}

const useItemStore = create<ItemStore>((set) => ({
  selectedItem: JSON.parse(localStorage.getItem('selectedItem') || 'null'),
  setSelectedItem: (item: Item) => {
    localStorage.setItem('selectedItem', JSON.stringify(item)); // Save item to localStorage
    set({ selectedItem: item }); // Update Zustand store
  },
}));

export default useItemStore;
