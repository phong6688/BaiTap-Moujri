import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api, resolveImagePath } from '../lib/api';
import type { Blog } from '../lib/api';

const BlogGridFullwidth: React.FC = () => {
  // TanStack Query to fetch published blogs
  const { data: blogs = [], isLoading: loading } = useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: () => api.blogs.list(),
    select: (list) => list.filter(b => b.status === 'published')
  });

  useEffect(() => {
    document.title = "Blog | Mojuri";
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
										Blog & Fashion Tips
									</h1>
								</div>
								<div className="breadcrumbs">
									<a href="/">Home</a><span className="delimiter"></span>Blog
								</div>
							</div>
						</div>

						<div id="content" className="site-content" role="main">
							<div className="section-padding">
								<div className="section-container p-l-r">
									<div className="posts-list grid">
										<div className="row">
											{loading ? (
												<div className="col-12 text-center py-5">
													<p className="text-slate-500 font-medium">Loading blog articles...</p>
												</div>
											) : blogs.length === 0 ? (
												<div className="col-12 text-center py-5">
													<p className="text-slate-500">No blog posts found.</p>
												</div>
											) : (
												blogs.map((blog) => (
													<div key={blog.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
														<div className="post-entry clearfix post-wapper" style={{ marginBottom: '40px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', padding: '15px', background: '#fff' }}>
															<div className="post-image" style={{ height: '240px', overflow: 'hidden', borderRadius: '6px', marginBottom: '15px' }}>
																<a href={`/blog-details-fullwidth?id=${blog.id}`}>
																	<img 
																		src={resolveImagePath(blog.image)} 
																		alt={blog.title} 
																		style={{ width: '100%', height: '100%', objectFit: 'cover' }}
																		onError={(e) => {
																			const target = e.target as HTMLImageElement;
																			target.onerror = null;
																			target.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600';
																		}}
																	/>
																</a>
															</div>
															<div className="post-content">
																<div className="post-categories" style={{ marginBottom: '8px' }}>
																	<span style={{ fontSize: '11px', fontWeight: 'bold', color: '#e2a03f', textTransform: 'uppercase', background: '#fef3c7', padding: '3px 8px', borderRadius: '4px' }}>
																		{blog.category}
																	</span>
																</div>
																<h2 className="post-title" style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0', lineHeight: '1.4' }}>
																	<a href={`/blog-details-fullwidth?id=${blog.id}`} style={{ color: '#222', textDecoration: 'none' }}>
																		{blog.title}
																	</a>
																</h2>
																<p className="post-summary" style={{ fontSize: '13px', color: '#666', lineClamp: '2', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: '10px 0' }}>
																	{blog.summary}
																</p>
																<div className="post-meta" style={{ fontSize: '12px', color: '#999', borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '15px', display: 'flex', justifyContent: 'between' }}>
																	<span className="post-time">{new Date(blog.createdAt).toLocaleDateString()}</span>
																	<span style={{ marginLeft: 'auto' }}>By {blog.author}</span>
																</div>
															</div>
														</div>
													</div>
												))
											)}
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

export default BlogGridFullwidth;
