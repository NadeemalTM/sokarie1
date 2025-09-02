import React, { useState } from 'react'
import './BlogPage.css'

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blogPosts = [
    {
      id: 1,
      title: "Spring Fashion Trends 2025",
      excerpt: "Discover the hottest fashion trends for spring 2025, from vibrant colors to sustainable materials.",
      image: "/src/images/1 (1).png",
      category: "trends",
      author: "Sophie Chen",
      date: "March 15, 2025",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to Style Your Workwear",
      excerpt: "Professional styling tips to help you look confident and fashionable in the workplace.",
      image: "/src/images/1 (2).png",
      category: "styling",
      author: "Emma Rodriguez",
      date: "March 12, 2025",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Sustainable Fashion: A Complete Guide",
      excerpt: "Learn about eco-friendly fashion choices and how to build a sustainable wardrobe.",
      image: "/src/images/1 (3).png",
      category: "sustainability",
      author: "Alex Thompson",
      date: "March 10, 2025",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Accessorizing 101: Bags and Jewelry",
      excerpt: "Master the art of accessorizing with our comprehensive guide to bags and jewelry.",
      image: "/src/images/1 (4).png",
      category: "accessories",
      author: "Maria Santos",
      date: "March 8, 2025",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Color Psychology in Fashion",
      excerpt: "Understand how colors affect your mood and perception, and choose your outfits accordingly.",
      image: "/src/images/1 (5).png",
      category: "psychology",
      author: "Dr. Lisa Wang",
      date: "March 5, 2025",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Building a Capsule Wardrobe",
      excerpt: "Create a versatile wardrobe with fewer pieces that work together seamlessly.",
      image: "/src/images/1 (6).png",
      category: "styling",
      author: "Jennifer Kim",
      date: "March 3, 2025",
      readTime: "9 min read"
    }
  ]

  const categories = ['all', 'trends', 'styling', 'sustainability', 'accessories', 'psychology']

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const handleReadMore = (postId) => {
    alert(`Reading blog post ${postId}. This would navigate to the full article.`)
  }

  return (
    <div className="blog-page">
      <div className="animated-background">
        <div className="floating-shape book-1"></div>
        <div className="floating-shape book-2"></div>
        <div className="floating-shape pen-1"></div>
        <div className="floating-shape ink-drop-1"></div>
        <div className="floating-shape ink-drop-2"></div>
        <div className="floating-shape paper-plane"></div>
      </div>
      <div className="page-header">
        <h1>Fashion Blog</h1>
        <p>Stay updated with the latest fashion trends, styling tips, and industry insights</p>
      </div>

      <div className="blog-container">
        <div className="blog-filters">
          <h3>Categories</h3>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Posts' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="featured-post">
          <div className="featured-content">
            <div className="featured-text">
              <span className="featured-label">Featured Article</span>
              <h2>The Future of Fashion: Trends to Watch</h2>
              <p>
                Explore the revolutionary changes coming to the fashion industry, from AI-powered 
                design to sustainable manufacturing. Discover how technology and environmental 
                consciousness are reshaping the way we think about style.
              </p>
              <button className="read-more-btn" onClick={() => handleReadMore('featured')}>
                Read Full Article
              </button>
            </div>
            <div className="featured-image">
              <img src="/src/images/1 (1).png" alt="Featured Article" />
            </div>
          </div>
        </div>

        <div className="blog-posts">
          <h2>Latest Articles</h2>
          <div className="posts-grid">
            {filteredPosts.map(post => (
              <article key={post.id} className="blog-post">
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                  <div className="post-category">{post.category}</div>
                </div>
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    <span className="post-author">By {post.author}</span>
                    <span className="post-date">{post.date}</span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>
                  <button 
                    className="read-more-btn"
                    onClick={() => handleReadMore(post.id)}
                  >
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="newsletter-signup">
          <h3>Stay Updated</h3>
          <p>Subscribe to our blog newsletter for the latest fashion insights delivered to your inbox.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
