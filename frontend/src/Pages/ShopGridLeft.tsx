import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api, resolveImagePath } from '../lib/api';
import type { Product } from '../lib/api';
import { useCartStore } from '../lib/store';

const ShopGridLeft: React.FC = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  
  // Filters and sorting
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // React Query data fetching
  const { data: products = [], isLoading: loading } = useQuery<Product[]>({
    queryKey: ['products', categoryFilter],
    queryFn: () => api.products.list(categoryFilter ? { category: categoryFilter } : undefined)
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Apply price filter and sorting on products list
  useEffect(() => {
    let result = [...products];

    // Filter by price
    if (priceFilter === 'under50') {
      result = result.filter((p) => (p.salePrice || p.price) < 50);
    } else if (priceFilter === '50to100') {
      result = result.filter((p) => {
        const cost = p.salePrice || p.price;
        return cost >= 50 && cost <= 100;
      });
    } else if (priceFilter === 'over100') {
      result = result.filter((p) => (p.salePrice || p.price) > 100);
    }

    // Sort products
    if (sortOption === 'priceAsc') {
      result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortOption === 'priceDesc') {
      result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sortOption === 'nameAsc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [products, priceFilter, sortOption]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div id="page" className="hfeed page-wrapper">
        <Header className="site-header header-v1" />

        <div id="site-main" className="site-main">
          <div id="main-content" className="main-content">
            <div id="primary" className="content-area">
              <div id="title" className="page-title">
                <div className="section-container">
                  <div className="content-title-heading">
                    <h1 className="text-title-heading">
                      {categoryFilter || 'Shop Catalog'}
                    </h1>
                  </div>
                  <div className="breadcrumbs">
                    <a href="/">Home</a><span className="delimiter"></span><a href="/shop-grid-left">Shop</a>
                    {categoryFilter && (
                      <>
                        <span className="delimiter"></span>
                        {categoryFilter}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div id="content" className="site-content" role="main">
                <div className="section-padding">
                  <div className="section-container p-l-r">
                    <div className="row">
                      {/* LEFT SIDEBAR: CATEGORIES & PRICE FILTERS */}
                      <div className="col-xl-3 col-lg-3 col-md-12 col-12 sidebar left-sidebar md-b-50 p-t-10">
                        {/* Categories Widget */}
                        <div className="block block-product-cats" style={{ marginBottom: '30px' }}>
                          <div className="block-title"><h2>Categories</h2></div>
                          <div className="block-content">
                            <div className="product-cats-list">
                              <ul>
                                <li className={categoryFilter === '' ? 'current' : ''}>
                                  <a href="#" onClick={(e) => { e.preventDefault(); setCategoryFilter(''); }}>All Products</a>
                                </li>
                                <li className={categoryFilter === 'Bracelets' ? 'current' : ''}>
                                  <a href="#" onClick={(e) => { e.preventDefault(); setCategoryFilter('Bracelets'); }}>Bracelets</a>
                                </li>
                                <li className={categoryFilter === 'Earrings' ? 'current' : ''}>
                                  <a href="#" onClick={(e) => { e.preventDefault(); setCategoryFilter('Earrings'); }}>Earrings</a>
                                </li>
                                <li className={categoryFilter === 'Necklaces' ? 'current' : ''}>
                                  <a href="#" onClick={(e) => { e.preventDefault(); setCategoryFilter('Necklaces'); }}>Necklaces</a>
                                </li>
                                <li className={categoryFilter === 'Rings' ? 'current' : ''}>
                                  <a href="#" onClick={(e) => { e.preventDefault(); setCategoryFilter('Rings'); }}>Rings</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Price Range Widget */}
                        <div className="block block-product-cats">
                          <div className="block-title"><h2>Filter By Price</h2></div>
                          <div className="block-content">
                            <div className="product-cats-list">
                              <ul>
                                <li className={priceFilter === 'all' ? 'current' : ''}>
                                  <a href="#" onClick={(e) => { e.preventDefault(); setPriceFilter('all'); }}>All Prices</a>
                                </li>
                                <li className={priceFilter === 'under50' ? 'current' : ''}>
                                  <a href="#" onClick={(e) => { e.preventDefault(); setPriceFilter('under50'); }}>Under $50</a>
                                </li>
                                <li className={priceFilter === '50to100' ? 'current' : ''}>
                                  <a href="#" onClick={(e) => { e.preventDefault(); setPriceFilter('50to100'); }}>$50 - $100</a>
                                </li>
                                <li className={priceFilter === 'over100' ? 'current' : ''}>
                                  <a href="#" onClick={(e) => { e.preventDefault(); setPriceFilter('over100'); }}>Over $100</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* MAIN CATALOG DISPLAY */}
                      <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                        {/* Control Bar: Sorting and Grid/List switcher */}
                        <div className="products-topbar clearfix" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                          <div className="products-topbar-left">
                            <div className="products-count">
                              {loading ? 'Fetching catalog...' : `Showing ${displayedProducts.length} of ${filteredProducts.length} results`}
                            </div>
                          </div>
                          
                          <div className="products-topbar-right" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            {/* Grid/List layout switcher */}
                            <div className="layout-switcher" style={{ display: 'flex', gap: '8px' }}>
                              <button 
                                className={`btn ${viewMode === 'grid' ? 'bg-amber-500 text-black' : 'bg-gray-200 text-gray-700'}`} 
                                style={{ padding: '4px 10px', fontSize: '12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                onClick={() => setViewMode('grid')}
                              >
                                Grid
                              </button>
                              <button 
                                className={`btn ${viewMode === 'list' ? 'bg-amber-500 text-black' : 'bg-gray-200 text-gray-700'}`} 
                                style={{ padding: '4px 10px', fontSize: '12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                onClick={() => setViewMode('list')}
                              >
                                List
                              </button>
                            </div>

                            {/* Sort Selector */}
                            <div className="sort-selector" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '13px', color: '#666' }}>Sort by:</span>
                              <select 
                                value={sortOption} 
                                onChange={(e) => setSortOption(e.target.value)}
                                style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff', fontSize: '13px' }}
                              >
                                <option value="default">Default</option>
                                <option value="priceAsc">Price: Low to High</option>
                                <option value="priceDesc">Price: High to Low</option>
                                <option value="nameAsc">Product Name (A-Z)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Product Grid/List Output */}
                        <div className="tab-content">
                          <div className="tab-pane fade show active" id="layout-grid" role="tabpanel">
                            {loading ? (
                              <div className="text-center py-5">
                                <p className="text-slate-500 font-medium">Loading products from server...</p>
                              </div>
                            ) : displayedProducts.length === 0 ? (
                              <div className="text-center py-5">
                                <p className="text-slate-500">No products found matching filters.</p>
                              </div>
                            ) : viewMode === 'grid' ? (
                              /* Grid View Mode */
                              <div className="products-list grid">
                                <div className="row">
                                  {displayedProducts.map((product) => (
                                    <div key={product.id} className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
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
                                                rel="nofollow" 
                                                href="#" 
                                                className="product-btn button"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  addToCart({
                                                    productId: product.id,
                                                    name: product.name,
                                                    price: product.salePrice || product.price,
                                                    image: product.image
                                                  });
                                                  alert(`Added "${product.name}" to cart!`);
                                                }}
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
                                              <a href={`/shop-details?id=${product.id}`}>{product.name}</a>
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
                                  ))}
                                </div>
                              </div>
                            ) : (
                              /* List View Mode */
                              <div className="products-list list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {displayedProducts.map((product) => (
                                  <div key={product.id} className="row border" style={{ borderRadius: '8px', overflow: 'hidden', padding: '15px', background: '#fff', alignItems: 'center' }}>
                                    <div className="col-md-3 col-sm-4 col-12">
                                      <a href={`/shop-details?id=${product.id}`} style={{ display: 'block', height: '150px', background: '#fbfbfb' }}>
                                        <img 
                                          src={resolveImagePath(product.image)} 
                                          alt={product.name} 
                                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                          onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300';
                                          }}
                                        />
                                      </a>
                                    </div>
                                    <div className="col-md-9 col-sm-8 col-12">
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#888', fontWeight: 'bold' }}>
                                          {product.category}
                                        </span>
                                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                                          <a href={`/shop-details?id=${product.id}`} style={{ color: '#111', textDecoration: 'none' }}>{product.name}</a>
                                        </h3>
                                        <div style={{ color: '#f59e0b', fontSize: '13px' }}>★★★★★</div>
                                        <p style={{ fontSize: '13px', color: '#666', margin: '5px 0' }}>{product.description}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#e2a03f' }}>
                                            {product.salePrice ? (
                                              <>
                                                <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px', marginRight: '8px' }}>${product.price.toFixed(2)}</span>
                                                <span>${product.salePrice.toFixed(2)}</span>
                                              </>
                                            ) : (
                                              <span>${product.price.toFixed(2)}</span>
                                            )}
                                          </span>
                                          <button
                                            type="button"
                                            className="button font-bold text-xs"
                                            style={{ backgroundColor: '#e2a03f', color: '#000', border: 'none', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase' }}
                                            onClick={() => {
                                              addToCart({
                                                productId: product.id,
                                                name: product.name,
                                                price: product.salePrice || product.price,
                                                image: product.image
                                              });
                                              alert(`Added "${product.name}" to cart!`);
                                            }}
                                          >
                                            Add to Cart
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                              <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                                <button
                                  type="button"
                                  disabled={currentPage === 1}
                                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                  style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '4px', background: currentPage === 1 ? '#eee' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '13px' }}
                                >
                                  Previous
                                </button>
                                
                                {Array.from({ length: totalPages }).map((_, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setCurrentPage(idx + 1)}
                                    style={{ 
                                      padding: '8px 15px', 
                                      border: '1px solid #ccc', 
                                      borderRadius: '4px', 
                                      background: currentPage === idx + 1 ? '#e2a03f' : '#fff', 
                                      color: currentPage === idx + 1 ? '#000' : '#111',
                                      fontWeight: currentPage === idx + 1 ? 'bold' : 'normal',
                                      cursor: 'pointer',
                                      fontSize: '13px' 
                                    }}
                                  >
                                    {idx + 1}
                                  </button>
                                ))}

                                <button
                                  type="button"
                                  disabled={currentPage === totalPages}
                                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                  style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '4px', background: currentPage === totalPages ? '#eee' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '13px' }}
                                >
                                  Next
                                </button>
                              </div>
                            )}
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

        <Footer className="site-footer background four-columns" />
      </div>

      <div className="back-top button-show">
        <i className="arrow_carrot-up"></i>
      </div>
    </>
  );
};

export default ShopGridLeft;
