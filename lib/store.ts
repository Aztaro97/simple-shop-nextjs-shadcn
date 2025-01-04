import { create } from 'zustand';
import { CartItem, Product } from './types';

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  isInCart: (productId: number) => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (product) => {
    const { items } = get();
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  removeFromCart: (productId) => {
    set({ items: get().items.filter((item) => item.id !== productId) });
  },
  isInCart: (productId) => {
    return get().items.some((item) => item.id === productId);
  },
}));