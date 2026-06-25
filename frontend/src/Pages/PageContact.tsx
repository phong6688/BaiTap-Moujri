import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api } from '../lib/api';

const PageContact: React.FC = () => {
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Feedback states
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.title = "Contact Us | Mojuri";
  }, []);

  // TanStack Query Mutation for contact submission
  const contactMutation = useMutation<any, Error, any>({
    mutationFn: (contactData) => api.contacts.create(contactData),
    onSuccess: () => {
      setSuccessMsg('Your message has been sent successfully! We will get back to you shortly.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    },
    onError: (err: any) => {
      setErrorMsg(err.message || 'Failed to send message. Please try again.');
    }
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name || !email || !subject || !message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    contactMutation.mutate({ name, email, subject, message });
  };

  const loading = contactMutation.isPending;

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
										Contact Us
									</h1>
								</div>
								<div className="breadcrumbs">
									<a href="/">Home</a><span className="delimiter"></span>Contact Us
								</div>
							</div>
						</div>

						<div id="content" className="site-content" role="main">
							<div className="page-contact">
								{/* MAP SECTION */}
								<section className="section section-padding">
									<div className="section-container small">
										<div className="block block-contact-map">
											<div className="block-widget-wrap">
												<iframe src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near" aria-label="London Eye, London, United Kingdom"></iframe>
											</div>
										</div>
									</div>
								</section>	

								{/* INFORMATION GRID SECTION */}
								<section className="section section-padding m-b-70">
									<div className="section-container">
										<div className="block block-contact-info">
											<div className="block-widget-wrap">
												<div className="row">
													<div className="col-md-4 col-sm-12">
														<div className="info-box" style={{ textAlign: 'center', padding: '20px' }}>
															<h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>Visit Store</h3>
															<p>123 Jewelers Ave, Suite 500<br />London, EC1A 1BB, UK</p>
														</div>
													</div>
													<div className="col-md-4 col-sm-12">
														<div className="info-box" style={{ textAlign: 'center', padding: '20px' }}>
															<h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>Contact Directly</h3>
															<p>Email: contact@mojuri.com<br />Phone: (+44) 20 7946 0958</p>
														</div>
													</div>
													<div className="col-md-4 col-sm-12">
														<div className="info-box" style={{ textAlign: 'center', padding: '20px' }}>
															<h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>Work Hours</h3>
															<p>Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>

								{/* DYNAMIC CONTACT FORM SECTION */}
								<section className="section section-padding background-img bg-img-7 p-t-70 p-b-70 m-b-0" style={{ backgroundColor: '#faf9f5' }}>
									<div className="section-container small">
										<div className="block block-contact-form">
											<div className="block-widget-wrap">
												<div className="block-title" style={{ textAlign: 'center', marginBottom: '30px' }}>
													<h2 style={{ fontWeight: 'bold', fontSize: '28px' }}>Send Us Your Questions!</h2>
													<div className="sub-title" style={{ color: '#666', marginTop: '5px' }}>We’ll get back to you within two days.</div>
												</div>
												<div className="block-content">
													<form onSubmit={handleContactSubmit} className="contact-form" noValidate>
														<div className="contact-us-form">
															{errorMsg && (
																<div style={{ color: '#ef4444', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', fontSize: '14px' }}>
																	⚠️ {errorMsg}
																</div>
															)}
															{successMsg && (
																<div style={{ color: '#10b981', backgroundColor: '#d1fae5', border: '1px solid #a7f3d0', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', fontSize: '14px' }}>
																	✓ {successMsg}
																</div>
															)}

															<div className="row">
																<div className="col-sm-12 col-md-6">
															        <label className="required" style={{ fontWeight: '600' }}>Name *</label><br />
															        <span className="form-control-wrap">
															        	<input 
																			type="text" 
																			required 
																			className="form-control" 
																			value={name} 
																			onChange={(e) => setName(e.target.value)} 
																		/>
															        </span>
															    </div>
																<div className="col-sm-12 col-md-6">
															        <label className="required" style={{ fontWeight: '600' }}>Email *</label><br />
															        <span className="form-control-wrap">
															        	<input 
																			type="email" 
																			required 
																			className="form-control" 
																			value={email} 
																			onChange={(e) => setEmail(e.target.value)} 
																		/>
															        </span>
															    </div>
															</div>
															
															<div className="row" style={{ marginTop: '15px' }}>
																<div className="col-sm-12">
																	<label className="required" style={{ fontWeight: '600' }}>Subject (Tiêu đề) *</label><br />
																	<span className="form-control-wrap">
																		<input 
																			type="text" 
																			required 
																			className="form-control" 
																			value={subject} 
																			onChange={(e) => setSubject(e.target.value)} 
																		/>
																	</span>
																</div>
															</div>

															<div className="row" style={{ marginTop: '15px' }}>
																<div className="col-sm-12">
																	<label className="required" style={{ fontWeight: '600' }}>Message *</label><br />
																	<span className="form-control-wrap">
																		<textarea 
																			required 
																			cols={40} 
																			rows={8} 
																			className="form-control" 
																			value={message} 
																			onChange={(e) => setMessage(e.target.value)}
																		/>
																	</span>
																</div>
															</div>

															<div className="form-button" style={{ marginTop: '20px', textAlign: 'center' }}>
												      			<button 
																	type="submit" 
																	className="button" 
																	disabled={loading}
																	style={{ backgroundColor: '#e2a03f', color: '#000', fontWeight: 'bold', border: 'none', padding: '12px 40px', cursor: 'pointer', transition: 'background-color 0.2s' }}
																>
																	{loading ? 'Sending Inquiry...' : 'Submit Inquiry'}
																</button>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</section>
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

export default PageContact;
