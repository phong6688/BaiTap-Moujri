import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api, resolveImagePath } from '../lib/api';
import type { Blog } from '../lib/api';

const BlogDetailsFullwidth: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const blogId = searchParams.get('id') || '';

  // TanStack Query for blog details
  const { data: blog, isLoading: loading, error } = useQuery<Blog>({
    queryKey: ['blog', blogId],
    queryFn: () => api.blogs.get(blogId),
    enabled: !!blogId
  });

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Mojuri Blog`;
    }
  }, [blog]);

  return (
    <>
      <div id="page" className="hfeed page-wrapper">
			<Header className="site-header header-v1" />

			<div id="site-main" className="site-main">
				<div id="main-content" className="main-content">
					<div id="primary" className="content-area">
						{blog && (
							<div id="title" className="page-title">
								<div className="section-container">
									<div className="content-title-heading">
										<h1 className="text-title-heading">
											{blog.title}
										</h1>
									</div>
									<div className="breadcrumbs">
										<a href="/">Home</a><span className="delimiter"></span><a href="/blog-grid-fullwidth">Blog</a><span className="delimiter"></span>{blog.title}
									</div>
								</div>
							</div>
						)}

						<div id="content" className="site-content" role="main">
							<div className="section-padding">
								<div className="section-container p-l-r">
									{loading ? (
										<div className="text-center py-5">
											<p className="text-slate-500 font-medium">Loading post details...</p>
										</div>
									) : error ? (
										<div className="text-center py-5" style={{ color: '#ef4444' }}>
											<h3>Error</h3>
											<p>{error instanceof Error ? error.message : String(error)}</p>
											<a href="/blog-grid-fullwidth" className="button" style={{ display: 'inline-block', backgroundColor: '#e2a03f', color: '#000', fontWeight: 'bold', padding: '10px 25px', marginTop: '15px' }}>Back to Blogs</a>
										</div>
									) : blog ? (
										<div className="post-details no-sidebar" style={{ maxWidth: '800px', margin: '0 auto' }}>
											<div className="post-image" style={{ width: '100%', maxHeight: '450px', overflow: 'hidden', borderRadius: '10px', marginBottom: '30px' }}>
												<img 
													src={resolveImagePath(blog.image)} 
													alt={blog.title} 
													style={{ width: '100%', height: '100%', objectFit: 'cover' }}
													onError={(e) => {
														const target = e.target as HTMLImageElement;
														target.onerror = null;
														target.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200';
													}}
												/>
											</div>
											<h2 className="post-title" style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#111' }}>
												{blog.title}
											</h2>
											<div className="post-meta" style={{ display: 'flex', gap: '20px', color: '#888', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '25px' }}>
												<span className="post-categories">
													📁 <span style={{ fontWeight: 'bold', color: '#e2a03f' }}>{blog.category}</span>
												</span>
												<span className="post-time">
													⏱ {new Date(blog.createdAt).toLocaleDateString()}
												</span>
												<span>
													✍ By {blog.author}
												</span>
											</div>
											
											{/* Summary Quote */}
											<div style={{ fontStyle: 'italic', fontSize: '18px', borderLeft: '4px solid #e2a03f', paddingLeft: '15px', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
												"{blog.summary}"
											</div>

											{/* Post Content */}
											<div className="post-content clearfix" style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
												{blog.content.split('\n').map((paragraph, idx) => (
													<p key={idx} style={{ marginBottom: '20px' }}>
														{paragraph}
													</p>
												))}
											</div>
											
											<div className="post-content-entry" style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
												<div className="tags-links" style={{ fontSize: '14px' }}>
													<strong>Tags:</strong> <a href="/blog-grid-fullwidth" style={{ color: '#e2a03f', textDecoration: 'none', marginLeft: '5px' }}>{blog.category}</a>, Jewelry, Fashion
												</div>
												<div className="entry-social-share" style={{ fontSize: '14px' }}>
													<strong>Share:</strong>
													<a href="#" style={{ marginLeft: '10px', color: '#3b5998' }}>Facebook</a>
													<a href="#" style={{ marginLeft: '10px', color: '#1da1f2' }}>Twitter</a>
												</div>
											</div>
											
											<div style={{ marginTop: '40px', textAlign: 'center' }}>
												<a href="/blog-grid-fullwidth" className="button" style={{ display: 'inline-block', backgroundColor: '#e2a03f', color: '#000', fontWeight: 'bold', padding: '12px 30px', textDecoration: 'none', borderRadius: '5px' }}>
													Back to Blog Grid
												</a>
											</div>
										</div>
									) : null}
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

export default BlogDetailsFullwidth;
