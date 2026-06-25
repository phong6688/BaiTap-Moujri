import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = 'site-footer background four-columns' }) => {
  switch (className) {
    case 'site-footer background four-columns':
      return (
        <footer id="site-footer" className="site-footer background four-columns">
        				<div className="footer">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-lg-3 col-md-6 column-1">
        										<div className="block block-menu m-b-20">
        											<h2 className="block-title">Contact Us</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<span>Head Office:</span> 26 Wyle Cop, Shrewsbury, Shropshire, SY1 1XD
        													</li>
        													<li>
        														<span>Tel:</span> 01743 234500
        													</li>
        													<li>
        														<span>Email:</span> <a href="mailto:support@mojuri.com">support@mojuri.com</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        
        										<div className="block block-social">
        											<ul className="social-link">
        												<li><a href="#"><i className="fa fa-twitter"></i></a></li>
        												<li><a href="#"><i className="fa fa-instagram"></i></a></li>
        												<li><a href="#"><i className="fa fa-dribbble"></i></a></li>
        												<li><a href="#"><i className="fa fa-behance"></i></a></li>
        											</ul>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-2">
        										<div className="block block-menu">
        											<h2 className="block-title">Customer Services</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="/shop-grid-left">Contact Us</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Track Your Order</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Product Care & Repair</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Book an Appointment</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Frequently Asked Questions</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Shipping & Returns</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-3">
        										<div className="block block-menu">
        											<h2 className="block-title">About Us</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="#">About Us</a>
        													</li>
        													<li>
        														<a href="#">FAQ</a>
        													</li>
        													<li>
        														<a href="#">Our Producers</a>
        													</li>
        													<li>
        														<a href="#">Sitemap</a>
        													</li>
        													<li>
        														<a href="#">Terms & Conditions</a>
        													</li>
        													<li>
        														<a href="#">Privacy Policy</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-4">
        										<div className="block block-menu">
        											<h2 className="block-title">Catalog</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="/shop-grid-left">Earrings</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Necklaces</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Bracelets</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Rings</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Jewelry Box</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Studs</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div className="footer-bottom">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-md-6">
        										<div className="footer-left">
        											<p className="copyright">Copyright © 2023. All Right Reserved</p>
        										</div>
        									</div>
        									<div className="col-md-6">
        										<div className="footer-right">
        											<div className="block block-image">
        												<img width="309" height="32" src="/media/payments.png" alt="" />
        											</div>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        			</footer>
      );
    case 'site-footer background':
      return (
        <footer id="site-footer" className="site-footer background">
        				<div className="footer">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-lg-3 col-md-6">
        										<div className="block block-menu m-b-20">
        											<h2 className="block-title">Contact Us</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<span className="contact-us">Head Office:</span> 260 Wyle Cop, Shrewsbury,<br /> Shropshire, SY1 1XD
        													</li>
        													<li>
        														<span className="contact-us">Tel:</span> 01743 234500 
        													</li>
        													<li>
        														<span className="contact-us">Email:</span> support&mojury.com
        													</li>
        												</ul>
        											</div>
        										</div>
        
        										<div className="block block-social">
        											<ul className="social-link">
        												<li><a href="#"><i className="fa fa-twitter"></i></a></li>
        												<li><a href="#"><i className="fa fa-instagram"></i></a></li>
        												<li><a href="#"><i className="fa fa-dribbble"></i></a></li>
        												<li><a href="#"><i className="fa fa-behance"></i></a></li>
        											</ul>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6">
        										<div className="block block-menu">
        											<h2 className="block-title">Customer Services</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="#">Contact Us</a>
        													</li>
        													<li>
        														<a href="#">Track Your Order</a>
        													</li>
        													<li>
        														<a href="#">Product Care & Repair</a>
        													</li>
        													<li>
        														<a href="#">Book an Appointment</a>
        													</li>
        													<li>
        														<a href="#">Frequently Asked Questions</a>
        													</li>
        													<li>
        														<a href="#">Shipping & Returns</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6">
        										<div className="block block-menu">
        											<h2 className="block-title">About Us</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="#">About Us</a>
        													</li>
        													<li>
        														<a href="#">FAQ</a>
        													</li>
        													<li>
        														<a href="#">Our Producers</a>
        													</li>
        													<li>
        														<a href="#">Sitemap</a>
        													</li>
        													<li>
        														<a href="#">Terms & Conditions</a>
        													</li>
        													<li>
        														<a href="#">Privacy Policy</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6">
        										<div className="block block-menu">
        											<h2 className="block-title">Catalog</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="#">Earrings</a>
        													</li>
        													<li>
        														<a href="#">Necklaces</a>
        													</li>
        													<li>
        														<a href="#">Bracelets</a>
        													</li>
        													<li>
        														<a href="#">Rings</a>
        													</li>
        													<li>
        														<a href="#">Jewelry Box</a>
        													</li>
        													<li>
        														<a href="#">Studs</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div className="footer-bottom">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-md-6">
        										<div className="footer-left">
        											<p className="copyright">Copyright © 2023. All Right Reserved</p>
        										</div>
        									</div>
        									<div className="col-md-6">
        										<div className="footer-right">
        											<div className="block block-image">
        												<img width="309" height="32" src="/media/payments.png" alt="" />
        											</div>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        			</footer>
      );
    case 'site-footer three-columns':
      return (
        <footer id="site-footer" className="site-footer three-columns">
        				<div className="footer">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-lg-4 column-left">
        										<div className="column-wrap">
        											<div className="block block-newsletter">
        												<h2 className="block-title">Our Newsletter</h2>
        												<div className="block-content">
        													<div className="newsletter-text">Sign up for the latest Ice offers and exclusives.</div>
        													<form action="" method="post" className="newsletter-form">
        														<input type="email" name="your-email" defaultValue="" size={40} placeholder="Email address" />
        														<span className="btn-submit">
        															<input type="submit" defaultValue="Subscribe" />
        														</span>
        													</form>
        												</div>
        											</div>
        											<div className="block block-image">
        												<img width="309" height="32" src="/media/payments.png" alt="" />
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-4 column-center">
        										<div className="column-wrap">
        											<div className="block block-image m-b-20">
        												<img width="100" src="/media/logo.png" alt="" />
        											</div>
        											<div className="block block-social">
        												<ul className="social-link">
        													<li><a href="#"><i className="fa fa-twitter"></i></a></li>
        													<li><a href="#"><i className="fa fa-instagram"></i></a></li>
        													<li><a href="#"><i className="fa fa-dribbble"></i></a></li>
        													<li><a href="#"><i className="fa fa-behance"></i></a></li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-4 column-right">
        										<div className="column-wrap">
        											<div className="row">
        												<div className="col-lg-6 md-b-20">
        													<div className="block block-menu">
        														<h2 className="block-title">Customer Services</h2>
        														<div className="block-content">
        															<ul>
        																<li>
        																	<a href="#">Contact Us</a>
        																</li>
        																<li>
        																	<a href="#">Track Your Order</a>
        																</li>
        																<li>
        																	<a href="#">Product Care & Repair</a>
        																</li>
        																<li>
        																	<a href="#">Book an Appointment</a>
        																</li>
        																<li>
        																	<a href="#">Frequently Asked Questions</a>
        																</li>
        																<li>
        																	<a href="#">Shipping & Returns</a>
        																</li>
        															</ul>
        														</div>
        													</div>
        												</div>
        												<div className="col-lg-6">
        													<div className="block block-menu">
        														<h2 className="block-title">About Us</h2>
        														<div className="block-content">
        															<ul>
        																<li>
        																	<a href="#">About Us</a>
        																</li>
        																<li>
        																	<a href="#">FAQ</a>
        																</li>
        																<li>
        																	<a href="#">Our Producers</a>
        																</li>
        																<li>
        																	<a href="#">Sitemap</a>
        																</li>
        																<li>
        																	<a href="#">Terms & Conditions</a>
        																</li>
        																<li>
        																	<a href="#">Privacy Policy</a>
        																</li>
        															</ul>
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
        				<div className="footer-bottom">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<p className="copyright text-center">Copyright © 2023. All Right Reserved</p>
        							</div>
        						</div>
        					</div>
        				</div>
        			</footer>
      );
    case 'site-footer four-columns no-border-top':
      return (
        <footer id="site-footer" className="site-footer four-columns no-border-top">
        				<div className="footer">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-lg-3 col-md-6 column-1">
        										<div className="block block-menu">
        											<h2 className="block-title">Customer Services</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="/shop-grid-left">Contact Us</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Track Your Order</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Product Care & Repair</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Book an Appointment</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Frequently Asked Questions</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Shipping & Returns</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-2">
        										<div className="block block-menu">
        											<h2 className="block-title">About Us</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="#">About Us</a>
        													</li>
        													<li>
        														<a href="#">FAQ</a>
        													</li>
        													<li>
        														<a href="#">Our Producers</a>
        													</li>
        													<li>
        														<a href="#">Sitemap</a>
        													</li>
        													<li>
        														<a href="#">Terms & Conditions</a>
        													</li>
        													<li>
        														<a href="#">Privacy Policy</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-3">
        										<div className="block block-menu">
        											<h2 className="block-title">Catalog</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="/shop-grid-left">Earrings</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Necklaces</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Bracelets</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Rings</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Jewelry Box</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Studs</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-4">
        										<div className="block block-newsletter">
        											<h2 className="block-title">Our Newsletter</h2>
        											<div className="block-content">
        												<div className="newsletter-text">Sign up for the latest Ice offers and exclusives.</div>
        												<form action="" method="post" className="newsletter-form">
        													<input type="email" name="your-email" defaultValue="" size={40} placeholder="Email address" />
        													<span className="btn-submit">
        														<input type="submit" defaultValue="Subscribe" />
        													</span>
        												</form>
        											</div>
        										</div>
        
        										<div className="block block-social">
        											<ul className="social-link">
        												<li><a href="#"><i className="fa fa-twitter"></i></a></li>
        												<li><a href="#"><i className="fa fa-instagram"></i></a></li>
        												<li><a href="#"><i className="fa fa-dribbble"></i></a></li>
        												<li><a href="#"><i className="fa fa-behance"></i></a></li>
        											</ul>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div className="footer-bottom">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-md-6">
        										<div className="footer-left">
        											<p className="copyright">Copyright © 2023. All Right Reserved</p>
        										</div>
        									</div>
        									<div className="col-md-6">
        										<div className="footer-right">
        											<div className="block block-image">
        												<img width="309" height="32" src="/media/payments.png" alt="" />
        											</div>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        			</footer>
      );
    case 'site-footer':
      return (
        <footer id="site-footer" className="site-footer">
        				<div className="footer">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-lg-3 col-md-6">
        										<div className="block block-menu m-b-20">
        											<h2 className="block-title">Contact Us</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<span className="contact-us">Head Office:</span> 260 Wyle Cop, Shrewsbury,<br /> Shropshire, SY1 1XD
        													</li>
        													<li>
        														<span className="contact-us">Tel:</span> 01743 234500 
        													</li>
        													<li>
        														<span className="contact-us">Email:</span> support&mojury.com
        													</li>
        												</ul>
        											</div>
        										</div>
        
        										<div className="block block-social">
        											<ul className="social-link">
        												<li><a href="#"><i className="fa fa-twitter"></i></a></li>
        												<li><a href="#"><i className="fa fa-instagram"></i></a></li>
        												<li><a href="#"><i className="fa fa-dribbble"></i></a></li>
        												<li><a href="#"><i className="fa fa-behance"></i></a></li>
        											</ul>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6">
        										<div className="block block-menu">
        											<h2 className="block-title">Customer Services</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="#">Contact Us</a>
        													</li>
        													<li>
        														<a href="#">Track Your Order</a>
        													</li>
        													<li>
        														<a href="#">Product Care & Repair</a>
        													</li>
        													<li>
        														<a href="#">Book an Appointment</a>
        													</li>
        													<li>
        														<a href="#">Frequently Asked Questions</a>
        													</li>
        													<li>
        														<a href="#">Shipping & Returns</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6">
        										<div className="block block-menu">
        											<h2 className="block-title">About Us</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="#">About Us</a>
        													</li>
        													<li>
        														<a href="#">FAQ</a>
        													</li>
        													<li>
        														<a href="#">Our Producers</a>
        													</li>
        													<li>
        														<a href="#">Sitemap</a>
        													</li>
        													<li>
        														<a href="#">Terms & Conditions</a>
        													</li>
        													<li>
        														<a href="#">Privacy Policy</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6">
        										<div className="block block-menu">
        											<h2 className="block-title">Catalog</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="#">Earrings</a>
        													</li>
        													<li>
        														<a href="#">Necklaces</a>
        													</li>
        													<li>
        														<a href="#">Bracelets</a>
        													</li>
        													<li>
        														<a href="#">Rings</a>
        													</li>
        													<li>
        														<a href="#">Jewelry Box</a>
        													</li>
        													<li>
        														<a href="#">Studs</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div className="footer-bottom">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-md-6">
        										<div className="footer-left">
        											<p className="copyright">Copyright © 2023. All Right Reserved</p>
        										</div>
        									</div>
        									<div className="col-md-6">
        										<div className="footer-right">
        											<div className="block block-image">
        												<img width="309" height="32" src="/media/payments.png" alt="" />
        											</div>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        			</footer>
      );
    case 'site-footer four-columns':
      return (
        <footer id="site-footer" className="site-footer four-columns">
        				<div className="footer">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-lg-3 col-md-6 column-1">
        										<div className="block block-menu">
        											<h2 className="block-title">Customer Services</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="/shop-grid-left">Contact Us</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Track Your Order</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Product Care & Repair</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Book an Appointment</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Frequently Asked Questions</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Shipping & Returns</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-2">
        										<div className="block block-menu">
        											<h2 className="block-title">About Us</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="#">About Us</a>
        													</li>
        													<li>
        														<a href="#">FAQ</a>
        													</li>
        													<li>
        														<a href="#">Our Producers</a>
        													</li>
        													<li>
        														<a href="#">Sitemap</a>
        													</li>
        													<li>
        														<a href="#">Terms & Conditions</a>
        													</li>
        													<li>
        														<a href="#">Privacy Policy</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-3">
        										<div className="block block-menu">
        											<h2 className="block-title">Catalog</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="/shop-grid-left">Earrings</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Necklaces</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Bracelets</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Rings</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Jewelry Box</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Studs</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-4">
        										<div className="block block-newsletter">
        											<h2 className="block-title">Our Newsletter</h2>
        											<div className="block-content">
        												<div className="newsletter-text">Sign up for the latest Ice offers and exclusives.</div>
        												<form action="" method="post" className="newsletter-form">
        													<input type="email" name="your-email" defaultValue="" size={40} placeholder="Email address" />
        													<span className="btn-submit">
        														<input type="submit" defaultValue="Subscribe" />
        													</span>
        												</form>
        											</div>
        										</div>
        
        										<div className="block block-social">
        											<ul className="social-link">
        												<li><a href="#"><i className="fa fa-twitter"></i></a></li>
        												<li><a href="#"><i className="fa fa-instagram"></i></a></li>
        												<li><a href="#"><i className="fa fa-dribbble"></i></a></li>
        												<li><a href="#"><i className="fa fa-behance"></i></a></li>
        											</ul>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div className="footer-bottom">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-md-6">
        										<div className="footer-left">
        											<p className="copyright">Copyright © 2023. All Right Reserved</p>
        										</div>
        									</div>
        									<div className="col-md-6">
        										<div className="footer-right">
        											<div className="block block-image">
        												<img width="309" height="32" src="/media/payments.png" alt="" />
        											</div>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        			</footer>
      );
    case 'site-footer background four-columns m-t-0':
      return (
        <footer id="site-footer" className="site-footer background four-columns m-t-0">
        				<div className="footer">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-lg-3 col-md-6 column-1">
        										<div className="block block-menu m-b-20">
        											<h2 className="block-title">Contact Us</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<span>Head Office:</span> 26 Wyle Cop, Shrewsbury, Shropshire, SY1 1XD
        													</li>
        													<li>
        														<span>Tel:</span> 01743 234500
        													</li>
        													<li>
        														<span>Email:</span> <a href="mailto:support@mojuri.com">support@mojuri.com</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        
        										<div className="block block-social">
        											<ul className="social-link">
        												<li><a href="#"><i className="fa fa-twitter"></i></a></li>
        												<li><a href="#"><i className="fa fa-instagram"></i></a></li>
        												<li><a href="#"><i className="fa fa-dribbble"></i></a></li>
        												<li><a href="#"><i className="fa fa-behance"></i></a></li>
        											</ul>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-2">
        										<div className="block block-menu">
        											<h2 className="block-title">Customer Services</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="/shop-grid-left">Contact Us</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Track Your Order</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Product Care & Repair</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Book an Appointment</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Frequently Asked Questions</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Shipping & Returns</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-3">
        										<div className="block block-menu">
        											<h2 className="block-title">About Us</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="#">About Us</a>
        													</li>
        													<li>
        														<a href="#">FAQ</a>
        													</li>
        													<li>
        														<a href="#">Our Producers</a>
        													</li>
        													<li>
        														<a href="#">Sitemap</a>
        													</li>
        													<li>
        														<a href="#">Terms & Conditions</a>
        													</li>
        													<li>
        														<a href="#">Privacy Policy</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        									<div className="col-lg-3 col-md-6 column-4">
        										<div className="block block-menu">
        											<h2 className="block-title">Catalog</h2>
        											<div className="block-content">
        												<ul>
        													<li>
        														<a href="/shop-grid-left">Earrings</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Necklaces</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Bracelets</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Rings</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Jewelry Box</a>
        													</li>
        													<li>
        														<a href="/shop-grid-left">Studs</a>
        													</li>
        												</ul>
        											</div>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div className="footer-bottom">
        					<div className="section-padding">
        						<div className="section-container">
        							<div className="block-widget-wrap">
        								<div className="row">
        									<div className="col-md-6">
        										<div className="footer-left">
        											<p className="copyright">Copyright © 2023. All Right Reserved</p>
        										</div>
        									</div>
        									<div className="col-md-6">
        										<div className="footer-right">
        											<div className="block block-image">
        												<img width="309" height="32" src="/media/payments.png" alt="" />
        											</div>
        										</div>
        									</div>
        								</div>
        							</div>
        						</div>
        					</div>
        				</div>
        			</footer>
      );

    default:
      return null;
  }
};

export default Footer;
