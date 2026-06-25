import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import BlogDetailsFullwidth from './Pages/BlogDetailsFullwidth';
import BlogDetailsLeft from './Pages/BlogDetailsLeft';
import BlogDetailsRight from './Pages/BlogDetailsRight';
import BlogGridFullwidth from './Pages/BlogGridFullwidth';
import BlogGridLeft from './Pages/BlogGridLeft';
import BlogGridRight from './Pages/BlogGridRight';
import BlogListLeft from './Pages/BlogListLeft';
import BlogListRight from './Pages/BlogListRight';
import Home from './Pages/Home';
import Home2 from './Pages/Home2';
import Home3 from './Pages/Home3';
import Home4 from './Pages/Home4';
import Home5 from './Pages/Home5';
import Home6 from './Pages/Home6';
import Home7 from './Pages/Home7';
import Home8 from './Pages/Home8';
import Page404 from './Pages/Page404';
import PageAbout from './Pages/PageAbout';
import PageContact from './Pages/PageContact';
import PageFAQ from './Pages/PageFAQ';
import PageForgotPassword from './Pages/PageForgotPassword';
import PageLogin from './Pages/PageLogin';
import PageMyAccount from './Pages/PageMyAccount';
import ShopCart from './Pages/ShopCart';
import ShopCheckout from './Pages/ShopCheckout';
import ShopDetails from './Pages/ShopDetails';
import ShopGridFullwidth from './Pages/ShopGridFullwidth';
import ShopGridLeft from './Pages/ShopGridLeft';
import ShopGridRight from './Pages/ShopGridRight';
import ShopListLeft from './Pages/ShopListLeft';
import ShopListRight from './Pages/ShopListRight';
import ShopWishlist from './Pages/ShopWishlist';
import AdminDashboard from './Pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog-details-fullwidth" element={<BlogDetailsFullwidth />} />
      <Route path="/blog-details-left" element={<BlogDetailsLeft />} />
      <Route path="/blog-details-right" element={<BlogDetailsRight />} />
      <Route path="/blog-grid-fullwidth" element={<BlogGridFullwidth />} />
      <Route path="/blog-grid-left" element={<BlogGridLeft />} />
      <Route path="/blog-grid-right" element={<BlogGridRight />} />
      <Route path="/blog-list-left" element={<BlogListLeft />} />
      <Route path="/blog-list-right" element={<BlogListRight />} />
      <Route path="/home2" element={<Home2 />} />
      <Route path="/home3" element={<Home3 />} />
      <Route path="/home4" element={<Home4 />} />
      <Route path="/home5" element={<Home5 />} />
      <Route path="/home6" element={<Home6 />} />
      <Route path="/home7" element={<Home7 />} />
      <Route path="/home8" element={<Home8 />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="/about" element={<PageAbout />} />
      <Route path="/contact" element={<PageContact />} />
      <Route path="/faq" element={<PageFAQ />} />
      <Route path="/forgot-password" element={<PageForgotPassword />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/my-account" element={<PageMyAccount />} />
      <Route path="/cart" element={<ShopCart />} />
      <Route path="/checkout" element={<ShopCheckout />} />
      <Route path="/shop-details" element={<ShopDetails />} />
      <Route path="/shop-grid-fullwidth" element={<ShopGridFullwidth />} />
      <Route path="/shop-grid-left" element={<ShopGridLeft />} />
      <Route path="/shop-grid-right" element={<ShopGridRight />} />
      <Route path="/shop-list-left" element={<ShopListLeft />} />
      <Route path="/shop-list-right" element={<ShopListRight />} />
      <Route path="/wishlist" element={<ShopWishlist />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
