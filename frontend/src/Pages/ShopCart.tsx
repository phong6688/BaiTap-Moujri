import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCartStore } from '../lib/store';

const ShopCart: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotals = useCartStore((state) => state.getTotals);

  const totals = getTotals();

  useEffect(() => {
    document.title = "Shopping Cart | Mojuri";
  }, []);

  const handleQtyChange = (productId: string, newQty: number) => {
    updateQuantity(productId, newQty);
  };

  const handleRemove = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    removeFromCart(productId);
  };

  const handleCheckoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate('/checkout');
  };

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
										Shopping Cart
									</h1>
								</div>
								<div className="breadcrumbs">
									<a href="/">Home</a><span className="delimiter"></span><a href="/shop-grid-left">Shop</a><span className="delimiter"></span>Shopping Cart
								</div>
							</div>
						</div>

						<div id="content" className="site-content" role="main">
							<div className="section-padding">
								<div className="section-container p-l-r">
									<div className="shop-cart">	
										{cartItems.length === 0 ? (
											<div className="text-center py-5">
												<h3 className="mb-3">Your shopping cart is empty</h3>
												<p className="text-slate-500 mb-4">You have no items in your shopping cart. Add some beautiful jewelry pieces first!</p>
												<a href="/shop-grid-left" className="button" style={{ display: 'inline-block', backgroundColor: '#e2a03f', color: '#000', fontWeight: 'bold', padding: '12px 30px', textDecoration: 'none' }}>Go to Shop</a>
											</div>
										) : (
											<div className="row">
												<div className="col-xl-8 col-lg-12 col-md-12 col-12">
													<form className="cart-form" onSubmit={(e) => e.preventDefault()}>
														<div className="table-responsive">
															<table className="cart-items table" cellSpacing="0">
																<thead>
																	<tr>
																		<th className="product-thumbnail">Product</th>
																		<th className="product-price">Price</th>
																		<th className="product-quantity">Quantity</th>
																		<th className="product-subtotal">Subtotal</th>
																		<th className="product-remove">&nbsp;</th>
																	</tr>
																</thead>
																<tbody>
																	{cartItems.map((item) => (
																		<tr key={item.productId} className="cart-item">		
																			<td className="product-thumbnail">
																				<a href={`/shop-details?id=${item.productId}`}>
																					<img 
																						width="600" 
																						height="600" 
																						src={item.image} 
																						className="product-image" 
																						alt={item.name} 
																						onError={(e) => {
																							(e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=120';
																						}}
																					/>
																				</a>				
																				<div className="product-name">
																					<a href={`/shop-details?id=${item.productId}`}>{item.name}</a>								
																				</div>
																			</td>
																			<td className="product-price">
																				<span className="price">${item.price.toFixed(2)}</span>
																			</td>
																			<td className="product-quantity">
																				<div className="quantity">
																					<button 
																						type="button" 
																						className="minus"
																						onClick={() => handleQtyChange(item.productId, item.quantity - 1)}
																					>
																						-
																					</button>	
																					<input 
																						type="number" 
																						className="qty" 
																						value={item.quantity}
																						onChange={(e) => handleQtyChange(item.productId, parseInt(e.target.value) || 0)}
																						title="Qty" 
																						size={4}
																						readOnly
																					/>
																					<button 
																						type="button" 
																						className="plus"
																						onClick={() => handleQtyChange(item.productId, item.quantity + 1)}
																					>
																						+
																					</button>
																				</div>
																			</td>
																			<td className="product-subtotal">
																				<span>${(item.price * item.quantity).toFixed(2)}</span>
																			</td>
																			<td className="product-remove">
																				<a 
																					href="#" 
																					className="remove"
																					onClick={(e) => handleRemove(item.productId, e)}
																				>
																					×
																				</a>								
																			</td>
																		</tr>
																	))}
																</tbody>
															</table>
														</div>
													</form>
												</div>

												{/* CART TOTALS BOX */}
												<div className="col-xl-4 col-lg-12 col-md-12 col-12">
													<div className="cart-totals">
														<h2>Cart totals</h2>
														<div className="table-responsive">
															<table className="table" cellSpacing="0">
																<tbody>
																	<tr className="cart-subtotal">
																		<th>Subtotal</th>
																		<td>
																			<span className="price">${totals.totalAmount.toFixed(2)}</span>
																		</td>
																	</tr>
																	<tr className="shipping-totals">
																		<th>Shipping</th>
																		<td>
																			<span className="price">Free Shipping</span>
																		</td>
																	</tr>
																	<tr className="order-total">
																		<th>Total</th>
																		<td>
																			<span className="price">${totals.totalAmount.toFixed(2)}</span>
																		</td>
																	</tr>
																</tbody>
															</table>
														</div>
														<div className="proceed-to-checkout">
															<a 
																href="#" 
																className="checkout-button button"
																onClick={handleCheckoutClick}
																style={{ backgroundColor: '#e2a03f', color: '#000', fontWeight: 'bold' }}
															>
																Proceed to checkout
															</a>
														</div>
													</div>
												</div>
											</div>
										)}
									</div>
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

export default ShopCart;
