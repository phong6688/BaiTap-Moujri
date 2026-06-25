import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api } from '../lib/api';
import { useAuthStore, useCartStore } from '../lib/store';

const ShopCheckout: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotals = useCartStore((state) => state.getTotals);
  const user = useAuthStore((state) => state.user);
  
  const isLoggedIn = !!user;
  const totals = getTotals();

  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bacs' | 'cod'>('cod');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    document.title = "Checkout | Mojuri";
  }, []);

  // TanStack Query Mutation for order creation
  const createOrderMutation = useMutation<any, Error, any>({
    mutationFn: (orderPayload) => api.orders.create(orderPayload),
    onSuccess: (res) => {
      setCreatedOrder(res.order);
      clearCart();
      setOrderConfirmed(true);
    },
    onError: (err: any) => {
      setSubmitError(err.message || "Failed to create order. Please check item stock levels.");
    }
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!isLoggedIn) {
      setSubmitError("You must log in to place an order.");
      return;
    }

    if (cartItems.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    if (!firstName || !lastName || !address || !city || !postcode || !phone) {
      setSubmitError("Please fill in all required (*) fields.");
      return;
    }

    const orderPayload = {
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      totalAmount: totals.totalAmount,
      shippingAddress: `${firstName} ${lastName}, ${address}, ${city}, Postcode: ${postcode}, Phone: ${phone}`,
      paymentMethod: paymentMethod === 'bacs' ? 'Direct Bank Transfer' : 'Cash on Delivery'
    };

    createOrderMutation.mutate(orderPayload);
  };

  const submitting = createOrderMutation.isPending;

  if (orderConfirmed) {
    return (
      <div id="page" className="hfeed page-wrapper">
        <Header className="site-header header-v1" />
        <div id="site-main" className="site-main">
          <div className="section-padding py-5">
            <div className="container text-center py-5">
              <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', background: '#f8f9fa', borderRadius: '15px', border: '1px solid #e9ecef' }}>
                <div style={{ fontSize: '60px', color: '#10b981', marginBottom: '20px' }}>✓</div>
                <h2 className="mb-3" style={{ fontWeight: 'bold' }}>Thank You for Your Order!</h2>
                <p className="text-muted mb-4">Your order has been logged successfully and is being processed.</p>
                
                {createdOrder && (
                  <div className="text-left p-4 mb-4" style={{ background: '#fff', borderRadius: '8px', border: '1px solid #dee2e6', textAlign: 'left' }}>
                    <p><strong>Order Reference:</strong> <span style={{ fontFamily: 'monospace' }}>{createdOrder.id}</span></p>
                    <p><strong>Total Amount:</strong> ${createdOrder.totalAmount.toFixed(2)}</p>
                    <p><strong>Status:</strong> <span style={{ textTransform: 'capitalize', fontWeight: 'bold', color: '#e2a03f' }}>{createdOrder.status}</span></p>
                    <p><strong>Shipping To:</strong> {createdOrder.shippingAddress}</p>
                    <p><strong>Payment Method:</strong> {createdOrder.paymentMethod}</p>
                  </div>
                )}

                <a href="/shop-grid-left" className="button" style={{ backgroundColor: '#e2a03f', color: '#000', fontWeight: 'bold', padding: '12px 35px', textDecoration: 'none', borderRadius: '5px', display: 'inline-block' }}>Continue Shopping</a>
              </div>
            </div>
          </div>
        </div>
        <Footer className="site-footer background four-columns" />
      </div>
    );
  }

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
										Checkout
									</h1>
								</div>
								<div className="breadcrumbs">
									<a href="/">Home</a><span className="delimiter"></span><a href="/shop-grid-left">Shop</a><span className="delimiter"></span>Checkout
								</div>
							</div>
						</div>

						<div id="content" className="site-content" role="main">
							<div className="section-padding">
								<div className="section-container p-l-r">
									<div className="shop-checkout">
										{cartItems.length === 0 ? (
											<div className="text-center py-5" style={{ background: '#f8f9fa', padding: '50px 20px', borderRadius: '15px', border: '1px solid #e9ecef', maxWidth: '600px', margin: '40px auto' }}>
												<div style={{ fontSize: '60px', color: '#e2a03f', marginBottom: '20px' }}>🛒</div>
												<h3 className="mb-3" style={{ fontWeight: 'bold' }}>Your shopping cart is empty</h3>
												<p className="text-muted mb-4">You cannot checkout without items. Add some beautiful jewelry pieces to your cart first!</p>
												<a href="/shop-grid-left" className="button" style={{ display: 'inline-block', backgroundColor: '#e2a03f', color: '#000', fontWeight: 'bold', padding: '12px 35px', textDecoration: 'none', borderRadius: '5px' }}>Go to Shop</a>
											</div>
										) : (
											<>
												{!isLoggedIn ? (
													<div className="text-center py-4 mb-5" style={{ background: '#fff3cd', border: '1px solid #ffeeba', padding: '20px', borderRadius: '10px' }}>
														<h4 style={{ color: '#856404', fontWeight: 'bold', marginBottom: '10px' }}>Authentication Required</h4>
														<p style={{ color: '#856404', marginBottom: '15px' }}>You must log in to submit your purchase. This associates your order history with your account.</p>
														<a href="/login?redirect=/checkout" className="button" style={{ backgroundColor: '#856404', color: '#fff', fontWeight: 'bold', padding: '8px 25px', textDecoration: 'none', display: 'inline-block' }}>Log In / Register Now</a>
													</div>
												) : null}

												<form onSubmit={handlePlaceOrder} className="checkout" autoComplete="off">
													<div className="row">
														<div className="col-xl-8 col-lg-7 col-md-12 col-12">
															<div className="customer-details">
																<div className="billing-fields">
																	<h3>Shipping Details</h3>
																	
																	{submitError && (
																		<div style={{ color: '#ef4444', background: '#fee2e2', border: '1px solid #fca5a5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', fontSize: '14px' }}>
																			⚠️ {submitError}
																		</div>
																	)}

																	<div className="billing-fields-wrapper">
																		<p className="form-row form-row-first validate-required">
																			<label>First name <span className="required" title="required">*</span></label>
																			<span className="input-wrapper">
																				<input 
																					type="text" 
																					className="input-text" 
																					value={firstName}
																					onChange={(e) => setFirstName(e.target.value)}
																					disabled={!isLoggedIn}
																				/>
																			</span>
																		</p>
																		<p className="form-row form-row-last validate-required">
																			<label>Last name <span className="required" title="required">*</span></label>
																			<span className="input-wrapper">
																				<input 
																					type="text" 
																					className="input-text" 
																					value={lastName}
																					onChange={(e) => setLastName(e.target.value)}
																					disabled={!isLoggedIn}
																				/>
																			</span>
																		</p>

																		<p className="form-row address-field validate-required form-row-wide">
																			<label>Street address <span className="required" title="required">*</span></label>
																			<span className="input-wrapper">
																				<input 
																					type="text" 
																					className="input-text" 
																					placeholder="House number and street name" 
																					value={address}
																					onChange={(e) => setAddress(e.target.value)}
																					disabled={!isLoggedIn}
																				/>
																			</span>
																		</p>

																		<p className="form-row address-field validate-required form-row-wide">
																			<label>Town / City <span className="required" title="required">*</span></label>
																			<span className="input-wrapper">
																				<input 
																					type="text" 
																					className="input-text" 
																					value={city}
																					onChange={(e) => setCity(e.target.value)}
																					disabled={!isLoggedIn}
																				/>
																			</span>
																		</p>

																		<p className="form-row address-field validate-required validate-postcode form-row-wide">
																			<label>Postcode / ZIP <span className="required" title="required">*</span></label>
																			<span className="input-wrapper">
																				<input 
																					type="text" 
																					className="input-text" 
																					value={postcode}
																					onChange={(e) => setPostcode(e.target.value)}
																					disabled={!isLoggedIn}
																				/>
																			</span>
																		</p>

																		<p className="form-row form-row-wide validate-required validate-phone">
																			<label>Phone <span className="required" title="required">*</span></label>
																			<span className="input-wrapper">
																				<input 
																					type="tel" 
																					className="input-text" 
																					value={phone}
																					onChange={(e) => setPhone(e.target.value)}
																					disabled={!isLoggedIn}
																				/>
																			</span>
																		</p>
																	</div>
																</div>
															</div>
														</div>

														{/* YOUR ORDER SUMMARY */}
														<div className="col-xl-4 col-lg-5 col-md-12 col-12">
															<div className="checkout-review-order">
																<h3 id="order_review_heading">Your order</h3>
																<div id="order_review" className="checkout-review-order-inner">
																	<table className="checkout-review-order-table table">
																		<thead>
																			<tr>
																				<th className="product-name">Product</th>
																				<th className="product-total">Subtotal</th>
																			</tr>
																		</thead>
																		<tbody>
																			{cartItems.map((item) => (
																				<tr key={item.productId} className="cart_item">
																					<td className="product-name">
																						{item.name}&nbsp;
																						<strong className="product-quantity">×&nbsp;{item.quantity}</strong>
																					</td>
																					<td className="product-total">
																						<span>${(item.price * item.quantity).toFixed(2)}</span>
																					</td>
																				</tr>
																			))}
																		</tbody>
																		<tfoot>
																			<tr className="cart-subtotal">
																				<th>Subtotal</th>
																				<td><span>${totals.totalAmount.toFixed(2)}</span></td>
																			</tr>
																			<tr className="order-total">
																				<th>Total</th>
																				<td><strong><span>${totals.totalAmount.toFixed(2)}</span></strong></td>
																			</tr>
																		</tfoot>
																	</table>

																	{/* PAYMENT METHODS */}
																	<div id="payment" className="checkout-payment">
																		<ul className="payment-methods methods">
																			<li className="payment-method">
																				<input 
																					type="radio" 
																					id="payment_method_cod" 
																					className="input-radio" 
																					name="payment_method" 
																					checked={paymentMethod === 'cod'}
																					onChange={() => setPaymentMethod('cod')}
																				/>
																				<label htmlFor="payment_method_cod" style={{ fontWeight: 'bold', marginLeft: '8px', cursor: 'pointer' }}>Cash on Delivery</label>
																				<div className="payment-box">
																					<p>Pay with cash upon delivery of your items.</p>
																				</div>
																			</li>
																			<li className="payment-method">
																				<input 
																					type="radio" 
																					id="payment_method_bacs" 
																					className="input-radio" 
																					name="payment_method" 
																					checked={paymentMethod === 'bacs'}
																					onChange={() => setPaymentMethod('bacs')}
																				/>
																				<label htmlFor="payment_method_bacs" style={{ fontWeight: 'bold', marginLeft: '8px', cursor: 'pointer' }}>Direct Bank Transfer</label>
																				<div className="payment-box">
																					<p>Make your payment directly into our bank account. Please use your Order ID as the payment reference.</p>
																				</div>
																			</li>
																		</ul>
																		
																		<div className="place-order">
																			<button
																				type="submit"
																				className="button alt"
																				disabled={!isLoggedIn || submitting || cartItems.length === 0}
																				style={{ backgroundColor: '#e2a03f', color: '#000', fontWeight: 'bold', width: '100%', padding: '15px' }}
																			>
																				{submitting ? 'Processing Order...' : 'Place order'}
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</form>
											</>
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

export default ShopCheckout;
