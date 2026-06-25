import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogGridLeft: React.FC = () => {
  useEffect(() => {
    document.title = "Blog Grid - Left Sidebar | Mojuri";
  }, []);

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
										Wedding & Bridal
									</h1>
								</div>
								<div className="breadcrumbs">
									<a href="/">Home</a><span className="delimiter"></span>Wedding & Bridal
								</div>
							</div>
						</div>

						<div id="content" className="site-content" role="main">
							<div className="section-padding">
								<div className="section-container p-l-r">
									<div className="row">
										<div className="col-xl-3 col-lg-3 col-md-12 col-12 sidebar left-sidebar md-b-50">
											
											<div className="block block-post-search">
												<div className="block-title"><h2>Search</h2></div>
												<div className="block-content">
													<form method="get" className="search-from" action="">
														<input type="text" defaultValue="" name="s" className="s" placeholder="Search..." />
														<button className="btn" type="submit">
															<i className="icon-search"></i>
														</button>
									  				</form>
												</div>
											</div>

											
											<div className="block block-post-cats">
												<div className="block-title"><h2>Categories</h2></div>
												<div className="block-content">
													<div className="post-cats-list">
														<ul>
															<li>
																<a href="/blog-grid-left">Bracelets <span className="count">9</span></a>
															</li>
															<li>
																<a href="/blog-grid-left">Earrings <span className="count">4</span></a>
															</li>
															<li>
																<a href="/blog-grid-left">Necklaces <span className="count">3</span></a>
															</li>
															<li>
																<a href="/blog-grid-left">News <span className="count">6</span></a>
															</li>
															<li className="current">
																<a href="/blog-grid-left">Wedding & Bridal <span className="count">2</span></a>
															</li>
														</ul>
													</div>
												</div>
											</div>

											
											<div className="block block-posts">
												<div className="block-title"><h2>Recent Posts</h2></div>
												<div className="block-content">
													<ul className="posts-list">
														<li className="post-item">
															<a href="/blog-details-right" className="post-image">
																<img src="/media/blog/1.jpg" />
															</a>
															<div className="post-content">
																<h2 className="post-title">
																	<a href="/blog-details-right">
																		Bridial Fair Collections 2023
																	</a>
																</h2>
																<div className="post-time">
																	<span className="post-date">May 30, 2023</span>
																</div>
															</div>
														</li>
														<li className="post-item">
															<a href="/blog-details-right" className="post-image">
																<img src="/media/blog/2.jpg" />
															</a>
															<div className="post-content">
																<h2 className="post-title">
																	<a href="/blog-details-right">
																		Our Sterling Silver
																	</a>
																</h2>
																<div className="post-time">
																	<span className="post-date">Aug 24, 2023</span>
																</div>
															</div>
														</li>
														<li className="post-item">
															<a href="/blog-details-right" className="post-image">
																<img src="/media/blog/3.jpg" />
															</a>
															<div className="post-content">
																<h2 className="post-title">
																	<a href="/blog-details-right">
																		New Season Modern Gold Earrings
																	</a>
																</h2>
																<div className="post-time">
																	<span className="post-date">Dec 06, 2023</span>
																</div>
															</div>
														</li>
													</ul>
												</div>
											</div>

											
											<div className="block block-post-archives">
												<div className="block-title"><h2>Archives</h2></div>
												<div className="block-content">
													<div className="post-archives-list">
														<ul>
															<li>
																<a href="/blog-grid-left">May 2023</a>
															</li>
															<li>
																<a href="/blog-grid-left">April 2023</a>
															</li>
															<li>
																<a href="/blog-grid-left">August 2022</a>
															</li>
														</ul>
													</div>
												</div>
											</div>

											
											<div className="block block-post-tags">
												<div className="block-title"><h2>Tags</h2></div>
												<div className="block-content">
													<div className="post-tags-list">
														<ul>
															<li>
																<a href="/blog-grid-left">Jewelry</a>
															</li>
															<li>
																<a href="/blog-grid-left">Ring Styles</a>
															</li>
															<li>
																<a href="/blog-grid-left">Gift Ideas</a>
															</li>
															<li>
																<a href="/blog-grid-left">Wedding</a>
															</li>
															<li>
																<a href="/blog-grid-left">Bracelets</a>
															</li>
															<li>
																<a href="/blog-grid-left">Necklaces</a>
															</li>
															<li>
																<a href="/blog-grid-left">Unique</a>
															</li>
															<li>
																<a href="/blog-grid-left">Glossary</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>

										<div className="col-xl-9 col-lg-9 col-md-12 col-12">
											<div className="posts-list grid">
												<div className="row">
													<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
														<div className="post-entry clearfix post-wapper">
															<div className="post-image">
																<a href="/blog-details-right">
																	<img src="/media/blog/1.jpg" alt="" />
																</a>
															</div>
															<div className="post-content">
																<div className="post-categories">
																	<a href="/blog-grid-right">Wedding & Bridal</a>
																</div>
																<h2 className="post-title">
																	<a href="/blog-details-right">Bridial Fair Collections 2023</a>
																</h2>
																<div className="post-meta">
																	<span className="post-time">July 24, 2023</span>
																	<span className="post-comment">1 Comment</span>															
																</div>
															</div>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
														<div className="post-entry clearfix post-wapper">
															<div className="post-image">
																<a href="/blog-details-right">
																	<img src="/media/blog/2.jpg" alt="" />
																</a>
															</div>
															<div className="post-content">
																<div className="post-categories">
																	<a href="/blog-grid-right">Wedding & Bridal</a>
																</div>
																<h2 className="post-title">
																	<a href="/blog-details-right">Our Sterling Silver</a>
																</h2>
																<div className="post-meta">
																	<span className="post-time">August 16, 2023</span>
																	<span className="post-comment">4 Comments</span>														
																</div>
															</div>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
														<div className="post-entry clearfix post-wapper">
															<div className="post-image">
																<a href="/blog-details-right">
																	<img src="/media/blog/3.jpg" alt="" />
																</a>
															</div>
															<div className="post-content">
																<div className="post-categories">
																	<a href="/blog-grid-right">Wedding & Bridal</a>
																</div>
																<h2 className="post-title">
																	<a href="/blog-details-right">New Season Modern Gold Earrings</a>
																</h2>
																<div className="post-meta">
																	<span className="post-time">October 04, 2023</span>
																	<span className="post-comment">3 Comments</span>															
																</div>
															</div>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
														<div className="post-entry clearfix post-wapper">
															<div className="post-image">
																<a href="/blog-details-right">
																	<img src="/media/blog/4.jpg" alt="" />
																</a>
															</div>
															<div className="post-content">
																<div className="post-categories">
																	<a href="/blog-grid-right">Wedding & Bridal</a>
																</div>
																<h2 className="post-title">
																	<a href="/blog-details-right">Glossary of Jewelry Terms</a>
																</h2>
																<div className="post-meta">
																	<span className="post-time">October 20, 2023</span>
																	<span className="post-comment">1 Comment</span>															
																</div>
															</div>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
														<div className="post-entry clearfix post-wapper">
															<div className="post-image">
																<a href="/blog-details-right">
																	<img src="/media/blog/5.jpg" alt="" />
																</a>
															</div>
															<div className="post-content">
																<div className="post-categories">
																	<a href="/blog-grid-right">Wedding & Bridal</a>
																</div>
																<h2 className="post-title">
																	<a href="/blog-details-right">Unique First Anniversary Gift Ideas</a>
																</h2>
																<div className="post-meta">
																	<span className="post-time">December 11, 2023</span>
																	<span className="post-comment">5 Comments</span>															
																</div>
															</div>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
														<div className="post-entry clearfix post-wapper">
															<div className="post-image">
																<a href="/blog-details-right">
																	<img src="/media/blog/6.jpg" alt="" />
																</a>
															</div>
															<div className="post-content">
																<div className="post-categories">
																	<a href="/blog-grid-right">Wedding & Bridal</a>
																</div>
																<h2 className="post-title">
																	<a href="/blog-details-right">Hypoallergenic Wedding Bands</a>
																</h2>
																<div className="post-meta">
																	<span className="post-time">February 07, 2023</span>
																	<span className="post-comment">2 Comments</span>															
																</div>
															</div>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
														<div className="post-entry clearfix post-wapper">
															<div className="post-image">
																<a href="/blog-details-right">
																	<img src="/media/blog/7.jpg" alt="" />
																</a>
															</div>
															<div className="post-content">
																<div className="post-categories">
																	<a href="/blog-grid-right">Wedding & Bridal</a>
																</div>
																<h2 className="post-title">
																	<a href="/blog-details-right">Guide to Engagement Ring Styles</a>
																</h2>
																<div className="post-meta">
																	<span className="post-time">July 24, 2023</span>
																	<span className="post-comment">3 Comments</span>															
																</div>
															</div>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
														<div className="post-entry clearfix post-wapper">
															<div className="post-image">
																<a href="/blog-details-right">
																	<img src="/media/blog/3.jpg" alt="" />
																</a>
															</div>
															<div className="post-content">
																<div className="post-categories">
																	<a href="/blog-grid-right">Wedding & Bridal</a>
																</div>
																<h2 className="post-title">
																	<a href="/blog-details-right">Ultimate Guide To Women's Wedding Bands</a>
																</h2>
																<div className="post-meta">
																	<span className="post-time">July 24, 2023</span>
																	<span className="post-comment">1 Comment</span>															
																</div>
															</div>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
														<div className="post-entry clearfix post-wapper">
															<div className="post-image">
																<a href="/blog-details-right">
																	<img src="/media/blog/1.jpg" alt="" />
																</a>
															</div>
															<div className="post-content">
																<div className="post-categories">
																	<a href="/blog-grid-right">Wedding & Bridal</a>
																</div>
																<h2 className="post-title">
																	<a href="/blog-details-right">Wedding Planning Advice</a>
																</h2>
																<div className="post-meta">
																	<span className="post-time">July 24, 2023</span>
																	<span className="post-comment">5 Comments</span>															
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<nav className="pagination">
												<ul className="page-numbers">
													<li><a className="prev page-numbers" href="#">Previous</a></li>
													<li><span aria-current="page" className="page-numbers current">1</span></li>
													<li><a className="page-numbers" href="#">2</a></li>
													<li><a className="page-numbers" href="#">3</a></li>
													<li><a className="next page-numbers" href="#">Next</a></li>
												</ul>
											</nav>
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
										<div className="wishlist-item-time">June 4, 2023</div>                            
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
										<div className="wishlist-item-time">June 4, 2023</div>                                
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

export default BlogGridLeft;
