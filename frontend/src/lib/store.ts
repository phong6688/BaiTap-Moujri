import { create } from 'zustand';
import type { User } from './api';

// --- AUTH STORE ---
interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => {
    localStorage.setItem('mojuri_token', token);
    localStorage.setItem('mojuri_user', JSON.stringify(user));
    set({ token, user });
  },
  clearAuth: () => {
    localStorage.removeItem('mojuri_token');
    localStorage.removeItem('mojuri_user');
    set({ token: null, user: null });
  },
  initializeAuth: () => {
    const token = localStorage.getItem('mojuri_token');
    const userStr = localStorage.getItem('mojuri_user');
    let user = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch {
        // parsing failed
      }
    }
    set({ token, user });
  }
}));

// --- CART STORE ---
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotals: () => { totalAmount: number; totalItems: number };
  initializeCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addToCart: (product, quantity = 1) => {
    const items = [...get().cartItems];
    const idx = items.findIndex((i) => i.productId === product.productId);
    if (idx !== -1) {
      items[idx].quantity += quantity;
    } else {
      items.push({ ...product, quantity });
    }
    localStorage.setItem('mojuri_cart', JSON.stringify(items));
    set({ cartItems: items });
  },
  updateQuantity: (productId, quantity) => {
    let items = [...get().cartItems];
    if (quantity <= 0) {
      items = items.filter((i) => i.productId !== productId);
    } else {
      const idx = items.findIndex((i) => i.productId === productId);
      if (idx !== -1) {
        items[idx].quantity = quantity;
      }
    }
    localStorage.setItem('mojuri_cart', JSON.stringify(items));
    set({ cartItems: items });
  },
  removeFromCart: (productId) => {
    const items = get().cartItems.filter((i) => i.productId !== productId);
    localStorage.setItem('mojuri_cart', JSON.stringify(items));
    set({ cartItems: items });
  },
  clearCart: () => {
    localStorage.removeItem('mojuri_cart');
    set({ cartItems: [] });
  },
  getTotals: () => {
    const items = get().cartItems;
    let totalAmount = 0;
    let totalItems = 0;
    items.forEach((item) => {
      totalAmount += item.price * item.quantity;
      totalItems += item.quantity;
    });
    return { totalAmount, totalItems };
  },
  initializeCart: () => {
    const saved = localStorage.getItem('mojuri_cart');
    if (saved) {
      try {
        set({ cartItems: JSON.parse(saved) });
      } catch {
        // parsing failed
      }
    }
  }
}));
