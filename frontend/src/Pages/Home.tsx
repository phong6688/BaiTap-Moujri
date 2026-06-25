import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api, resolveImagePath } from '../lib/api';
import type { Product, Blog } from '../lib/api';
import { useCartStore } from '../lib/store';

const Home: React.FC = () => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image
    });
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  // Slideshow state
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const slides = [
    {
      title: "Discover a \nworld of jewelry",
      buttonText: "Explore Bestseller",
      image: "/media/slider/1-1.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1200"
    },
    {
      title: "Discover the\n Best of the Best",
      buttonText: "Explore Bestseller",
      image: "/media/slider/1-2.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200"
    },
    {
      title: "Oh,\n Hello Newness!",
      buttonText: "Explore Bestseller",
      image: "/media/slider/1-3.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200"
    }
  ];

  // Auto-scroll slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // TanStack Queries for products and blogs
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => api.products.list()
  });

  const { data: blogs = [], isLoading: blogsLoading } = useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: () => api.blogs.list(),
    select: (list) => list.filter(b => b.status === 'published').slice(0, 3)
  });

  const loading = productsLoading || blogsLoading;

  useEffect(() => {
    document.title = "Mojuri – Premium Jewelry Store";
    document.body.className = "home home-1 title-1";

    return () => {
      document.body.className = "";
    };
  }, []);

  const trendingProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <>
      <div id="page" className="hfeed page-wrapper">
        <Header className="site-header header-v1 color-white" />

        <div id="site-main" className="site-main">
          <div id="main-content" className="main-content">
            <div id="primary" className="content-area">
              <div id="content" className="site-content" role="main">
                
                {/* 1. HERO SLIDERS SECTION (Pure React implementation matching the template) */}
                <section className="section m-b-70">
                  <div className="block block-sliders auto-height color-white nav-center">
                    <div className="slider-container-react" style={{ position: 'relative', height: '600px', overflow: 'hidden' }}>
                      <div className="slick-list" style={{ height: '100%' }}>
                        <div className="slick-track" style={{ height: '100%' }}>
                          {slides.map((slide, idx) => (
                            <div 
                              key={idx} 
                              className={`item slick-slide ${activeSlide === idx ? 'slick-active slick-current' : ''}`}
                              style={{
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: activeSlide === idx ? 1 : 0,
                                visibility: activeSlide === idx ? 'visible' : 'hidden',
                                transition: 'opacity 0.8s ease-in-out',
                                zIndex: activeSlide === idx ? 1 : 0
                              }}
                            >
                              <div className="item-content" style={{ position: 'relative', height: '100%' }}>
                                <div className="content-image" style={{ height: '100%' }}>
                                  <img 
                                    width="1920" 
                                    height="600" 
                                    src={resolveImagePath(slide.image)} 
                                    alt="Image Slider" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = slide.fallbackImage;
                                    }}
                                  />
                                </div>
                                <div className="item-info horizontal-start vertical-middle" style={{ position: 'absolute', top: '50%', left: '10%', transform: 'translateY(-50%)', zIndex: '2' }}>
                                  <div className="content">
                                    <h2 className="title-slider" style={{ fontSize: '48px', fontWeight: 'bold', color: '#fff', lineHeight: '1.2', whiteSpace: 'pre-line' }}>
                                      {slide.title}
                                    </h2>
                                    <a 
                                      className="button-slider button button-white button-outline thick-border" 
                                      href="/shop-grid-left" 
                                      style={{ marginTop: '20px', display: 'inline-block', padding: '10px 30px', border: '2px solid #fff', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}
                                    >
                                      {slide.buttonText}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Slider Navigation Dots */}
                      <div style={{ position: 'absolute', bottom: '30px', width: '100%', display: 'flex', justifyContent: 'center', gap: '10px', zIndex: 10 }}>
                        {slides.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveSlide(idx)}
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: activeSlide === idx ? '#fff' : 'rgba(255,255,255,0.4)',
                              border: 'none',
                              cursor: 'pointer',
                              padding: 0
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. THREE COLUMNS BANNERS SECTION */}
                <section className="section section-padding m-b-70">
                  <div className="section-container large">
                    <div className="block block-banners layout-1 banners-effect">
                      <div className="block-widget-wrap small-space">
                        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                          <div className="col-md-4 col-sm-12" style={{ flex: '1 1 300px' }}>
                            <div className="block-widget-banner">
                              <div className="bg-banner">
                                <div className="banner-wrapper banners" style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
                                  <div className="banner-image">
                                    <a href="/shop-grid-left">
                                      <img width="630" height="457" src="/media/banner/banner-1-1.jpg" alt="Banner Image" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                    </a>
                                  </div>
                                  <div className="banner-wrapper-infor" style={{ position: 'absolute', bottom: '30px', left: '30px', zIndex: 2 }}>
                                    <div className="info">
                                      <div className="content">
                                        <h3 className="title-banner" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>New Arrivals</h3>
                                        <a className="button" href="/shop-grid-left" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 'bold' }}>Shop Now</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-md-4 col-sm-12" style={{ flex: '1 1 300px' }}>
                            <div className="block-widget-banner">
                              <div className="bg-banner">
                                <div className="banner-wrapper banners" style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
                                  <div className="banner-image">
                                    <a href="/shop-grid-left">
                                      <img width="450" height="457" src="/media/banner/banner-1-2.jpg" alt="Banner Image" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                    </a>
                                  </div>
                                  <div className="banner-wrapper-infor text-center" style={{ position: 'absolute', bottom: '30px', width: '100%', textAlign: 'center', zIndex: 2 }}>
                                    <div className="info">
                                      <div className="content">
                                        <h3 className="title-banner" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Best Seller</h3>
                                        <a className="button center" href="/shop-grid-left" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 'bold' }}>Shop Now</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4 col-sm-12" style={{ flex: '1 1 300px' }}>
                            <div className="block-widget-banner">
                              <div className="bg-banner">
                                <div className="banner-wrapper banners" style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
                                  <div className="banner-image">
                                    <a href="/shop-grid-left">
                                      <img width="630" height="457" src="/media/banner/banner-1-3.jpg" alt="Banner Image" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                    </a>
                                  </div>
                                  <div className="banner-wrapper-infor" style={{ position: 'absolute', bottom: '30px', left: '30px', zIndex: 2 }}>
                                    <div className="info">
                                      <div className="content">
                                        <h3 className="title-banner" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Clearance Sale</h3>
                                        <a className="button" href="/shop-grid-left" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 'bold' }}>Shop Now</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. TOP CATEGORIES SECTION */}
                <section className="section section-padding m-b-70">
                  <div className="section-container">
                    <div className="block block-product-cats slider round-border">
                      <div className="block-widget-wrap">
                        <div className="block-title" style={{ textAlign: 'center', marginBottom: '30px' }}>
                          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111' }}>Top Categories</h2>
                        </div>
                        <div className="block-content">
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', justifyContent: 'center' }}>
                            {[
                              { name: 'Bracelets', image: '/media/product/cat-1.jpg' },
                              { name: 'Charms', image: '/media/product/cat-2.jpg' },
                              { name: 'Earrings', image: '/media/product/cat-3.jpg' },
                              { name: 'Necklaces', image: '/media/product/cat-4.jpg' },
                              { name: 'Rings', image: '/media/product/cat-5.jpg' }
                            ].map((cat, idx) => (
                              <div key={idx} className="item item-product-cat" style={{ textAlign: 'center' }}>
                                <div className="item-product-cat-content">
                                  <a href="/shop-grid-left">
                                    <div className="item-image animation-horizontal" style={{ borderRadius: '50%', overflow: 'hidden', border: '1px solid #eee', width: '160px', height: '160px', margin: '0 auto 15px', transition: 'all 0.3s' }}>
                                      <img width="258" height="258" src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                  </a>
                                  <div className="product-cat-content-info">
                                    <h2 className="item-title" style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
                                      <a href="/shop-grid-left" style={{ color: '#222', textDecoration: 'none' }}>{cat.name}</a>
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 4. ETHICALLY SOURCED INTRO SECTION */}
                <section className="section background-img bg-img-1 m-b-70" style={{ background: '#fcf8f4', padding: '60px 0' }}>
                  <div className="block block-intro section-container">
                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                      <div className="col-md-6 col-sm-12" style={{ padding: '30px' }}>
                        <div className="intro-wrap">
                          <h2 className="intro-title" style={{ fontSize: '36px', fontWeight: 'bold', color: '#111', marginBottom: '30px', lineHeight: '1.2' }}>Handcrafted<br /> & Ethically Sourced</h2>
                          
                          <div className="intro-item" style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
                            <div className="content">
                              <h3 className="title" style={{ fontSize: '18px', fontWeight: 'bold', color: '#e2a03f', marginBottom: '5px' }}>FAIR PRICING</h3>
                              <div className="text" style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>We deal directly with producers to guarantee fair wages and eliminate middleman markups, ensuring our jewelry remains affordable and premium.</div>
                            </div>
                          </div>

                          <div className="intro-item" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                            <div className="content">
                              <h3 className="title" style={{ fontSize: '18px', fontWeight: 'bold', color: '#e2a03f', marginBottom: '5px' }}>HIGH QUALITY</h3>
                              <div className="text" style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>We handpick precious stones and metals to fulfill Mojuri's rigorous standards, crafting statement accessories designed to shine forever.</div>
                            </div>
                          </div>

                          <div className="intro-btn">
                            <a href="/shop-grid-left" className="button button-black button-arrow" style={{ backgroundColor: '#111', color: '#fff', padding: '12px 30px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>LEARN MORE</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12" style={{ padding: '15px', textAlign: 'center' }}>
                        <a href="#">
                          <img className="hover-opacity" width="820" height="674" src="/media/banner/intro-1.jpg" alt="intro" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 5. TRENDING ITEMS SHOWCASE (With dual-image hover layout to prevent height collapse) */}
                <section className="section section-padding m-b-70">
                  <div className="section-container">
                    <div className="block block-products">
                      <div className="block-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111' }}>Trending Jewelry Collection</h2>
                        <p style={{ color: '#666' }}>Handpicked luxury items showing outstanding designer craft.</p>
                      </div>
                      <div className="block-content">
                        <div className="products-list grid">
                          <div className="row">
                            {loading ? (
                              <div className="col-12 text-center py-4">
                                <p>Loading collection items...</p>
                              </div>
                            ) : trendingProducts.length === 0 ? (
                              <div className="col-12 text-center py-4">
                                <p>No featured products found.</p>
                              </div>
                            ) : (
                              trendingProducts.map((product) => (
                                <div key={product.id} className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                  <div className="products-entry clearfix product-wapper">
                                    <div className="products-thumb">
                                      <div className="product-thumb-hover">
                                        <a href={`/shop-details?id=${product.id}`}>
                                          <img 
                                            width="600" 
                                            height="600" 
                                            src={resolveImagePath(product.image)} 
                                            className="post-image" 
                                            alt={product.name}
                                            onError={(e) => {
                                              const target = e.target as HTMLImageElement;
                                              target.onerror = null;
                                              target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600';
                                            }}
                                          />
                                          <img 
                                            width="600" 
                                            height="600" 
                                            src={resolveImagePath(product.gallery?.[1] || product.image)} 
                                            className="hover-image back" 
                                            alt={product.name} 
                                            onError={(e) => {
                                              const target = e.target as HTMLImageElement;
                                              target.onerror = null;
                                              target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600';
                                            }}
                                          />
                                        </a>
                                      </div>
                                      
                                      <div className="product-button">
                                        <div className="btn-add-to-cart" data-title="Add to cart">
                                          <a 
                                            href="#" 
                                            className="product-btn button"
                                            onClick={(e) => handleAddToCart(product, e)}
                                          >
                                            Add to cart
                                          </a>
                                        </div>
                                        <span className="product-quickview" data-title="Quick View">
                                          <a href={`/shop-details?id=${product.id}`} className="quickview quickview-button">
                                            Quick View <i className="icon-search"></i>
                                          </a>
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <div className="products-content">
                                      <div className="contents text-center">
                                        <h3 className="product-title">
                                          <a href={`/shop-details?id=${product.id}`}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <span className="price">
                                          {product.salePrice ? (
                                            <>
                                              <del aria-hidden="true"><span>${product.price.toFixed(2)}</span></del> 
                                              <ins><span>${product.salePrice.toFixed(2)}</span></ins>
                                            </>
                                          ) : (
                                            <span>${product.price.toFixed(2)}</span>
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 6. TWO COLUMNS BANNER SECTION (Summer Collections / Make It Memorable) */}
                <section className="section section-padding m-b-70">
                  <div className="section-container large">
                    <div className="block block-banners layout-2 banners-effect">
                      <div className="block-widget-wrap">
                        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                          <div className="col-md-6 col-sm-12" style={{ flex: '1 1 450px' }}>
                            <div className="block-widget-banner m-b-15">
                              <div className="bg-banner">
                                <div className="banner-wrapper banners" style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
                                  <div className="banner-image">
                                    <a href="/shop-grid-left">
                                      <img width="856" height="496" src="/media/banner/banner-1-4.jpg" alt="Banner Image" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                    </a>
                                  </div>
                                  <div className="banner-wrapper-infor" style={{ position: 'absolute', top: '50%', left: '40px', transform: 'translateY(-50%)', zIndex: 2 }}>
                                    <div className="info">
                                      <div className="content">
                                        <h3 className="title-banner" style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>Summer Collections</h3>
                                        <div className="banner-image-description" style={{ color: '#eee', fontSize: '13px', marginBottom: '15px' }}>
                                          Freshwater pearl necklace and earrings
                                        </div>
                                        <a className="button button-outline thick-border border-white button-arrow" href="/shop-grid-left" style={{ border: '2px solid #fff', color: '#fff', padding: '8px 20px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>Explore</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 col-sm-12" style={{ flex: '1 1 450px' }}>
                            <div className="block-widget-banner">
                              <div className="bg-banner">
                                <div className="banner-wrapper banners" style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
                                  <div className="banner-image">
                                    <a href="/shop-grid-left">
                                      <img width="856" height="496" src="/media/banner/banner-1-5.jpg" alt="Banner Image" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                    </a>
                                  </div>
                                  <div className="banner-wrapper-infor" style={{ position: 'absolute', top: '50%', left: '40px', transform: 'translateY(-50%)', zIndex: 2 }}>
                                    <div className="info">
                                      <div className="content">
                                        <h3 className="title-banner" style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>Make It Memorable</h3>
                                        <div className="banner-image-description" style={{ color: '#eee', fontSize: '13px', marginBottom: '15px' }}>
                                          Freshwater pearl necklace and earrings
                                        </div>
                                        <a className="button button-outline thick-border border-white button-arrow" href="/shop-grid-left" style={{ border: '2px solid #fff', color: '#fff', padding: '8px 20px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>Explore</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 7. CUSTOMERS TESTIMONIALS SECTION */}
                <section className="section section-padding background-img bg-img-2 m-b-70 p-t-140 p-b-70 m-t-n-130" style={{ background: '#f9f6f0', padding: '60px 0' }}>
                  <div className="section-container">
                    <div className="block block-testimonial layout-2">
                      <div className="block-widget-wrap">
                        <div className="block-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
                          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111' }}>What Our Customers Say</h2>
                        </div>
                        <div className="block-content">
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
                            {[
                              {
                                title: "“Amazing piece of history”",
                                excerpt: "Bought the Twist Band Ring for my wedding anniversary. The craftsmanship is breathtaking. Support was quick and package was delivered fast.",
                                rating: 5,
                                customer: "Sophia Bennett",
                                image: "/media/testimonial/1.jpg"
                              },
                              {
                                title: "“Fabulous Grounds”",
                                excerpt: "The Charm Club Bracelet is so delicate. It fits beautifully and matches all my summer collection items. I am highly satisfied with the quality.",
                                rating: 4,
                                customer: "Liam Miller",
                                image: "/media/testimonial/2.jpg"
                              },
                              {
                                title: "“Great designs and taste!”",
                                excerpt: "Bespoke design, lovely materials, and fair pricing. Mojuri makes it easy to purchase premium jewelry without middleman fees.",
                                rating: 5,
                                customer: "Sara Colinton",
                                image: "/media/testimonial/3.jpg"
                              }
                            ].map((test, idx) => (
                              <div key={idx} className="testimonial-content" style={{ background: '#fff', padding: '25px', borderRadius: '10px', border: '1px solid #eee' }}>
                                <div className="item">
                                  <div className="testimonial-item" style={{ marginBottom: '20px' }}>
                                    <div className="testimonial-icon" style={{ marginBottom: '10px' }}>
                                      <div className="rating">
                                        <span style={{ color: '#f59e0b', fontSize: '16px' }}>
                                          {'★'.repeat(test.rating)}{'☆'.repeat(5 - test.rating)}
                                        </span>
                                      </div>
                                    </div>
                                    <h2 className="testimonial-title" style={{ fontSize: '16px', fontWeight: 'bold', margin: '10px 0 5px', color: '#111' }}>{test.title}</h2>
                                    <div className="testimonial-excerpt" style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', height: '80px', overflow: 'hidden' }}>
                                      {test.excerpt}
                                    </div>
                                  </div>
                                  <div className="testimonial-image image-position-top" style={{ display: 'flex', alignItems: 'center', gap: '15px', borderTop: '1px solid #f0f0f0', paddingTop: '15px' }}>
                                    <div className="thumbnail" style={{ width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden' }}>
                                      <img width="110" height="110" src={test.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = '/media/user.jpg'; }} />
                                    </div>
                                    <div className="testimonial-info">
                                      <h2 className="testimonial-customer-name" style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, color: '#111' }}>{test.customer}</h2>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 8. LATEST NEWS / BLOG POSTS (Required for student homework Requirements) */}
                <section className="section section-padding m-b-70">
                  <div className="section-container">
                    <div className="block block-posts">
                      <div className="block-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111' }}>Latest Jewelry Guides</h2>
                        <p style={{ color: '#666' }}>Tips on matching accessories, caring for silver, and gemstone history.</p>
                      </div>
                      <div className="block-content">
                        <div className="row">
                          {loading ? (
                            <div className="col-12 text-center py-4">
                              <p>Loading blog posts...</p>
                            </div>
                          ) : blogs.length === 0 ? (
                            <div className="col-12 text-center py-4">
                              <p>No guides published yet.</p>
                            </div>
                          ) : (
                            blogs.map((blog) => (
                              <div key={blog.id} className="col-md-4 col-sm-12">
                                <div className="post-entry clearfix" style={{ border: '1px solid #f2f2f2', borderRadius: '8px', padding: '15px', background: '#fff', marginBottom: '20px' }}>
                                  <div className="post-image" style={{ height: '200px', overflow: 'hidden', borderRadius: '6px', marginBottom: '15px' }}>
                                    <a href={`/blog-details-fullwidth?id=${blog.id}`}>
                                      <img 
                                        src={resolveImagePath(blog.image)} 
                                        alt={blog.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement;
                                          target.onerror = null;
                                          target.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600';
                                        }}
                                      />
                                    </a>
                                  </div>
                                  <div className="post-content">
                                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#e2a03f', background: '#fef3c7', padding: '3px 8px', borderRadius: '4px' }}>
                                      {blog.category}
                                    </span>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '10px 0' }}>
                                      <a href={`/blog-details-fullwidth?id=${blog.id}`} style={{ color: '#111', textDecoration: 'none' }}>
                                        {blog.title}
                                      </a>
                                    </h3>
                                    <p style={{ fontSize: '13px', color: '#666', lineClamp: '2', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                      {blog.summary}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 9. NEWSLETTER SUBSCRIPTION SECTION */}
                <section className="section section-padding m-b-80" style={{ background: '#fcf8f4', padding: '50px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                  <div className="section-container">
                    <div className="block block-newsletter layout-2 one-col" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                      <div className="block-widget-wrap">
                        <div className="newsletter-title-wrap" style={{ marginBottom: '25px' }}>
                          <h2 className="newsletter-title" style={{ fontSize: '28px', fontWeight: 'bold', color: '#111', marginBottom: '8px' }}>Latest From MoJuri!</h2>
                          <div className="newsletter-text" style={{ fontSize: '13px', color: '#666' }}>Sign-up to receive 10% off your next purchase. Plus hear about new arrivals and offers.</div>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} className="newsletter-form" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                          <input type="email" required name="your-email" placeholder="Email address" style={{ flexGrow: 1, padding: '12px 20px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }} />
                          <span className="btn-submit">
                            <input type="submit" value="SUBSCRIBE" style={{ backgroundColor: '#111', color: '#fff', padding: '12px 25px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }} />
                          </span>
                        </form>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 10. BRANDS SLIDER SECTION */}
                <section className="section section-padding p-t-10 p-b-10 m-b-0" style={{ padding: '30px 0' }}>
                  <div className="section-container">
                    <div className="block block-image slider">
                      <div className="block-widget-wrap">
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', alignItems: 'center' }}>
                          {['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'].map((brand, idx) => (
                            <div key={idx} className="item" style={{ opacity: 0.6, transition: 'opacity 0.3s' }}>
                              <div className="item-image animation-horizontal">
                                <a href="#"> 
                                  <img width="120" height="50" src={`/media/brand/${brand}`} alt={`Brand ${idx + 1}`} style={{ objectFit: 'contain' }} />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>

        <Footer className="site-footer background four-columns" />
      </div>
    </>
  );
};

export default Home;
