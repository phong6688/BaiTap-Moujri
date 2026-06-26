export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'https://bai-tap-moujri-backend.vercel.app/api';

export const resolveImagePath = (path: string | undefined): string => {
  if (!path) return 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Normalize backslashes to forward slashes
  const normalized = path.replace(/\\/g, '/');
  
  // Handle local disk paths or paths starting with media/
  const mediaIndex = normalized.indexOf('media/');
  if (mediaIndex !== -1) {
    return '/' + normalized.substring(mediaIndex);
  }
  
  // Clean leading slashes and remove 'public/' prefix
  const cleanPath = normalized.replace(/^\/+/, '');
  if (cleanPath.startsWith('public/')) {
    return '/' + cleanPath.substring(7);
  }
  
  return '/' + cleanPath;
};

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  gallery?: string[];
  category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets';
  stock: number;
  status: 'in_stock' | 'out_of_stock';
  featured?: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: 'Tips' | 'Collections' | 'News';
  status: 'draft' | 'published';
  author: string;
  createdAt: string;
}

// Token management helper
export const authStorage = {
  getToken: () => localStorage.getItem('mojuri_token'),
  setToken: (token: string) => localStorage.setItem('mojuri_token', token),
  clearToken: () => localStorage.removeItem('mojuri_token'),
  getUser: (): User | null => {
    const userStr = localStorage.getItem('mojuri_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
  setUser: (user: User) => localStorage.setItem('mojuri_user', JSON.stringify(user)),
  clearUser: () => localStorage.removeItem('mojuri_user'),
  logout: () => {
    localStorage.removeItem('mojuri_token');
    localStorage.removeItem('mojuri_user');
  }
};

// Generic fetch client with authentication
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Set headers
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  // Inject JWT Token
  const token = authStorage.getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = 'Request failed';
    try {
      const errRes = await response.json();
      errorMessage = errRes.error || errRes.message || errorMessage;
    } catch {
      // JSON parsing failed
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

// API methods
export const api = {
  auth: {
    login: async (usernameOrEmail: string, password: string) => {
      const res = await apiFetch<{ token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ usernameOrEmail, password }),
      });
      authStorage.setToken(res.token);
      authStorage.setUser(res.user);
      return res;
    },
    register: async (username: string, email: string, password: string) => {
      const res = await apiFetch<{ token: string; user: User }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });
      authStorage.setToken(res.token);
      authStorage.setUser(res.user);
      return res;
    },
    getMe: async () => {
      const res = await apiFetch<{ user: User }>('/auth/me');
      authStorage.setUser(res.user);
      return res.user;
    }
  },
  
  products: {
    list: async (filters?: { category?: string; search?: string }) => {
      let query = '';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.category) params.set('category', filters.category);
        if (filters.search) params.set('search', filters.search);
        query = `?${params.toString()}`;
      }
      return apiFetch<Product[]>(`/products${query}`);
    },
    get: async (id: string) => {
      return apiFetch<Product>(`/products/${id}`);
    },
    create: async (productData: Omit<Product, 'id' | 'createdAt'>) => {
      return apiFetch<{ message: string; product: Product }>('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
    },
    update: async (id: string, productData: Partial<Omit<Product, 'id' | 'createdAt'>>) => {
      return apiFetch<{ message: string; product: Product }>(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
    },
    delete: async (id: string) => {
      return apiFetch<{ message: string }>(`/products/${id}`, {
        method: 'DELETE',
      });
    }
  },

  orders: {
    list: async () => {
      return apiFetch<Order[]>('/orders');
    },
    get: async (id: string) => {
      return apiFetch<Order>(`/orders/${id}`);
    },
    create: async (orderData: {
      items: Array<{ productId: string; quantity: number }>;
      totalAmount: number;
      shippingAddress: string;
      paymentMethod: string;
    }) => {
      return apiFetch<{ message: string; order: Order }>('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    },
    updateStatus: async (id: string, status: Order['status']) => {
      return apiFetch<{ message: string; order: Order }>(`/orders/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    }
  },

  contacts: {
    list: async () => {
      return apiFetch<Contact[]>('/contacts');
    },
    create: async (contactData: Omit<Contact, 'id' | 'createdAt' | 'status'>) => {
      return apiFetch<{ message: string; contact: Contact }>('/contacts', {
        method: 'POST',
        body: JSON.stringify(contactData),
      });
    },
    updateStatus: async (id: string, status: 'read' | 'unread') => {
      return apiFetch<{ message: string; contact: Contact }>(`/contacts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    },
    delete: async (id: string) => {
      return apiFetch<{ message: string }>(`/contacts/${id}`, {
        method: 'DELETE',
      });
    }
  },

  blogs: {
    list: async (filters?: { category?: string }) => {
      let query = '';
      if (filters?.category) {
        query = `?category=${filters.category}`;
      }
      return apiFetch<Blog[]>(`/blogs${query}`);
    },
    get: async (id: string) => {
      return apiFetch<Blog>(`/blogs/${id}`);
    },
    create: async (blogData: Omit<Blog, 'id' | 'createdAt' | 'author'>) => {
      return apiFetch<{ message: string; blog: Blog }>('/blogs', {
        method: 'POST',
        body: JSON.stringify(blogData),
      });
    },
    update: async (id: string, blogData: Partial<Omit<Blog, 'id' | 'createdAt' | 'author'>>) => {
      return apiFetch<{ message: string; blog: Blog }>(`/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(blogData),
      });
    },
    delete: async (id: string) => {
      return apiFetch<{ message: string }>(`/blogs/${id}`, {
        method: 'DELETE',
      });
    }
  }
};
