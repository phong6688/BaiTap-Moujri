export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const cartStorage = {
  getCart: (): CartItem[] => {
    const cartStr = localStorage.getItem('mojuri_cart');
    if (!cartStr) return [];
    try {
      return JSON.parse(cartStr);
    } catch {
      return [];
    }
  },

  saveCart: (cart: CartItem[]) => {
    localStorage.setItem('mojuri_cart', JSON.stringify(cart));
    // Dispatch a custom event to notify components (like Header) to update their UI
    window.dispatchEvent(new Event('cart_updated'));
  },

  addToCart: (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    const cart = cartStorage.getCart();
    const existing = cart.find(i => i.productId === item.productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({ ...item, quantity: qty });
    }
    cartStorage.saveCart(cart);
  },

  updateQuantity: (productId: string, quantity: number) => {
    let cart = cartStorage.getCart();
    if (quantity <= 0) {
      cart = cart.filter(i => i.productId !== productId);
    } else {
      const item = cart.find(i => i.productId === productId);
      if (item) item.quantity = quantity;
    }
    cartStorage.saveCart(cart);
  },

  removeFromCart: (productId: string) => {
    const cart = cartStorage.getCart().filter(i => i.productId !== productId);
    cartStorage.saveCart(cart);
  },

  clearCart: () => {
    cartStorage.saveCart([]);
  },

  getTotals: () => {
    const cart = cartStorage.getCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    return { totalAmount, totalItems };
  }
};
