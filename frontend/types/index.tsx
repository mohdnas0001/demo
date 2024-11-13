export interface Item {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  username: string;
  setUsername: (username: string) => void;
  clearUser: () => void;
}

export interface ItemStore {
  selectedItem: Item | null;
  setSelectedItem: (item: Item) => void;
}

export interface AuthState {
  username: string;
  setUsername: (username: string) => void;
  clearUser: () => void;
}
