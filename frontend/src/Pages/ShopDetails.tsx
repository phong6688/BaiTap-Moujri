import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api, resolveImagePath } from '../lib/api';
import type { Product } from '../lib/api';
import { useCartStore } from '../lib/store';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

const ShopDetails: React.FC = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  
  const searchParams = new URLSearchParams(window.location.search);
  const productId = searchParams.get('id') || '';

  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', author: 'Sophia Bennett', rating: 5, date: 'May 12, 2026', comment: 'Absolutely stunning! The silver finish is so bright and it matches everything.' },
    { id: '2', author: 'Liam Miller', rating: 4, date: 'Apr 28, 2026', comment: 'Beautiful piece, bought as a gift. Shipping was fast too. Highly recommend!' },
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  // TanStack Query for product details
  const { data: product, isLoading: loading, error } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => api.products.get(productId),
    enabled: !!productId
  });

  // TanStack Query for related products
  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ['relatedProducts', product?.category, productId],
    queryFn: () => api.products.list({ category: product?.category }),
    enabled: !!product?.category,
    select: (list) => list.filter((p) => p.id !== productId).slice(0, 4)
  });

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Mojuri`;
      setActiveImage(product.image);
    }
  }, [product]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product) return;

    if (product.stock < quantity) {
      alert(`Sorry, only ${product.stock} units are left in stock.`);
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image
    }, quantity);

    alert(`Added ${quantity} x "${product.name}" to cart!`);
  };

  const adjustQty = (amount: number) => {
    const nextQty = quantity + amount;
    if (nextQty >= 1) {
      setQuantity(nextQty);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      alert('Please fill in your name and comment.');
      return;
    }
    const newRev: Review = {
      id: Date.now().toString(),
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      comment: newReviewComment
    };
    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setNewReviewRating(5);
    alert('Thank you for your review!');
  };

  return (
    <>
      <div id="page" className="hfeed page-wrapper">
        <Header className="site-header header-v1" />

        <div id="site-main" className="site-main">
          <div id="main-content" className="main-content">
            <div id="primary" className="content-area">
              {product && (
                <div id="title" className="page-title">
                  <div className="section-container">
                    <div className="content-title-heading">
                      <h1 className="text-title-heading">
                        {product.name}
                      </h1>
                    </div>
                    <div className="breadcrumbs">
                      <a href="/">Home</a><span className="delimiter"></span><a href="/shop-grid-left">Shop</a><span className="delimiter"></span>{product.name}
                    </div>
                  </div>
                </div>
              )}

              <div id="content" className="site-content" role="main">
                <div className="section-padding">
                  <div className="section-container p-l-r">
                    {loading ? (
                      <div className="text-center py-5">
                        <p className="text-slate-500 font-medium">Loading product details...</p>
                      </div>
                    ) : error ? (
                      <div className="text-center py-5" style={{ color: '#ef4444' }}>
                        <h3>Error</h3>
                        <p>{error instanceof Error ? error.message : String(error)}</p>
                        <a href="/shop-grid-left" className="button" style={{ display: 'inline-block', backgroundColor: '#e2a03f', color: '#000', fontWeight: 'bold', padding: '10px 25px', marginTop: '15px' }}>Back to Shop</a>
                      </div>
                    ) : product ? (
                      <div>
                        {/* Upper Product Section */}
                        <div className="row">
                          {/* Gallery Columns */}
                          <div className="col-md-6 col-sm-12">
                            <div className="product-gallery" style={{ display: 'flex', gap: '15px' }}>
                              {/* Gallery Thumbnails */}
                              {product.gallery && product.gallery.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '80px' }}>
                                  {product.gallery.map((img, idx) => (
                                    <img 
                                      key={idx}
                                      src={resolveImagePath(img)} 
                                      alt="" 
                                      onClick={() => setActiveImage(img)}
                                      style={{ 
                                        width: '70px', 
                                        height: '70px', 
                                        objectFit: 'cover', 
                                        borderRadius: '4px', 
                                        cursor: 'pointer',
                                        border: (activeImage || product.image) === img ? '2px solid #e2a03f' : '1px solid #ccc'
                                      }}
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=120';
                                      }}
                                    />
                                  ))}
                                </div>
                              )}
                              
                              {/* Main Photo */}
                              <div style={{ flexGrow: 1, height: '500px', overflow: 'hidden', borderRadius: '10px', border: '1px solid #eee' }}>
                                <img 
                                  src={resolveImagePath(activeImage || product.image)} 
                                  alt={product.name} 
                                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600';
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Product specifications column */}
                          <div className="col-md-6 col-sm-12">
                            <div className="product-summary-details" style={{ paddingLeft: '20px' }}>
                              <h1 className="title" style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px', color: '#111' }}>
                                {product.name}
                              </h1>
                              
                              <div style={{ marginBottom: '20px' }}>
                                <span className="price" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                  {product.salePrice ? (
                                    <>
                                      <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '18px', marginRight: '10px' }}>${product.price.toFixed(2)}</span>
                                      <span style={{ color: '#e2a03f' }}>${product.salePrice.toFixed(2)}</span>
                                    </>
                                  ) : (
                                    <span style={{ color: '#111' }}>${product.price.toFixed(2)}</span>
                                  )}
                                </span>
                              </div>

                              <div className="rating" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                <span style={{ color: '#f59e0b', fontSize: '18px' }}>
                                  {'★'.repeat(5)}
                                </span>
                                <span style={{ fontSize: '13px', color: '#666' }}>({reviews.length} customer reviews)</span>
                              </div>

                              <div className="description" style={{ color: '#555', lineHeight: '1.6', fontSize: '15px', marginBottom: '25px' }}>
                                <p>{product.description}</p>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                                <div>
                                  <strong>Category:</strong> <span style={{ textTransform: 'capitalize', marginLeft: '5px' }}>{product.category}</span>
                                </div>
                                <div>
                                  <strong>Availability:</strong> 
                                  <span style={{ 
                                    marginLeft: '5px', 
                                    fontWeight: 'bold', 
                                    color: product.stock > 0 ? '#10b981' : '#ef4444' 
                                  }}>
                                    {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                                  </span>
                                </div>
                              </div>

                              {product.stock > 0 ? (
                                <div className="buttons" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                  <div className="quantity" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', height: '45px', overflow: 'hidden' }}>
                                    <button 
                                      type="button" 
                                      onClick={() => adjustQty(-1)}
                                      style={{ background: '#fff', border: 'none', width: '35px', height: '100%', fontSize: '16px', cursor: 'pointer' }}
                                    >
                                      -
                                    </button>
                                    <input 
                                      type="number" 
                                      readOnly 
                                      value={quantity} 
                                      style={{ width: '45px', textAlign: 'center', border: 'none', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', height: '100%', outline: 'none' }}
                                    />
                                    <button 
                                      type="button" 
                                      onClick={() => adjustQty(1)}
                                      style={{ background: '#fff', border: 'none', width: '35px', height: '100%', fontSize: '16px', cursor: 'pointer' }}
                                    >
                                      +
                                    </button>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    style={{ 
                                      backgroundColor: '#e2a03f', 
                                      color: '#000', 
                                      fontWeight: 'bold', 
                                      border: 'none', 
                                      height: '45px', 
                                      padding: '0 30px', 
                                      borderRadius: '4px', 
                                      cursor: 'pointer',
                                      textTransform: 'uppercase',
                                      letterSpacing: '1px'
                                    }}
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              ) : (
                                <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '16px' }}>
                                  🚫 This product is temporarily unavailable.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Middle Tabs Section: Description & Reviews */}
                        <div className="product-tabs" style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
                          <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
                            <button
                              type="button"
                              onClick={() => setActiveTab('description')}
                              style={{
                                padding: '10px 20px',
                                background: 'none',
                                border: 'none',
                                fontWeight: 'bold',
                                color: activeTab === 'description' ? '#e2a03f' : '#666',
                                borderBottom: activeTab === 'description' ? '2px solid #e2a03f' : '2px solid transparent',
                                cursor: 'pointer'
                              }}
                            >
                              Description
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveTab('reviews')}
                              style={{
                                padding: '10px 20px',
                                background: 'none',
                                border: 'none',
                                fontWeight: 'bold',
                                color: activeTab === 'reviews' ? '#e2a03f' : '#666',
                                borderBottom: activeTab === 'reviews' ? '2px solid #e2a03f' : '2px solid transparent',
                                cursor: 'pointer'
                              }}
                            >
                              Reviews ({reviews.length})
                            </button>
                          </div>

                          <div className="tab-content" style={{ minHeight: '150px' }}>
                            {activeTab === 'description' ? (
                              <div style={{ color: '#555', lineHeight: '1.7', fontSize: '15px' }}>
                                <p>{product.description}</p>
                                <p style={{ marginTop: '15px' }}>
                                  Designed specifically for elegance and modern comfort, our jewelry utilizes only premium materials and is individually hand-polished to match Mojuri's rigorous standards of craftsmanship.
                                </p>
                              </div>
                            ) : (
                              <div className="reviews-section">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                                  {reviews.map((rev) => (
                                    <div key={rev.id} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '15px' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                        <h5 style={{ margin: 0, fontWeight: 'bold', color: '#111' }}>{rev.author}</h5>
                                        <span style={{ fontSize: '12px', color: '#888' }}>{rev.date}</span>
                                      </div>
                                      <div style={{ color: '#f59e0b', fontSize: '14px', marginBottom: '8px' }}>
                                        {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                                      </div>
                                      <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>{rev.comment}</p>
                                    </div>
                                  ))}
                                </div>

                                <div className="add-review-form" style={{ background: '#fafafa', padding: '25px', borderRadius: '8px' }}>
                                  <h4 style={{ fontWeight: 'bold', marginBottom: '20px', color: '#111' }}>Write a Review</h4>
                                  <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                      <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>Name *</label>
                                        <input
                                          type="text"
                                          value={newReviewAuthor}
                                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                                          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                                          required
                                        />
                                      </div>
                                      <div style={{ width: '150px' }}>
                                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>Rating *</label>
                                        <select
                                          value={newReviewRating}
                                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                                          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}
                                        >
                                          <option value={5}>5 Stars</option>
                                          <option value={4}>4 Stars</option>
                                          <option value={3}>3 Stars</option>
                                          <option value={2}>2 Stars</option>
                                          <option value={1}>1 Star</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>Comment *</label>
                                      <textarea
                                        rows={4}
                                        value={newReviewComment}
                                        onChange={(e) => setNewReviewComment(e.target.value)}
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                                        required
                                      />
                                    </div>
                                    <button
                                      type="submit"
                                      style={{
                                        alignSelf: 'flex-start',
                                        backgroundColor: '#e2a03f',
                                        color: '#000',
                                        fontWeight: 'bold',
                                        border: 'none',
                                        padding: '10px 25px',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      Submit Review
                                    </button>
                                  </form>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Lower Related Products Section */}
                        {relatedProducts.length > 0 && (
                          <div className="related-products-section" style={{ marginTop: '60px', borderTop: '1px solid #eee', paddingTop: '40px' }}>
                            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center', color: '#111' }}>
                              Related Products
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
                              {relatedProducts.map((p) => (
                                <div key={p.id} className="related-product-card" style={{ border: '1px solid #f0f0f0', borderRadius: '8px', overflow: 'hidden', transition: 'all 0.3s' }}>
                                  <a href={`/shop-details?id=${p.id}`} style={{ display: 'block', height: '220px', overflow: 'hidden', background: '#fcfcfc' }}>
                                    <img 
                                      src={resolveImagePath(p.image)} 
                                      alt={p.name} 
                                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300';
                                      }}
                                    />
                                  </a>
                                  <div style={{ padding: '15px' }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 10px 0', height: '38px', overflow: 'hidden' }}>
                                      <a href={`/shop-details?id=${p.id}`} style={{ color: '#111', textDecoration: 'none' }}>{p.name}</a>
                                    </h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <span style={{ fontWeight: 'bold', color: '#e2a03f' }}>
                                        ${(p.salePrice || p.price).toFixed(2)}
                                      </span>
                                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#888', fontWeight: 'bold' }}>
                                        {p.category}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer className="site-footer background four-columns" />
      </div>
    </>
  );
};

export default ShopDetails;
