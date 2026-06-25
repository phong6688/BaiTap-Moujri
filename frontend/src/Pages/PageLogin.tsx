import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api } from '../lib/api';
import { useAuthStore } from '../lib/store';

const PageLogin: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  // Login states
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  // Register states
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  useEffect(() => {
    document.title = "Login / Register | Mojuri";
  }, []);

  // TanStack Query Mutation for Login
  const loginMutation = useMutation<any, Error, any>({
    mutationFn: ({ usernameOrEmail, password }) => api.auth.login(usernameOrEmail, password),
    onSuccess: (res) => {
      setAuth(res.token, res.user);
      setLoginSuccess('Login successful! Redirecting...');
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');
      setTimeout(() => {
        if (redirect) {
          navigate(redirect);
        } else if (res.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }, 1000);
    },
    onError: (err: any) => {
      setLoginError(err.message || 'Login failed. Invalid credentials.');
    }
  });

  // TanStack Query Mutation for Register
  const registerMutation = useMutation<any, Error, any>({
    mutationFn: ({ username, email, password }) => api.auth.register(username, email, password),
    onSuccess: (res) => {
      setAuth(res.token, res.user);
      setRegisterSuccess('Registration successful! Logging you in...');
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect') || '/';
      setTimeout(() => {
        navigate(redirect);
      }, 1000);
    },
    onError: (err: any) => {
      setRegisterError(err.message || 'Registration failed. Try again.');
    }
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    
    if (!loginInput || !loginPassword) {
      setLoginError('Please enter username/email and password.');
      return;
    }

    loginMutation.mutate({ usernameOrEmail: loginInput, password: loginPassword });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    if (!registerUsername || !registerEmail || !registerPassword) {
      setRegisterError('All fields are required.');
      return;
    }

    registerMutation.mutate({ username: registerUsername, email: registerEmail, password: registerPassword });
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
										Login / Register
									</h1>
								</div>
								<div className="breadcrumbs">
									<a href="/">Home</a><span className="delimiter"></span>Login / Register
								</div>
							</div>
						</div>

						<div id="content" className="site-content" role="main">
							<div className="section-padding">
								<div className="section-container p-l-r">
									<div className="page-login-register">
										<div className="row">
											<div className="col-lg-6 col-md-6 col-sm-12 sm-m-b-50">
												<div className="box-form-login">
													<h2>Login</h2>
													<div className="box-content">
														<div className="form-login">
															<form onSubmit={handleLoginSubmit} className="login">
																{loginError && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '15px' }}>{loginError}</p>}
																{loginSuccess && <p style={{ color: '#10b981', fontSize: '14px', marginBottom: '15px' }}>{loginSuccess}</p>}
																<div className="username">
																	<label>Username or email address <span className="required">*</span></label>
																	<input 
																		type="text" 
																		className="input-text" 
																		name="username" 
																		id="username" 
																		value={loginInput}
																		onChange={(e) => setLoginInput(e.target.value)}
																	/>
																</div>
																<div className="password">
																	<label htmlFor="password">Password <span className="required">*</span></label>
																	<input 
																		className="input-text" 
																		type="password" 
																		name="password" 
																		value={loginPassword}
																		onChange={(e) => setLoginPassword(e.target.value)}
																	/>
																</div>
																<div className="rememberme-lost">
																	<div className="remember-me">
																		<input name="rememberme" type="checkbox" defaultValue="forever" />
																		<label className="inline">Remember me</label>
																	</div>
																	<div className="lost-password">
																		<a href="/forgot-password">Lost your password?</a>
																	</div>
																</div>
																<div className="button-login">
																	<input type="submit" className="button" name="login" defaultValue="Login" /> 
																</div>
															</form>
														</div>
													</div>
												</div>
											</div>
											<div className="col-lg-6 col-md-6 col-sm-12">
												<div className="box-form-login">
													<h2 className="register">Register</h2>
													<div className="box-content">
														<div className="form-register">
															<form onSubmit={handleRegisterSubmit} className="register">
																{registerError && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '15px' }}>{registerError}</p>}
																{registerSuccess && <p style={{ color: '#10b981', fontSize: '14px', marginBottom: '15px' }}>{registerSuccess}</p>}
																<div className="username">
																	<label>Username <span className="required">*</span></label>
																	<input 
																		type="text" 
																		className="input-text" 
																		name="username" 
																		value={registerUsername}
																		onChange={(e) => setRegisterUsername(e.target.value)}
																	/>
																</div>
																<div className="email">
																	<label>Email address <span className="required">*</span></label>
																	<input 
																		type="email" 
																		className="input-text" 
																		name="email" 
																		value={registerEmail}
																		onChange={(e) => setRegisterEmail(e.target.value)}
																	/>
																</div>
																<div className="password">
																	<label>Password <span className="required">*</span></label>
																	<input 
																		type="password" 
																		className="input-text" 
																		name="password" 
																		value={registerPassword}
																		onChange={(e) => setRegisterPassword(e.target.value)}
																	/>
																</div>
																<div className="button-register">
																	<input type="submit" className="button" name="register" defaultValue="Register" />
																</div>
															</form>
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
			</div>

			<Footer className="site-footer background four-columns" />
		</div>


		
		<div className="back-top button-show">
			<i className="arrow_carrot-up"></i>
		</div>

		
		<div className="search-overlay">
			<div className="close-search"></div>
			<div className="wrapper-search">
				<form role="search" method="get" className="search-from ajax-search" action="">
					<a href="#" className="search-close"></a>
					<div className="search-box">
						<button id="searchsubmit" className="btn" type="submit">
							<i className="icon-search"></i>
						</button>
						<input type="text" autoComplete="off" defaultValue="" name="s" className="input-search s" placeholder="Search..." />
						<div className="content-menu_search">
							<label>Suggested</label>
							<ul id="menu_search" className="menu">
								<li><a href="#">Earrings</a></li>
								<li><a href="#">Necklaces</a></li>
								<li><a href="#">Bracelets</a></li>
								<li><a href="#">Jewelry Box</a></li>
							</ul>			
						</div>
					</div>
				</form>	
			</div>	
		</div>

		
		<div className="wishlist-popup">
			<div className="wishlist-popup-inner">
                <div className="wishlist-popup-content">
                    <div className="wishlist-popup-content-top">
                        <span className="wishlist-name">Wishlist</span>
						<span className="wishlist-count-wrapper"><span className="wishlist-count">2</span></span>                                
						<span className="wishlist-popup-close"></span>
                    </div>
                    <div className="wishlist-popup-content-mid">
						<table className="wishlist-items">                        
							<tbody>
								<tr className="wishlist-item">
									<td className="wishlist-item-remove"><span></span></td>
									<td className="wishlist-item-image">
                                    	<a href="/shop-details">
											<img width="600" height="600" src="/media/product/3.jpg" alt="" />                                        
										</a>
		                       		</td>
			                        <td className="wishlist-item-info">
										<div className="wishlist-item-name">
											<a href="/shop-details">Twin Hoops</a>
										</div>
										<div className="wishlist-item-price">
											<span>$150.00</span>
										</div>
										<div className="wishlist-item-time">June 4, 2022</div>                                
									</td>
			                        <td className="wishlist-item-actions">
			                            <div className="wishlist-item-stock">
											In stock 
										</div>
			                            <div className="wishlist-item-add">
											<div data-title="Add to cart">
												<a rel="nofollow" href="#">Add to cart</a>
											</div>
										</div>
	                                </td>
								</tr>
								<tr className="wishlist-item">
									<td className="wishlist-item-remove"><span></span></td>
									<td className="wishlist-item-image">
                                    	<a href="/shop-details">
											<img width="600" height="600" src="/media/product/4.jpg" alt="" />                                        
										</a>
		                       		</td>
			                        <td className="wishlist-item-info">
										<div className="wishlist-item-name">
											<a href="/shop-details">Yilver And Turquoise Earrings</a>
										</div>
										<div className="wishlist-item-price">
											<del aria-hidden="true"><span>$150.00</span></del> 
											<ins><span>$100.00</span></ins>
										</div>
										<div className="wishlist-item-time">June 4, 2022</div>                                
									</td>
			                        <td className="wishlist-item-actions">
			                            <div className="wishlist-item-stock">
											In stock 
										</div>
			                            <div className="wishlist-item-add">
											<div data-title="Add to cart">
												<a rel="nofollow" href="#">Add to cart</a>
											</div>
										</div>
	                                </td>
								</tr>
							</tbody>
						</table>
					</div>
                    <div className="wishlist-popup-content-bot">
                        <div className="wishlist-popup-content-bot-inner">
                            <a className="wishlist-page" href="/wishlist">
								Open wishlist page                                    
							</a>
                            <span className="wishlist-continue" data-url="">
                                Continue shopping                                        
                            </span>
                        </div>
                        <div className="wishlist-notice wishlist-notice-show">Added to the wishlist!</div>
                    </div>
                </div>
            </div>
		</div>

		
		<div className="compare-popup">
		    <div className="compare-popup-inner">
		        <div className="compare-table">
		            <div className="compare-table-inner">
                    	<a href="#" id="compare-table-close" className="compare-table-close">
                    		<span className="compare-table-close-icon"></span>
                    	</a>
                    	<div className="compare-table-items">
                    		<table id="product-table" className="product-table">
                    			<thead>
                    				<tr>
                    					<th>
                    						<a href="#" className="compare-table-settings">Settings</a>
                    					</th>
                    					<th>
                    						<a href="/shop-details">Twin Hoops</a> <span className="remove">remove</span>
                    					</th>
                    					<th>
                    						<a href="/shop-details">Medium Flat Hoops</a> <span className="remove">remove</span>
                    					</th>
                    					<th>
                    						<a href="/shop-details">Bold Pearl Hoop Earrings</a> <span className="remove">remove</span>
                    					</th>
                    				</tr>
                    			</thead>
                    			<tbody>
                    				<tr className="tr-image">
                    					<td className="td-label">Image</td>
                    					<td>
                    						<a href="/shop-details">
                    							<img width="600" height="600" src="/media/product/3.jpg" alt="" />
                    						</a>
                    					</td>
                    					<td>
                    						<a href="/shop-details">
                    							<img width="600" height="600" src="/media/product/1.jpg" alt="" />
                    						</a>
                    					</td>
                    					<td>
                    						<a href="/shop-details">
                    							<img width="600" height="600" src="/media/product/2.jpg" alt="" />
                    						</a>
                    					</td>
                    				</tr>
                    				<tr className="tr-sku">
                    					<td className="td-label">SKU</td>
                    					<td>VN00189</td>
                    					<td></td>
                    					<td>D1116</td>
                    				</tr>
                    				<tr className="tr-rating">
                    					<td className="td-label">Rating</td>
                    					<td>
                    						<div className="star-rating">
                    							<span style={{"width":"80%"}}></span>
                    						</div>
                    					</td>
                    					<td>
                    						<div className="star-rating">
                    							<span style={{"width":"100%"}}></span>
                    						</div>
                    					</td>
                    					<td></td>
                    				</tr>
                    				<tr className="tr-price">
                    					<td className="td-label">Price</td>
                    					<td><span className="amount">$150.00</span></td>
                    					<td><del><span className="amount">$150.00</span></del> <ins><span className="amount">$100.00</span></ins></td>
                    					<td><span className="amount">$200.00</span></td>
                    				</tr>
                    				<tr className="tr-add-to-cart">
                    					<td className="td-label">Add to cart</td>
                    					<td>
                    						<div data-title="Add to cart">
                    							<a href="#" className="button">Add to cart</a>
                    						</div>
                    					</td>
                    					<td>
                    						<div data-title="Add to cart">
                    							<a href="#" className="button">Add to cart</a>
                    						</div>
                    					</td>
                    					<td>
                    						<div data-title="Add to cart">
                    							<a href="#" className="button">Add to cart</a>
                    						</div>
                    					</td>
                    				</tr>
                    				<tr className="tr-description">
                    					<td className="td-label">Description</td>
                    					<td>Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui. Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.</td>
                    					<td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</td>
                    					<td>The EcoSmart Fleece Hoodie full-zip hooded jacket provides medium weight fleece comfort all year around. Feel better in this sweatshirt because Hanes keeps plastic bottles of landfills by using recycled polyester.7.8 ounce fleece sweatshirt made with up to 5 percent polyester created from recycled plastic.</td>
                    				</tr>
                    				<tr className="tr-content">
                    					<td className="td-label">Content</td>
                    					<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                    					<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                    					<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                    				</tr>
                    				<tr className="tr-dimensions">
                    					<td className="td-label">Dimensions</td>
                    					<td>N/A</td>
                    					<td>N/A</td>
                    					<td>N/A</td>
                    				</tr>
                    			</tbody>
                    		</table>
                    	</div>
		            </div>
		        </div>
		    </div>
		</div>

		
		<div className="quickview-popup">
			<div id="quickview-container"> 
				<div className="quickview-container"> 
					<a href="#" className="quickview-close"></a> 
					<div className="quickview-notices-wrapper"></div> 
					<div className="product single-product product-type-simple">
						<div className="product-detail">
							<div className="row"> 
								<div className="img-quickview"> 
									<div className="product-images-slider">
										<div id="quickview-slick-carousel"> 
											<div className="images"> 
												<div className="scroll-image">
													<div className="slick-wrap">
														<div className="slick-sliders image-additional" data-dots="true" data-columns4="1" data-columns3="1" data-columns2="1" data-columns1="1" data-columns="1" data-nav="true">
															<div className="img-thumbnail slick-slide"> 
																<a href="/media/product/3.jpg" className="image-scroll" title="">
																	<img width="900" height="900" src="/media/product/3.jpg" alt="" />
																</a> 
															</div>
															<div className="img-thumbnail slick-slide"> 
																<a href="/media/product/3-2.jpg" className="image-scroll" title="">
																	<img width="900" height="900" src="/media/product/3-2.jpg" alt="" />
																</a> 
															</div>
														</div>
													</div>
												</div> 
											</div> 
										</div> 
									</div> 
								</div> 
								<div className="quickview-single-info">
									<div className="product-content-detail entry-summary">
										<h1 className="product-title entry-title">Twin Hoops</h1>
										<div className="price-single">
											<div className="price">
												<del><span>$150.00</span></del>
												<span>$100.00</span>
											</div>
										</div>
										<div className="product-rating"> 
											<div className="star-rating" role="img" aria-label="Rated 4.00 out of 5">
												<span style={{"width":"80%"}}>Rated <strong className="rating">4.00</strong> out of 5 based on <span className="rating">1</span> customer rating</span>
											</div> 
											<a href="#" className="review-link">(<span className="count">1</span> customer review)</a> 
										</div>
										<div className="description"> 
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</p> 
										</div>
										<form className="cart" method="post" encType="multipart/form-data">
											<div className="quantity-button">
												<div className="quantity"> 
													<button type="button" className="plus">+</button> 
													<input type="number" className="input-text qty text" step="1" min="1" max="" name="quantity" defaultValue={1} title="Qty" size={4} placeholder="" inputMode="numeric" autoComplete="off" /> 
													<button type="button" className="minus">-</button> 
												</div> 
												<button type="submit" className="single-add-to-cart-button button alt">Add to cart</button> 
											</div> 
											<button className="button quick-buy">Buy It Now</button>
										</form> 
									</div> 
								</div> 
							</div> 
						</div>
					</div> 
					<div className="clearfix"></div> 
				</div> 
			</div>
		</div>

		
		<div className="page-preloader">
	    	<div className="loader">
	    		<div></div>
	    		<div></div>
	    	</div>
	    </div>
    </>
  );
};

export default PageLogin;
