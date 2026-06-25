import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Username or Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Product description is required'),
  price: z.number().positive('Price must be greater than 0'),
  salePrice: z.number().nonnegative().optional(),
  image: z.string().min(1, 'Image path is required'),
  gallery: z.array(z.string()).optional(),
  category: z.enum(['Rings', 'Necklaces', 'Earrings', 'Bracelets']),
  stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
  status: z.enum(['in_stock', 'out_of_stock']).optional(),
  featured: z.boolean().optional(),
});

export const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive('Quantity must be greater than 0'),
});

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item'),
  totalAmount: z.number().nonnegative(),
  shippingAddress: z.string().min(5, 'Shipping address is required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export const blogSchema = z.object({
  title: z.string().min(1, 'Blog title is required'),
  summary: z.string().min(1, 'Blog summary is required'),
  content: z.string().min(1, 'Blog content is required'),
  image: z.string().min(1, 'Blog image is required'),
  category: z.enum(['Tips', 'Collections', 'News']),
  status: z.enum(['draft', 'published']).optional(),
});
