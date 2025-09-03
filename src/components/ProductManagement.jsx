import React, { useState, useEffect } from 'react';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Sample products data
  const sampleProducts = [
    {
      id: 1,
      name: 'Floral Summer Dress',
      category: 'dresses',
      price: 89.99,
      stock: 23,
      status: 'active',
      image: '/src/images/1 (1).png',
      description: 'Beautiful floral summer dress perfect for warm weather.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Red', 'Blue', 'Yellow'],
      createdAt: '2025-08-15'
    },
    {
      id: 2,
      name: 'Casual Denim Jacket',
      category: 'jackets',
      price: 79.50,
      stock: 15,
      status: 'active',
      image: '/src/images/1 (2).png',
      description: 'Classic denim jacket for casual everyday wear.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Black'],
      createdAt: '2025-08-10'
    },
    {
      id: 3,
      name: 'Elegant Evening Gown',
      category: 'dresses',
      price: 299.99,
      stock: 8,
      status: 'active',
      image: '/src/images/1 (3).png',
      description: 'Sophisticated evening gown for special occasions.',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Black', 'Navy', 'Burgundy'],
      createdAt: '2025-08-05'
    },
    {
      id: 4,
      name: 'Comfy Knit Sweater',
      category: 'sweaters',
      price: 59.99,
      stock: 34,
      status: 'active',
      image: '/src/images/1 (4).png',
      description: 'Soft and comfortable knit sweater for cool days.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Cream', 'Gray', 'Pink'],
      createdAt: '2025-07-28'
    },
    {
      id: 5,
      name: 'Professional Blazer',
      category: 'blazers',
      price: 149.99,
      stock: 19,
      status: 'active',
      image: '/src/images/1 (5).png',
      description: 'Professional blazer perfect for office wear.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Gray'],
      createdAt: '2025-07-20'
    },
    {
      id: 6,
      name: 'Vintage Style Skirt',
      category: 'skirts',
      price: 45.00,
      stock: 0,
      status: 'out_of_stock',
      image: '/src/images/1 (6).png',
      description: 'Retro-inspired vintage style skirt.',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Red', 'Black', 'Floral'],
      createdAt: '2025-07-15'
    }
  ];

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'dresses',
    price: '',
    stock: '',
    description: '',
    sizes: [],
    colors: [],
    image: ''
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'jackets', label: 'Jackets' },
    { value: 'sweaters', label: 'Sweaters' },
    { value: 'blazers', label: 'Blazers' },
    { value: 'skirts', label: 'Skirts' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Gray', 'Navy', 'Burgundy', 'Cream'];

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      id: Date.now(),
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    };
    
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      category: 'dresses',
      price: '',
      stock: '',
      description: '',
      sizes: [],
      colors: [],
      image: ''
    });
    setShowAddModal(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({...product, price: product.price.toString(), stock: product.stock.toString()});
    setShowAddModal(true);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...newProduct,
      id: editingProduct.id,
      createdAt: editingProduct.createdAt,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    };
    
    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setNewProduct({
      name: '',
      category: 'dresses',
      price: '',
      stock: '',
      description: '',
      sizes: [],
      colors: [],
      image: ''
    });
    setShowAddModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const toggleProductStatus = (id) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  const handleSizeChange = (size) => {
    const sizes = newProduct.sizes.includes(size)
      ? newProduct.sizes.filter(s => s !== size)
      : [...newProduct.sizes, size];
    setNewProduct({ ...newProduct, sizes });
  };

  const handleColorChange = (color) => {
    const colors = newProduct.colors.includes(color)
      ? newProduct.colors.filter(c => c !== color)
      : [...newProduct.colors, color];
    setNewProduct({ ...newProduct, colors });
  };

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === 'all' || product.category === filterCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'stock':
          return a.stock - b.stock;
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  const getStatusBadge = (status, stock) => {
    if (stock === 0) return { text: 'Out of Stock', class: 'out-of-stock' };
    if (stock < 10) return { text: 'Low Stock', class: 'low-stock' };
    if (status === 'active') return { text: 'Active', class: 'active' };
    return { text: 'Inactive', class: 'inactive' };
  };

  return (
    <div className="product-management">
      <div className="pm-header">
        <div className="pm-title">
          <h1>Product Management</h1>
          <p>Manage your product inventory and details</p>
        </div>
        <button 
          className="add-product-btn"
          onClick={() => setShowAddModal(true)}
        >
          <span>➕</span>
          Add New Product
        </button>
      </div>

      <div className="pm-filters">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="stock">Sort by Stock</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => {
          const status = getStatusBadge(product.status, product.stock);
          return (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => handleEditProduct(product)}
                    title="Edit Product"
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteProduct(product.id)}
                    title="Delete Product"
                  >
                    🗑️
                  </button>
                  <button 
                    className="action-btn toggle"
                    onClick={() => toggleProductStatus(product.id)}
                    title={`${product.status === 'active' ? 'Deactivate' : 'Activate'} Product`}
                  >
                    {product.status === 'active' ? '⏸️' : '▶️'}
                  </button>
                </div>
              </div>
              
              <div className="product-info">
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <span className={`status-badge ${status.class}`}>
                    {status.text}
                  </span>
                </div>
                
                <p className="product-category">
                  {categories.find(cat => cat.value === product.category)?.label}
                </p>
                
                <p className="product-description">
                  {product.description}
                </p>
                
                <div className="product-details">
                  <div className="detail-item">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value price">${product.price}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Stock:</span>
                    <span className={`detail-value stock ${product.stock < 10 ? 'low' : ''}`}>
                      {product.stock}
                    </span>
                  </div>
                </div>
                
                <div className="product-variants">
                  <div className="sizes">
                    <span className="variant-label">Sizes:</span>
                    <div className="variant-items">
                      {product.sizes.map(size => (
                        <span key={size} className="variant-item">{size}</span>
                      ))}
                    </div>
                  </div>
                  <div className="colors">
                    <span className="variant-label">Colors:</span>
                    <div className="variant-items">
                      {product.colors.map(color => (
                        <span key={color} className="variant-item color">{color}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try adjusting your search criteria or add a new product.</p>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button 
                className="close-modal"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                  setNewProduct({
                    name: '',
                    category: 'dresses',
                    price: '',
                    stock: '',
                    description: '',
                    sizes: [],
                    colors: [],
                    image: ''
                  });
                }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows="3"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="form-group">
                <label>Available Sizes</label>
                <div className="checkbox-group">
                  {availableSizes.map(size => (
                    <label key={size} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={newProduct.sizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label>Available Colors</label>
                <div className="checkbox-group">
                  {availableColors.map(color => (
                    <label key={color} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={newProduct.colors.includes(color)}
                        onChange={() => handleColorChange(color)}
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    setNewProduct({
                      name: '',
                      category: 'dresses',
                      price: '',
                      stock: '',
                      description: '',
                      sizes: [],
                      colors: [],
                      image: ''
                    });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
