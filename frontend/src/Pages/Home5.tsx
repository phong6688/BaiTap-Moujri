import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home5: React.FC = () => {
  useEffect(() => {
    document.title = "Home Parallax | Mojuri";
    document.body.className = "home home-5";
    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <>
      <div id="page" className="hfeed page-wrapper">
			<Header className="site-header header-v1 color-white" />

			<div id="site-main" className="site-main">
				<div id="main-content" className="main-content">
					<div id="primary" className="content-area">
						<div id="content" className="site-content" role="main">
							<section className="section m-b-0">
								
								<div className="block block-parallax bg-img-1 bg-top-center">
									<div className="section-container">
										<div className="row">
											<div className="col-md-6">
												<div className="content">
													<h2 className="title">Spring <br />Collections</h2>
													<div className="description">Brighten up your look with vibrant gemstone jewelry.</div>
													<a className="button button-white button-outline thick-border button-arrow animation-horizontal" href="/shop-grid-left">Explore All</a>
												</div>
											</div>
											<div className="col-md-6">
											</div>
										</div>
									</div>
									<div className="go-to-section">
										<div className="go-to-button">
											<a className="scroll-button" href="#section-2">Scroll Down</a>
										</div>
										<div className="go-to-text">
											<a className="scroll-button" href="#section-2">Scroll Down</a>
										</div>
									</div>
								</div>
							</section>

							<section className="section m-b-0" id="section-2">
								
								<div className="block block-parallax bg-img-2 right-text">
									<div className="section-container">
										<div className="row">
											<div className="col-md-6">
											</div>
											<div className="col-md-6">
												<div className="content">
													<h2 className="title">Curated by <br />Color</h2>
													<div className="description">Introducing your outfit’s missing link.</div>
													<a className="button button-white button-outline thick-border button-arrow animation-horizontal" href="/shop-grid-left">Explore All</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>

							<section className="section m-b-0">
								
								<div className="block block-parallax bg-img-3 bg-top-center">
									<div className="section-container">
										<div className="row">
											<div className="col-md-6">
												<div className="content">
													<h2 className="title">Make the <br />Connection</h2>
													<div className="description">Brighten up your look with vibrant gemstone jewelry.</div>
													<a className="button button-white button-outline thick-border button-arrow animation-horizontal" href="/shop-grid-left">Explore All</a>
												</div>
											</div>
											<div className="col-md-6">
											</div>
										</div>
									</div>
								</div>
							</section>

							<section className="section m-b-0">
								
								<div className="block block-parallax bg-img-4 right-text">
									<div className="section-container">
										<div className="row">
											<div className="col-md-6">
											</div>
											<div className="col-md-6">
												<div className="content">
													<h2 className="title">Rings <br />Collections</h2>
													<div className="description">Introducing your outfit’s missing link.</div>
													<a className="button button-white button-outline thick-border button-arrow animation-horizontal" href="/shop-grid-left">Explore All</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>

			<Footer className="site-footer three-columns" />
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

		
		<div className="popup-shadow"></div>
		<div className="newsletter-popup">
			<a href="#" className="newsletter-close"></a>
			<div className="newsletter-container"> 
				<div className="newsletter-img">
					<img src="/media/banner/newsletter-popup.jpg" alt="" />
				</div> 
				<div className="newsletter-form">
					<form action="" method="post">
						<div className="newsletter-title">
							<div className="title">Get<br /> free shipping</div>
							<div className="sub-title">on your first order. Offer ends soon.</div>
						</div>
						<div className="newsletter-input clearfix">
							<input type="email" name="your-email" size={40} className="form-control" placeholder="Enter Your Email ..." />
							<input type="submit" defaultValue="Subscribe" className="form-control" />
			     		</div>
			     		<div className="newsletter-no">no thanks !</div>
					</form>
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

export default Home5;
