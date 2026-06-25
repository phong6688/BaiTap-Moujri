import React, { useState, useEffect } from 'react';
import { api, authStorage, resolveImagePath } from '../lib/api';
import type { Product, Order, Blog, Contact } from '../lib/api';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  LogOut, 
  ArrowLeft, 
  Plus, 
  Edit2, 
  Trash2, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  AlertCircle,
  UserCheck,
  RefreshCw,
  Search,
  FileText,
  Mail,
  Check,
  Calendar,
  Send
} from 'lucide-react';


const AdminDashboard: React.FC = () => {
  // Authentication states
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState<string>('admin@mojuri.com');
  const [loginPassword, setLoginPassword] = useState<string>('adminpassword');
  const [loginError, setLoginError] = useState<string>('');

  // Tab management
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'blogs' | 'contacts'>('dashboard');

  // Business data
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  // Search filters
  const [productSearch, setProductSearch] = useState<string>('');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [blogSearch, setBlogSearch] = useState<string>('');
  const [contactSearch, setContactSearch] = useState<string>('');

  // CRUD Product modal states
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: 0,
    salePrice: 0,
    image: '/media/product/1.jpg',
    gallery: [] as string[],
    category: 'Bracelets' as Product['category'],
    stock: 10,
    status: 'in_stock' as Product['status'],
    featured: false
  });
  const [productFormError, setProductFormError] = useState<string>('');
  const [galleryInput, setGalleryInput] = useState<string>('');

  // CRUD Blog modal states
  const [blogModalOpen, setBlogModalOpen] = useState<boolean>(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    summary: '',
    content: '',
    image: '/media/blog/1.jpg',
    category: 'Tips' as Blog['category'],
    status: 'published' as Blog['status']
  });
  const [blogFormError, setBlogFormError] = useState<string>('');

  // Mock Reply Modal states
  const [replyModalOpen, setReplyModalOpen] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [replySending, setReplySending] = useState<boolean>(false);

  // Check admin role on load
  useEffect(() => {
    const checkAdmin = async () => {
      const token = authStorage.getToken();
      const user = authStorage.getUser();
      
      if (token && user && user.role === 'admin') {
        setIsAdmin(true);
        loadAllData();
      } else if (token) {
        try {
          const profile = await api.auth.getMe();
          if (profile.role === 'admin') {
            setIsAdmin(true);
            loadAllData();
          } else {
            setIsAdmin(false);
          }
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoadingAuth(false);
    };

    checkAdmin();
  }, []);

  const loadAllData = async () => {
    setLoadingData(true);
    try {
      const [prodList, ordList, blogList, contactList] = await Promise.all([
        api.products.list(),
        api.orders.list(),
        api.blogs.list(),
        api.contacts.list()
      ]);
      setProducts(prodList);
      setOrders(ordList);
      setBlogs(blogList);
      setContacts(contactList);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  // Authenticate Admin
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await api.auth.login(loginEmail, loginPassword);
      if (res.user.role === 'admin') {
        setIsAdmin(true);
        loadAllData();
      } else {
        setLoginError('Access denied: You are not authorized as an administrator.');
        authStorage.logout();
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    authStorage.logout();
    setIsAdmin(false);
  };

  // CRUD Product Actions
  const openCreateProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: 0,
      salePrice: 0,
      image: '/media/product/1.jpg',
      gallery: ['/media/product/1.jpg', '/media/product/1-2.jpg'],
      category: 'Bracelets',
      stock: 10,
      status: 'in_stock',
      featured: false
    });
    setGalleryInput('/media/product/1.jpg, /media/product/1-2.jpg');
    setProductFormError('');
    setProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      salePrice: product.salePrice || 0,
      image: product.image,
      gallery: product.gallery || [],
      category: product.category,
      stock: product.stock,
      status: product.status,
      featured: product.featured || false
    });
    setGalleryInput((product.gallery || []).join(', '));
    setProductFormError('');
    setProductModalOpen(true);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductFormError('');
    
    if (!productForm.name || !productForm.description || productForm.price <= 0 || !productForm.image || productForm.stock < 0) {
      setProductFormError('Please fill in all fields with valid data.');
      return;
    }

    // Parse gallery input
    const parsedGallery = galleryInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const payload = {
      ...productForm,
      price: Number(productForm.price),
      salePrice: productForm.salePrice > 0 ? Number(productForm.salePrice) : undefined,
      stock: Number(productForm.stock),
      gallery: parsedGallery,
      status: productForm.stock > 0 ? ('in_stock' as const) : ('out_of_stock' as const)
    };

    try {
      if (editingProduct) {
        await api.products.update(editingProduct.id, payload);
      } else {
        await api.products.create(payload);
      }
      setProductModalOpen(false);
      loadAllData();
    } catch (err: any) {
      setProductFormError(err.message || 'Failed to save product.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await api.products.delete(id);
        loadAllData();
      } catch (err: any) {
        alert(err.message || 'Failed to delete product.');
      }
    }
  };

  // CRUD Blog Actions
  const openCreateBlogModal = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      summary: '',
      content: '',
      image: '/media/blog/1.jpg',
      category: 'Tips',
      status: 'published'
    });
    setBlogFormError('');
    setBlogModalOpen(true);
  };

  const openEditBlogModal = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      status: blog.status
    });
    setBlogFormError('');
    setBlogModalOpen(true);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogFormError('');

    if (!blogForm.title || !blogForm.summary || !blogForm.content || !blogForm.image) {
      setBlogFormError('All fields are required.');
      return;
    }

    try {
      if (editingBlog) {
        await api.blogs.update(editingBlog.id, blogForm);
      } else {
        await api.blogs.create(blogForm);
      }
      setBlogModalOpen(false);
      loadAllData();
    } catch (err: any) {
      setBlogFormError(err.message || 'Failed to save blog post.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await api.blogs.delete(id);
        loadAllData();
      } catch (err: any) {
        alert(err.message || 'Failed to delete blog post.');
      }
    }
  };

  // Contact actions
  const handleToggleContactStatus = async (id: string, currentStatus: 'unread' | 'read') => {
    try {
      const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
      await api.contacts.updateStatus(id, nextStatus);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to update contact status.');
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await api.contacts.delete(id);
        loadAllData();
      } catch (err: any) {
        alert(err.message || 'Failed to delete message.');
      }
    }
  };

  // Mock Reply actions
  const openReplyModal = (contact: Contact) => {
    setSelectedContact(contact);
    setReplyText(`Dear ${contact.name},\n\nThank you for reaching out to Mojuri Support. Concerning your inquiry: "${contact.subject}"...\n\nSincerely,\nMojuri Support Team`);
    setReplyModalOpen(true);
  };

  const handleSendReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReplySending(true);

    // Mock delay for email send
    setTimeout(async () => {
      alert(`Reply email successfully sent to: ${selectedContact?.email}`);
      setReplySending(false);
      setReplyModalOpen(false);
      
      // Auto mark message as read on reply
      if (selectedContact && selectedContact.status === 'unread') {
        try {
          await api.contacts.updateStatus(selectedContact.id, 'read');
          loadAllData();
        } catch {
          // ignore
        }
      }
    }, 1200);
  };

  // Order status actions
  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await api.orders.updateStatus(orderId, status);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to update order status.');
    }
  };

  // Calculations for stats dashboard & revenue breakdown
  const completedOrders = orders.filter(o => o.status === 'completed');

  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const unreadMessages = contacts.filter(c => c.status === 'unread').length;

  // Group revenue by date (daily breakdown)
  const revenueByDate: { [key: string]: number } = {};
  completedOrders.forEach(o => {
    const dateStr = new Date(o.createdAt).toLocaleDateString();
    revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + o.totalAmount;
  });

  // Group revenue by month
  const revenueByMonth: { [key: string]: number } = {};
  completedOrders.forEach(o => {
    const date = new Date(o.createdAt);
    const monthStr = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    revenueByMonth[monthStr] = (revenueByMonth[monthStr] || 0) + o.totalAmount;
  });

  // Filters
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.userEmail.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.status.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.category.toLowerCase().includes(blogSearch.toLowerCase())
  );

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.subject.toLowerCase().includes(contactSearch.toLowerCase())
  );

  if (loadingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-100 font-sans">
        <div className="text-center space-y-4">
          <RefreshCw className="h-10 w-10 animate-spin text-emerald-400 mx-auto" />
          <p className="text-sm tracking-wider uppercase font-medium">Authenticating System Access...</p>
        </div>
      </div>
    );
  }

  // --- LOGIN GATES (Unauthorised Access Block) ---
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 font-sans p-6">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl"></div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Mojuri</h1>
            <p className="text-slate-100 text-sm">Control Panel | Systems Administrator</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            {loginError && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-100 mb-2">Administrator Email</label>
              <input
                type="email"
                required
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-100 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-lg transition-colors cursor-pointer text-sm shadow-lg shadow-emerald-500/15"
            >
              Sign In to System
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
            <a href="/" className="inline-flex items-center text-xs text-slate-100 hover:text-white transition-colors gap-1.5">
              <ArrowLeft className="h-3 w-3" />
              Return to Storefront
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 text-slate-950 p-2 rounded-lg font-bold text-xl tracking-wider">M</div>
            <div>
              <h2 className="font-bold text-lg text-white">Mojuri Admin</h2>
              <span className="text-xs text-slate-100">System Dashboard</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'dashboard' 
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/10' 
                : 'text-slate-100 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Control Center
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'products' 
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/10' 
                : 'text-slate-100 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Package className="h-4 w-4" />
            Products Inventory
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'orders' 
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/10' 
                : 'text-slate-100 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            Orders Management
            {pendingOrders > 0 && (
              <span className="ml-auto bg-emerald-500/20 text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                {pendingOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'blogs' 
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/10' 
                : 'text-slate-100 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FileText className="h-4 w-4" />
            Blogs & SEO Editor
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'contacts' 
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/10' 
                : 'text-slate-100 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Mail className="h-4 w-4" />
            Support Inbox
            {unreadMessages > 0 && (
              <span className="ml-auto bg-rose-500/20 text-rose-400 font-bold text-[10px] px-2 py-0.5 rounded-full border border-rose-500/30">
                {unreadMessages}
              </span>
            )}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-100 hover:text-white hover:bg-slate-800/40 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Store
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Disconnect System
          </button>
        </div>
      </aside>

      {/* MAIN VIEW CONTROLLER */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between px-8 py-4 sticky top-0 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-100">Section:</span>
            <span className="text-sm font-semibold capitalize text-white">{activeTab}</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={loadAllData} 
              disabled={loadingData}
              className="p-2 text-slate-100 hover:text-white bg-slate-800/40 border border-slate-800 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loadingData ? 'animate-spin' : ''}`} />
            </button>
            <div className="h-4 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2.5 bg-slate-800/30 px-3 py-1.5 rounded-lg border border-slate-800">
              <UserCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-100">admin@mojuri.com</span>
            </div>
          </div>
        </header>

        <div className="flex-grow p-8">
          
          {/* TAB 1: SUMMARY & REVENUE REPORT */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-white tracking-tight">System Status Overview</h1>
                <p className="text-slate-100 text-sm">Real-time status updates of products, sales metrics, and logs.</p>
              </div>

              {/* STATS TILES */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-100 uppercase tracking-wider">Revenue Stream</span>
                    <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-500 border border-emerald-500/20">
                      <DollarSign className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">${totalRevenue.toFixed(2)}</h3>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    From completed orders
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-100 uppercase tracking-wider">Total Sales Logs</span>
                    <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 border border-emerald-500/20">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{orders.length}</h3>
                  <p className="text-xs text-slate-100">Submitted checkouts</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-100 uppercase tracking-wider">Awaiting Dispatch</span>
                    <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400 border border-emerald-500/30">
                      <Clock className="h-4 w-4 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-400 mb-1">{pendingOrders}</h3>
                  <p className="text-xs text-slate-100">Pending customer fulfillments</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-100 uppercase tracking-wider">Support Tickets</span>
                    <div className="bg-rose-500/10 p-2 rounded-lg text-rose-400 border border-rose-500/20">
                      <Mail className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-rose-400 mb-1">{unreadMessages} unread</h3>
                  <p className="text-xs text-slate-100">Customer feedback inbox</p>
                </div>
              </div>

              {/* REVENUE STATISTICS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sales by Date */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="h-4.5 w-4.5 text-emerald-400" />
                    Daily Revenue Breakdown
                  </h3>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {Object.keys(revenueByDate).length === 0 ? (
                      <p className="text-emerald-300 text-sm">No sales logs recorded yet.</p>
                    ) : (
                      Object.keys(revenueByDate).map(date => (
                        <div key={date} className="flex justify-between items-center py-2 border-b border-slate-800/60 text-sm">
                          <span className="text-slate-100">{date}</span>
                          <span className="font-semibold text-white">${revenueByDate[date].toFixed(2)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Sales by Month */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4.5 w-4.5 text-emerald-500" />
                    Monthly Revenue Breakdown
                  </h3>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {Object.keys(revenueByMonth).length === 0 ? (
                      <p className="text-emerald-300 text-sm">No monthly entries logged.</p>
                    ) : (
                      Object.keys(revenueByMonth).map(month => (
                        <div key={month} className="flex justify-between items-center py-2 border-b border-slate-800/60 text-sm">
                          <span className="text-slate-100">{month}</span>
                          <span className="font-semibold text-emerald-400">${revenueByMonth[month].toFixed(2)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS CRUD SECTION */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold text-white tracking-tight">Products Inventory</h1>
                  <p className="text-slate-100 text-sm">Manage products catalog in the database.</p>
                </div>

                <button
                  onClick={openCreateProductModal}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-500/10 transition-colors text-sm cursor-pointer"
                >
                  <Plus className="h-4.5 w-4.5" />
                  Add Jewelry Item
                </button>
              </div>

              {/* SEARCH BOX */}
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-100" />
                <input
                  type="text"
                  placeholder="Search item name or category..."
                  className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>

              {/* PRODUCTS LIST TABLE */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-950/40 text-slate-100 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                        <th className="px-6 py-4">Jewelry Photo</th>
                        <th className="px-6 py-4">Product Specs</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Item Price</th>
                        <th className="px-6 py-4">Sale Price</th>
                        <th className="px-6 py-4">Remaining Stock</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-800/10 transition-colors text-white">
                          <td className="px-6 py-4">
                            <img 
                              src={resolveImagePath(product.image)} 
                              alt={product.name} 
                              className="w-12 h-12 rounded-lg object-cover bg-slate-950 border border-slate-800"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=120';
                              }}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                                {product.name}
                                {product.featured && (
                                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                                    Featured
                                  </span>
                                )}
                              </h4>
                              <p className="text-xs text-slate-100 line-clamp-1 max-w-sm mt-0.5">{product.description}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-semibold">
                            <span className="bg-slate-950 border border-slate-800 text-white px-2 py-1 rounded-md">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-100">${product.price.toFixed(2)}</td>
                          <td className="px-6 py-4 font-bold text-emerald-400">
                            {product.salePrice ? `$${product.salePrice.toFixed(2)}` : '-'}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                              product.stock === 0 ? 'text-rose-400' : 'text-white'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                product.stock === 0 ? 'bg-rose-500' : 'bg-emerald-500'
                              }`} />
                              {product.stock} units ({product.status === 'in_stock' ? 'In Stock' : 'Out of Stock'})
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2.5">
                              <button
                                onClick={() => openEditProductModal(product)}
                                className="p-1.5 hover:text-emerald-400 hover:bg-slate-800 rounded transition-all cursor-pointer"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-1.5 hover:text-rose-500 hover:bg-slate-800 rounded transition-all cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS SECTION */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-white tracking-tight">Orders Management</h1>
                <p className="text-slate-100 text-sm">Update shipment and checkout statuses.</p>
              </div>

              {/* SEARCH BOX */}
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-100" />
                <input
                  type="text"
                  placeholder="Search order ID, customer email..."
                  className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                />
              </div>

              {/* ORDERS TABLE */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-950/40 text-slate-100 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Customer Details</th>
                        <th className="px-6 py-4">Purchased Items</th>
                        <th className="px-6 py-4">Total Value</th>
                        <th className="px-6 py-4">Fulfillment Status</th>
                        <th className="px-6 py-4">Order Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-800/10 transition-colors text-white">
                          <td className="px-6 py-4 font-mono text-xs font-bold text-slate-100">{order.id}</td>
                          <td className="px-6 py-4">
                            <div className="text-xs">
                              <p className="font-semibold text-emerald-100">{order.userEmail}</p>
                              <p className="text-slate-100 mt-1 max-w-[180px] line-clamp-2 italic">{order.shippingAddress}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-slate-950/30 px-2 py-0.5 rounded text-xs">
                                  <span className="truncate mr-2 font-medium text-white">{item.name}</span>
                                  <span className="font-mono font-bold text-emerald-400">x{item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-100">${order.totalAmount.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1.5">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border max-w-fit capitalize ${
                                ['completed', 'delivered'].includes(order.status) ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                order.status === 'cancelled' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                order.status === 'pending' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                              }`}>
                                {order.status}
                              </span>

                              <select
                                className="bg-slate-950 text-emerald-100 text-xs rounded border border-slate-800 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                                value={order.status}
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-100">
                            {new Date(order.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BLOGS SECTION */}
          {activeTab === 'blogs' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold text-white tracking-tight">Blogs & Articles SEO Management</h1>
                  <p className="text-slate-100 text-sm">Write articles, design SEO headlines, and update publish drafts.</p>
                </div>

                <button
                  onClick={openCreateBlogModal}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-500/10 transition-colors text-sm cursor-pointer"
                >
                  <Plus className="h-4.5 w-4.5" />
                  Write Article
                </button>
              </div>

              {/* SEARCH BOX */}
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-100" />
                <input
                  type="text"
                  placeholder="Search articles by title or tag..."
                  className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                />
              </div>

              {/* BLOG ARTICLES TABLE */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-950/40 text-slate-100 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                        <th className="px-6 py-4">Cover</th>
                        <th className="px-6 py-4">Article Specs</th>
                        <th className="px-6 py-4">Tag/Category</th>
                        <th className="px-6 py-4">Author</th>
                        <th className="px-6 py-4">Publish State</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredBlogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-slate-800/10 transition-colors text-white">
                          <td className="px-6 py-4">
                            <img 
                              src={resolveImagePath(blog.image)} 
                              alt={blog.title} 
                              className="w-12 h-12 rounded-lg object-cover bg-slate-950 border border-slate-800"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=120';
                              }}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <h4 className="font-bold text-slate-100 text-sm">{blog.title}</h4>
                              <p className="text-xs text-slate-100 line-clamp-1 max-w-sm mt-0.5">{blog.summary}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs">
                            <span className="bg-slate-950 border border-slate-800 text-white px-2 py-1 rounded-md">
                              {blog.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-white">{blog.author}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                              blog.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-100 border-slate-700'
                            }`}>
                              {blog.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-100">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2.5">
                              <button
                                onClick={() => openEditBlogModal(blog)}
                                className="p-1.5 hover:text-emerald-400 hover:bg-slate-800 rounded transition-all cursor-pointer"
                                title="Edit Post"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(blog.id)}
                                className="p-1.5 hover:text-rose-500 hover:bg-slate-800 rounded transition-all cursor-pointer"
                                title="Delete Post"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredBlogs.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-10 text-emerald-300 text-sm">
                            No articles matching search filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CONTACTS SUPPORT INBOX */}
          {activeTab === 'contacts' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-white tracking-tight">Customer Support Inbox</h1>
                <p className="text-slate-100 text-sm">Review queries submitted by store visitors and respond via mock emails.</p>
              </div>

              {/* SEARCH BOX */}
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-100" />
                <input
                  type="text"
                  placeholder="Search contacts by name, email, or subject..."
                  className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                />
              </div>

              {/* SUPPORT MESSAGES BOX */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-950/40 text-slate-100 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                        <th className="px-6 py-4">State</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4">Subject & Message</th>
                        <th className="px-6 py-4">Received Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredContacts.map((contact) => (
                        <tr 
                          key={contact.id} 
                          className={`hover:bg-slate-800/10 transition-colors ${
                            contact.status === 'unread' ? 'bg-emerald-500/[0.02] text-white font-medium' : 'text-slate-100'
                          }`}
                        >
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                              contact.status === 'unread' ? 'text-emerald-400' : 'text-emerald-300'
                            }`}>
                              <span className={`w-2 h-2 rounded-full ${
                                contact.status === 'unread' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-650'
                              }`} />
                              {contact.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-xs">
                              <p className="font-bold text-emerald-100">{contact.name}</p>
                              <p className="text-slate-100 mt-0.5">{contact.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="max-w-md">
                              <h4 className="text-sm font-semibold text-emerald-100">{contact.subject}</h4>
                              <p className="text-xs text-slate-100 mt-1 whitespace-pre-wrap">{contact.message}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs">
                            {new Date(contact.createdAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleToggleContactStatus(contact.id, contact.status)}
                                className="p-1.5 hover:text-emerald-400 hover:bg-slate-800 rounded transition-all cursor-pointer"
                                title={contact.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                              >
                                <Check className="h-4.5 w-4.5" />
                              </button>
                              <button
                                onClick={() => openReplyModal(contact)}
                                className="p-1.5 hover:text-emerald-500 hover:bg-slate-800 rounded transition-all cursor-pointer"
                                title="Reply Email"
                              >
                                <Send className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteContact(contact.id)}
                                className="p-1.5 hover:text-rose-500 hover:bg-slate-800 rounded transition-all cursor-pointer"
                                title="Delete Ticket"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredContacts.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-10 text-emerald-300 text-sm">
                            No inquiries match filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* --- CRUD PRODUCT MODAL PANEL --- */}
      {productModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-white">{editingProduct ? 'Edit Product Details' : 'Create Product Entry'}</h3>
              <button onClick={() => setProductModalOpen(false)} className="text-slate-100 hover:text-white transition-colors cursor-pointer text-lg font-bold">&times;</button>
            </div>

            <form onSubmit={handleProductSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {productFormError && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{productFormError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sterling Silver Necklace"
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your jewelry item details..."
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Price ($USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Sale Price ($USD) (Optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    value={productForm.salePrice}
                    onChange={(e) => setProductForm({ ...productForm, salePrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Available Stock *</label>
                  <input
                    type="number"
                    required
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Category *</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as Product['category'] })}
                  >
                    <option value="Bracelets">Bracelets</option>
                    <option value="Rings">Rings</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Necklaces">Necklaces</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Main Image URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="/media/product/1.jpg"
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Gallery URLs (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="/media/product/1.jpg, /media/product/1-2.jpg"
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  className="rounded border-slate-800 bg-slate-950 text-emerald-400 focus:ring-emerald-500"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                />
                <label htmlFor="featured" className="text-xs font-semibold text-white uppercase tracking-wider cursor-pointer">
                  Feature on storefront homepage
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-emerald-100 font-bold px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-colors shadow-lg shadow-emerald-500/10 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CRUD BLOG MODAL PANEL --- */}
      {blogModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-white">{editingBlog ? 'Edit Blog Article' : 'Write New Blog Article'}</h3>
              <button onClick={() => setBlogModalOpen(false)} className="text-slate-100 hover:text-white transition-colors cursor-pointer text-lg font-bold">&times;</button>
            </div>

            <form onSubmit={handleBlogSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {blogFormError && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{blogFormError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tips on cleaning sterling silver"
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Summary / Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="A short summary of your article..."
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={blogForm.summary}
                  onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Article Content *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write the full body content here..."
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Tag Category *</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value as Blog['category'] })}
                  >
                    <option value="Tips">Tips</option>
                    <option value="Collections">Collections</option>
                    <option value="News">News</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Publish State *</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    value={blogForm.status}
                    onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value as Blog['status'] })}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Cover Image Asset URL *</label>
                <input
                  type="text"
                  required
                  placeholder="/media/blog/1.jpg"
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-emerald-100 font-bold px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-colors shadow-lg shadow-emerald-500/10 cursor-pointer"
                >
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EMAIL REPLY MODAL --- */}
      {replyModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-4 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-white">Reply to Inquiry</h3>
              <button onClick={() => setReplyModalOpen(false)} className="text-slate-100 hover:text-white transition-colors cursor-pointer text-lg font-bold">&times;</button>
            </div>

            <form onSubmit={handleSendReplySubmit} className="p-6 space-y-4">
              <div>
                <p className="text-xs text-slate-100"><strong>Recipient:</strong> {selectedContact.name} ({selectedContact.email})</p>
                <p className="text-xs text-slate-100 mt-1"><strong>Inquiry Title:</strong> {selectedContact.subject}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5">Reply Content</label>
                <textarea
                  required
                  rows={8}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReplyModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-emerald-100 font-bold px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replySending}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-colors shadow-lg shadow-emerald-500/10 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {replySending ? 'Sending Message...' : 'Send Reply Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
