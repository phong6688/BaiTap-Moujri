import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// Define Types
export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
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
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
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

// Interfaces for our DB queries
interface DBData {
  users: User[];
  products: Product[];
  orders: Order[];
  contacts: Contact[];
  blogs: Blog[];
}

const isVercel = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
const DATA_DIR = isVercel ? '/tmp' : path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Copy bundled db.json to writeable /tmp on Vercel/production
if (isVercel && !fs.existsSync(DB_FILE)) {
  try {
    const bundledDbPath = path.join(process.cwd(), 'data', 'db.json');
    if (fs.existsSync(bundledDbPath)) {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const content = fs.readFileSync(bundledDbPath, 'utf-8');
      fs.writeFileSync(DB_FILE, content, 'utf-8');
      console.log('Successfully copied bundled db.json to writeable /tmp/db.json');
    }
  } catch (err) {
    console.error('Failed to copy bundled db.json to /tmp/db.json:', err);
  }
}

// Mongoose Schemas for MongoDB fallbacks
const MongooseUserSchema = new mongoose.Schema<User>({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  createdAt: { type: String, required: true }
});

const MongooseProductSchema = new mongoose.Schema<Product>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  category: { type: String, enum: ['Rings', 'Necklaces', 'Earrings', 'Bracelets'], required: true },
  stock: { type: Number, required: true },
  status: { type: String, enum: ['in_stock', 'out_of_stock'], default: 'in_stock' },
  featured: { type: Boolean, default: false },
  createdAt: { type: String, required: true }
});

const MongooseOrderSchema = new mongoose.Schema<Order>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  createdAt: { type: String, required: true }
});

const MongooseContactSchema = new mongoose.Schema<Contact>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  createdAt: { type: String, required: true }
});

const MongooseBlogSchema = new mongoose.Schema<Blog>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, enum: ['Tips', 'Collections', 'News'], required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  author: { type: String, required: true },
  createdAt: { type: String, required: true }
});

// Load Models dynamically
let MongooseUserModel: mongoose.Model<User>;
let MongooseProductModel: mongoose.Model<Product>;
let MongooseOrderModel: mongoose.Model<Order>;
let MongooseContactModel: mongoose.Model<Contact>;
let MongooseBlogModel: mongoose.Model<Blog>;

function initMongooseModels() {
  MongooseUserModel = mongoose.models.User || mongoose.model<User>('User', MongooseUserSchema);
  MongooseProductModel = mongoose.models.Product || mongoose.model<Product>('Product', MongooseProductSchema);
  MongooseOrderModel = mongoose.models.Order || mongoose.model<Order>('Order', MongooseOrderSchema);
  MongooseContactModel = mongoose.models.Contact || mongoose.model<Contact>('Contact', MongooseContactSchema);
  MongooseBlogModel = mongoose.models.Blog || mongoose.model<Blog>('Blog', MongooseBlogSchema);
}

// Seed Data
const defaultUsers: User[] = [
  {
    id: 'u1',
    username: 'admin',
    email: 'admin@mojuri.com',
    passwordHash: '$2b$10$A/3otWe39fEiRBxRWX9tn.7PV3P1ZLYmJUOiIuhKWfkqSbeVO0YJa', // adminpassword
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: 'u2',
    username: 'customer',
    email: 'customer@mojuri.com',
    passwordHash: '$2b$10$S.YeHrTERngj202J3IG8gu8npQvA/buxVKj1ZMvS.NBzsDxwwsy.W', // password123
    role: 'customer',
    createdAt: new Date().toISOString()
  }
];

const defaultProducts: Product[] = [
  {
    id: 'p1',
    name: 'Charm Club Bracelet',
    description: 'A beautiful classic link bracelet in 925 Sterling Silver, perfect for adding your favorite charms.',
    price: 49.00,
    salePrice: 39.00,
    image: '/media/product/1.jpg',
    gallery: ['/media/product/1.jpg', '/media/product/1-2.jpg'],
    category: 'Bracelets',
    stock: 25,
    status: 'in_stock',
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2',
    name: 'Princess Tiara Crown Ring',
    description: 'Make a royal statement with this tiara ring in sterling silver, featuring sparkling cubic zirconia stones.',
    price: 69.00,
    salePrice: 59.00,
    image: '/media/product/2.jpg',
    gallery: ['/media/product/2.jpg', '/media/product/2-2.jpg'],
    category: 'Rings',
    stock: 15,
    status: 'in_stock',
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p3',
    name: 'Classic Elegance Earrings',
    description: 'Timeless halo stud earrings featuring round cubic zirconia crystals framed by smaller pavé stones.',
    price: 79.00,
    image: '/media/product/3.jpg',
    gallery: ['/media/product/3.jpg', '/media/product/3-2.jpg'],
    category: 'Earrings',
    stock: 20,
    status: 'in_stock',
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p4',
    name: 'Solitaire Heart Pendant Necklace',
    description: 'Express your love with this classic sterling silver necklace featuring a sparkling heart-shaped central stone.',
    price: 89.00,
    image: '/media/product/4.jpg',
    gallery: ['/media/product/4.jpg', '/media/product/4-2.jpg'],
    category: 'Necklaces',
    stock: 10,
    status: 'in_stock',
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p5',
    name: 'Gold Plated Hoop Earrings',
    description: 'Simple and elegant hoop earrings plated with 18k yellow gold. Lightweight for all-day comfort.',
    price: 59.00,
    salePrice: 49.00,
    image: '/media/product/5.jpg',
    gallery: ['/media/product/5.jpg', '/media/product/5-2.jpg'],
    category: 'Earrings',
    stock: 30,
    status: 'in_stock',
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p6',
    name: 'Silver Twist Band Ring',
    description: 'Delicate band ring with a twisted rope design in highly polished sterling silver.',
    price: 35.00,
    image: '/media/product/6.jpg',
    gallery: ['/media/product/6.jpg', '/media/product/6-2.jpg'],
    category: 'Rings',
    stock: 0,
    status: 'out_of_stock',
    featured: false,
    createdAt: new Date().toISOString()
  }
];

const defaultBlogs: Blog[] = [
  {
    id: 'b1',
    title: 'How to Care for Your Sterling Silver Jewelry',
    summary: 'Discover the best tips and tricks to keep your silver jewelry shiny and prevent tarnishing.',
    content: 'Sterling silver is a beautiful and durable precious metal, but it can tarnish over time due to exposure to air and moisture. To keep your sterling silver jewelry looking its best, follow these simple care steps: 1. Store your silver in airtight bags. 2. Clean with a silver polishing cloth regularly. 3. Avoid wearing silver in hot tubs, pools, or while using cleaning chemicals. By taking proactive care of your items, you will preserve their sparkle for generations to come.',
    image: '/media/blog/1.jpg',
    category: 'Tips',
    status: 'published',
    author: 'Admin',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b2',
    title: 'Summer Jewelry Trends for 2026',
    summary: 'From chunky gold chains to delicate charms, see what jewelry is trending this summer.',
    content: 'This summer is all about expressing individuality through unique, layered combinations. We are seeing a major rise in: - Dynamic charm bracelets that tell a personal story. - Stackable band rings with different textures. - Statement gold-plated hoops that bridge casual and formal styles. Explore our catalog and pick your favorites to create the perfect sun-kissed look!',
    image: '/media/blog/2.jpg',
    category: 'Collections',
    status: 'published',
    author: 'Fashion Editor',
    createdAt: new Date().toISOString()
  }
];

const defaultContacts: Contact[] = [
  {
    id: 'c1',
    name: 'Nguyen Van A',
    email: 'nva@example.com',
    subject: 'Inquiry about Charm Club Bracelet',
    message: 'Hello, is this bracelet resizeable? I want to buy it for my sister.',
    status: 'unread',
    createdAt: new Date().toISOString()
  }
];

// Helper to check MongoDB connection status
let isConnected = false;
async function connectToMongo(): Promise<boolean> {
  if (isConnected) return true;
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) return false;

  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    initMongooseModels();
    console.log('MongoDB connected successfully!');
    return true;
  } catch (error) {
    console.error('Failed to connect to MongoDB, falling back to JSON file:', error);
    return false;
  }
}

// JSON File DB helper functions
function readJSONDB(): DBData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DBData = {
      users: defaultUsers,
      products: defaultProducts,
      orders: [],
      contacts: defaultContacts,
      blogs: defaultBlogs
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    return {
      users: parsed.users || defaultUsers,
      products: parsed.products || defaultProducts,
      orders: parsed.orders || [],
      contacts: parsed.contacts || defaultContacts,
      blogs: parsed.blogs || defaultBlogs
    };
  } catch (e) {
    console.error('Error reading JSON DB, resetting to defaults:', e);
    const initialData: DBData = {
      users: defaultUsers,
      products: defaultProducts,
      orders: [],
      contacts: defaultContacts,
      blogs: defaultBlogs
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function writeJSONDB(data: DBData) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Export database operations
export const db = {
  users: {
    findMany: async (): Promise<User[]> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        return await MongooseUserModel.find({}).lean() as unknown as User[];
      }
      return readJSONDB().users;
    },
    findOne: async (query: { id?: string; email?: string; username?: string }): Promise<User | null> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        return await MongooseUserModel.findOne(query).lean() as unknown as User | null;
      }
      const data = readJSONDB();
      const user = data.users.find(u => {
        if (query.id && u.id === query.id) return true;
        if (query.email && u.email.toLowerCase() === query.email.toLowerCase()) return true;
        if (query.username && u.username.toLowerCase() === query.username.toLowerCase()) return true;
        return false;
      });
      return user || null;
    },
    create: async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
      const isMongo = await connectToMongo();
      const newUser: User = {
        ...userData,
        id: 'u_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };

      if (isMongo) {
        const created = await MongooseUserModel.create(newUser);
        return created.toObject() as unknown as User;
      }

      const data = readJSONDB();
      data.users.push(newUser);
      writeJSONDB(data);
      return newUser;
    }
  },

  products: {
    findMany: async (query?: { category?: string; search?: string }): Promise<Product[]> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        const mongoQuery: any = {};
        if (query?.category) {
          mongoQuery.category = query.category;
        }
        if (query?.search) {
          mongoQuery.$or = [
            { name: { $regex: query.search, $options: 'i' } },
            { description: { $regex: query.search, $options: 'i' } }
          ];
        }
        return await MongooseProductModel.find(mongoQuery).lean() as unknown as Product[];
      }

      let list = readJSONDB().products;
      if (query?.category) {
        list = list.filter(p => p.category.toLowerCase() === query.category?.toLowerCase());
      }
      if (query?.search) {
        const searchLower = query.search.toLowerCase();
        list = list.filter(p => 
          p.name.toLowerCase().includes(searchLower) || 
          p.description.toLowerCase().includes(searchLower)
        );
      }
      return list;
    },
    findOne: async (query: { id: string }): Promise<Product | null> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        return await MongooseProductModel.findOne({ id: query.id }).lean() as unknown as Product | null;
      }
      const products = readJSONDB().products;
      return products.find(p => p.id === query.id) || null;
    },
    create: async (productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
      const isMongo = await connectToMongo();
      const newProduct: Product = {
        ...productData,
        id: 'p_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };

      if (isMongo) {
        const created = await MongooseProductModel.create(newProduct);
        return created.toObject() as unknown as Product;
      }

      const data = readJSONDB();
      data.products.push(newProduct);
      writeJSONDB(data);
      return newProduct;
    },
    update: async (id: string, productData: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product | null> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        const updated = await MongooseProductModel.findOneAndUpdate({ id }, { $set: productData }, { new: true }).lean();
        return updated as unknown as Product | null;
      }

      const data = readJSONDB();
      const idx = data.products.findIndex(p => p.id === id);
      if (idx === -1) return null;

      data.products[idx] = {
        ...data.products[idx],
        ...productData
      } as Product;
      writeJSONDB(data);
      return data.products[idx];
    },
    delete: async (id: string): Promise<boolean> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        const res = await MongooseProductModel.deleteOne({ id });
        return res.deletedCount > 0;
      }

      const data = readJSONDB();
      const initialLength = data.products.length;
      data.products = data.products.filter(p => p.id !== id);
      writeJSONDB(data);
      return data.products.length < initialLength;
    }
  },

  orders: {
    findMany: async (query?: { userId?: string }): Promise<Order[]> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        const mongoQuery: any = {};
        if (query?.userId) {
          mongoQuery.userId = query.userId;
        }
        return await MongooseOrderModel.find(mongoQuery).sort({ createdAt: -1 }).lean() as unknown as Order[];
      }

      let list = readJSONDB().orders;
      if (query?.userId) {
        list = list.filter(o => o.userId === query.userId);
      }
      return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    findOne: async (query: { id: string }): Promise<Order | null> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        return await MongooseOrderModel.findOne({ id: query.id }).lean() as unknown as Order | null;
      }
      const orders = readJSONDB().orders;
      return orders.find(o => o.id === query.id) || null;
    },
    create: async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
      const isMongo = await connectToMongo();
      const newOrder: Order = {
        ...orderData,
        id: 'o_' + Math.random().toString(36).substr(2, 9),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      if (isMongo) {
        const created = await MongooseOrderModel.create(newOrder);
        return created.toObject() as unknown as Order;
      }

      const data = readJSONDB();
      data.orders.push(newOrder);
      writeJSONDB(data);
      return newOrder;
    },
    update: async (id: string, orderData: Partial<Pick<Order, 'status'>>): Promise<Order | null> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        const updated = await MongooseOrderModel.findOneAndUpdate({ id }, { $set: orderData }, { new: true }).lean();
        return updated as unknown as Order | null;
      }

      const data = readJSONDB();
      const idx = data.orders.findIndex(o => o.id === id);
      if (idx === -1) return null;

      data.orders[idx] = {
        ...data.orders[idx],
        ...orderData
      } as Order;
      writeJSONDB(data);
      return data.orders[idx];
    },
    delete: async (id: string): Promise<boolean> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        const res = await MongooseOrderModel.deleteOne({ id });
        return res.deletedCount > 0;
      }

      const data = readJSONDB();
      const initialLength = data.orders.length;
      data.orders = data.orders.filter(o => o.id !== id);
      writeJSONDB(data);
      return data.orders.length < initialLength;
    }
  },

  contacts: {
    findMany: async (): Promise<Contact[]> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        return await MongooseContactModel.find({}).sort({ createdAt: -1 }).lean() as unknown as Contact[];
      }
      return readJSONDB().contacts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    findOne: async (query: { id: string }): Promise<Contact | null> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        return await MongooseContactModel.findOne({ id: query.id }).lean() as unknown as Contact | null;
      }
      const contacts = readJSONDB().contacts;
      return contacts.find(c => c.id === query.id) || null;
    },
    create: async (contactData: Omit<Contact, 'id' | 'createdAt' | 'status'>): Promise<Contact> => {
      const isMongo = await connectToMongo();
      const newContact: Contact = {
        ...contactData,
        id: 'c_' + Math.random().toString(36).substr(2, 9),
        status: 'unread',
        createdAt: new Date().toISOString()
      };

      if (isMongo) {
        const created = await MongooseContactModel.create(newContact);
        return created.toObject() as unknown as Contact;
      }

      const data = readJSONDB();
      data.contacts.push(newContact);
      writeJSONDB(data);
      return newContact;
    },
    update: async (id: string, contactData: Partial<Pick<Contact, 'status'>>): Promise<Contact | null> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        const updated = await MongooseContactModel.findOneAndUpdate({ id }, { $set: contactData }, { new: true }).lean();
        return updated as unknown as Contact | null;
      }

      const data = readJSONDB();
      const idx = data.contacts.findIndex(c => c.id === id);
      if (idx === -1) return null;

      data.contacts[idx] = {
        ...data.contacts[idx],
        ...contactData
      } as Contact;
      writeJSONDB(data);
      return data.contacts[idx];
    },
    delete: async (id: string): Promise<boolean> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        const res = await MongooseContactModel.deleteOne({ id });
        return res.deletedCount > 0;
      }

      const data = readJSONDB();
      const initialLength = data.contacts.length;
      data.contacts = data.contacts.filter(c => c.id !== id);
      writeJSONDB(data);
      return data.contacts.length < initialLength;
    }
  },

  blogs: {
    findMany: async (query?: { category?: string }): Promise<Blog[]> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        const mongoQuery: any = {};
        if (query?.category) {
          mongoQuery.category = query.category;
        }
        return await MongooseBlogModel.find(mongoQuery).sort({ createdAt: -1 }).lean() as unknown as Blog[];
      }

      let list = readJSONDB().blogs;
      if (query?.category) {
        list = list.filter(b => b.category.toLowerCase() === query.category?.toLowerCase());
      }
      return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    findOne: async (query: { id: string }): Promise<Blog | null> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        return await MongooseBlogModel.findOne({ id: query.id }).lean() as unknown as Blog | null;
      }
      const blogs = readJSONDB().blogs;
      return blogs.find(b => b.id === query.id) || null;
    },
    create: async (blogData: Omit<Blog, 'id' | 'createdAt'>): Promise<Blog> => {
      const isMongo = await connectToMongo();
      const newBlog: Blog = {
        ...blogData,
        id: 'b_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };

      if (isMongo) {
        const created = await MongooseBlogModel.create(newBlog);
        return created.toObject() as unknown as Blog;
      }

      const data = readJSONDB();
      data.blogs.push(newBlog);
      writeJSONDB(data);
      return newBlog;
    },
    update: async (id: string, blogData: Partial<Omit<Blog, 'id' | 'createdAt'>>): Promise<Blog | null> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        const updated = await MongooseBlogModel.findOneAndUpdate({ id }, { $set: blogData }, { new: true }).lean();
        return updated as unknown as Blog | null;
      }

      const data = readJSONDB();
      const idx = data.blogs.findIndex(b => b.id === id);
      if (idx === -1) return null;

      data.blogs[idx] = {
        ...data.blogs[idx],
        ...blogData
      } as Blog;
      writeJSONDB(data);
      return data.blogs[idx];
    },
    delete: async (id: string): Promise<boolean> => {
      const isMongo = await connectToMongo();
      if (isMongo) {
        const res = await MongooseBlogModel.deleteOne({ id });
        return res.deletedCount > 0;
      }

      const data = readJSONDB();
      const initialLength = data.blogs.length;
      data.blogs = data.blogs.filter(b => b.id !== id);
      writeJSONDB(data);
      return data.blogs.length < initialLength;
    }
  }
};
