import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api } from '../lib/api';
import type { Order } from '../lib/api';
import { useAuthStore } from '../lib/store';

const PageMyAccount: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  
  // Lookup state
  const [lookupId, setLookupId] = useState<string>('');
  const [lookupResult, setLookupResult] = useState<Order | null>(null);
  const [lookupError, setLookupError] = useState<string>('');
  const [lookupLoading, setLookupLoading] = useState<boolean>(false);

  // TanStack Query for order listing
  const { data: orders = [], isLoading: loading } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: () => api.orders.list(),
    enabled: !!user
  });

  useEffect(() => {
    document.title = "My Account | Mojuri";
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    clearAuth();
    navigate('/login');
  };

  const handleOrderLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    setLookupResult(null);

    if (!lookupId.trim()) {
      setLookupError('Please enter a valid Order ID.');
      return;
    }

    setLookupLoading(true);
    try {
      const order = await api.orders.get(lookupId.trim());
      setLookupResult(order);
    } catch (err: any) {
      setLookupError(err.message || 'Order not found or access denied.');
    } finally {
      setLookupLoading(false);
    }
  };

  if (!user) {
    return (
      <div id="page" className="hfeed page-wrapper">
        <Header className="site-header header-v1" />
        <div id="site-main" className="site-main">
          <div className="section-padding py-5">
            <div className="container text-center py-5">
              <div style={{ maxWidth: '500px', margin: '0 auto', padding: '40px', background: '#fff3cd', borderRadius: '10px', border: '1px solid #ffeeba' }}>
                <h4 style={{ color: '#856404', fontWeight: 'bold', marginBottom: '10px' }}>Authentication Required</h4>
                <p style={{ color: '#856404', marginBottom: '20px' }}>Please log in to view your orders, addresses, and profile details.</p>
                <a href="/login" className="button" style={{ backgroundColor: '#856404', color: '#fff', fontWeight: 'bold', padding: '10px 25px', textDecoration: 'none', display: 'inline-block', borderRadius: '4px' }}>Log In / Register</a>
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
										My Account
									</h1>
								</div>
								<div className="breadcrumbs">
									<a href="/">Home</a><span className="delimiter"></span>My Account
								</div>
							</div>
						</div>

						<div id="content" className="site-content" role="main">
							<div className="section-padding">
								<div className="section-container p-l-r">
									<div className="page-my-account">
										<div className="my-account-wrap clearfix">
											<nav className="my-account-navigation">
												<ul className="nav nav-tabs">
													<li className="nav-item">
														<a className="nav-link active" data-toggle="tab" href="#dashboard" role="tab">Dashboard</a>
													</li>
													<li className="nav-item">
														<a className="nav-link" data-toggle="tab" href="#orders-tab" role="tab">Orders</a>
													</li>
													<li className="nav-item">
														<a className="nav-link" data-toggle="tab" href="#lookup-tab" role="tab">Order Lookup</a>
													</li>
													<li className="nav-item">
														<a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
													</li>
												</ul>
											</nav>
											
											<div className="my-account-content tab-content">
												{/* Tab 1: Dashboard */}
												<div className="tab-pane fade show active" id="dashboard" role="tabpanel">
													<div className="my-account-dashboard">
														<p>
															Hello <strong>{user.username}</strong> (not <strong>{user.username}</strong>? <a href="#" onClick={handleLogout}>Log out</a>)
														</p>
														<p>
															From your account dashboard you can view your recent orders, manage your shipping address, and review items in the store catalogue.
														</p>
													</div>
												</div>
												
												{/* Tab 2: Orders list */}
												<div className="tab-pane fade" id="orders-tab" role="tabpanel">
													<div className="my-account-orders">
														{loading ? (
															<p>Loading order history...</p>
														) : orders.length === 0 ? (
															<p>You have not placed any orders yet. <a href="/shop-grid-left">Browse our jewelry items!</a></p>
														) : (
															<div className="table-responsive">
																<table className="table">
																	<thead>
																		<tr>
																			<th>Order ID</th>
																			<th>Date</th>
																			<th>Status</th>
																			<th>Total</th>
																			<th>Items</th>
																		</tr>
																	</thead>
																	<tbody>
																		{orders.map((order) => (
																			<tr key={order.id}>
																				<td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{order.id}</td>
																				<td>{new Date(order.createdAt).toLocaleDateString()}</td>
																				<td style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{order.status}</td>
																				<td>${order.totalAmount.toFixed(2)}</td>
																				<td>
																					<div style={{ fontSize: '12px' }}>
																						{order.items.map((it, idx) => (
																							<div key={idx}>{it.name} (x{it.quantity})</div>
																						))}
																					</div>
																				</td>
																			</tr>
																		))}
																	</tbody>
																</table>
															</div>
														)}
													</div>
												</div>
												
												{/* Tab 3: Order Lookup */}
												<div className="tab-pane fade" id="lookup-tab" role="tabpanel">
													<div style={{ maxWidth: '600px' }}>
														<h3 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Track Order Status</h3>
														<p className="text-muted">Enter the unique Order ID (e.g. `o_xyz`) provided in your confirmation screen to retrieve its shipping/processing status.</p>
														
														<form onSubmit={handleOrderLookup} style={{ display: 'flex', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
															<input 
																type="text" 
																className="form-control" 
																placeholder="Enter Order ID" 
																style={{ flexGrow: 1 }}
																value={lookupId}
																onChange={(e) => setLookupId(e.target.value)}
															/>
															<button 
																type="submit" 
																className="button"
																disabled={lookupLoading}
																style={{ backgroundColor: '#e2a03f', color: '#000', border: 'none', padding: '0 25px', fontWeight: 'bold' }}
															>
																{lookupLoading ? 'Searching...' : 'Lookup'}
															</button>
														</form>

														{lookupError && (
															<div style={{ color: '#ef4444', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
																⚠️ {lookupError}
															</div>
														)}

														{lookupResult && (
															<div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', border: '1px solid #e9ecef' }}>
																<h4 style={{ fontWeight: 'bold', borderBottom: '1px solid #dee2e6', paddingBottom: '10px', marginBottom: '15px' }}>Order Details</h4>
																<p><strong>Order ID:</strong> <span style={{ fontFamily: 'monospace' }}>{lookupResult.id}</span></p>
																<p><strong>Fulfillment Status:</strong> <span style={{ textTransform: 'capitalize', fontWeight: 'bold', color: '#e2a03f', background: '#fef3c7', padding: '3px 8px', borderRadius: '4px' }}>{lookupResult.status}</span></p>
																<p><strong>Total Value:</strong> ${lookupResult.totalAmount.toFixed(2)}</p>
																<p><strong>Shipping Address:</strong> {lookupResult.shippingAddress}</p>
																<p><strong>Payment Method:</strong> {lookupResult.paymentMethod}</p>
																<p><strong>Date Placed:</strong> {new Date(lookupResult.createdAt).toLocaleString()}</p>
																
																<h5 style={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>Items Summary</h5>
																<div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
																	{lookupResult.items.map((it, idx) => (
																		<div key={idx} style={{ background: '#fff', border: '1px solid #eee', padding: '8px 12px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
																			<span>{it.name}</span>
																			<strong>x{it.quantity}</strong>
																		</div>
																	))}
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
						</div>
					</div>
				</div>
			</div>

			<Footer className="site-footer background four-columns" />
		</div>
    </>
  );
};

export default PageMyAccount;
