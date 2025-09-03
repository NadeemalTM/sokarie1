import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductManagement from '../components/ProductManagement';
import AdminUsersManagement from '../components/AdminUsersManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalProducts: 156,
    totalOrders: 1243,
    totalCustomers: 892,
    totalRevenue: 45670.50,
    pendingOrders: 23,
    lowStock: 8
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem('adminSession');
    if (!session) {
      navigate('/admin/login');
      return;
    }
    
    try {
      const adminInfo = JSON.parse(session);
      setAdminData(adminInfo);
    } catch (error) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'products', label: 'Products', icon: '👗' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'admins', label: 'Admin Users', icon: '👤' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Sarah Johnson', total: 129.99, status: 'pending', date: '2025-09-03' },
    { id: '#ORD-002', customer: 'Mike Chen', total: 89.50, status: 'shipped', date: '2025-09-03' },
    { id: '#ORD-003', customer: 'Emma Davis', total: 199.99, status: 'delivered', date: '2025-09-02' },
    { id: '#ORD-004', customer: 'John Smith', total: 75.25, status: 'processing', date: '2025-09-02' },
    { id: '#ORD-005', customer: 'Lisa Wilson', total: 345.00, status: 'pending', date: '2025-09-01' }
  ];

  const topProducts = [
    { name: 'Floral Summer Dress', sales: 89, revenue: 5340.00, stock: 23 },
    { name: 'Casual Denim Jacket', sales: 67, revenue: 4020.00, stock: 15 },
    { name: 'Elegant Evening Gown', sales: 45, revenue: 8100.00, stock: 8 },
    { name: 'Comfy Knit Sweater', sales: 78, revenue: 3120.00, stock: 34 },
    { name: 'Professional Blazer', sales: 56, revenue: 6720.00, stock: 19 }
  ];

  if (!adminData) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Sokarie Admin</h2>
          <div className="admin-info">
            <div className="admin-avatar">
              {adminData.name.charAt(0)}
            </div>
            <div className="admin-details">
              <span className="admin-name">{adminData.name}</span>
              <span className="admin-role">{adminData.role.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="main-header">
          <h1>Dashboard Overview</h1>
          <div className="header-actions">
            <button className="action-btn">
              <span>📊</span>
              Export Report
            </button>
            <button className="action-btn primary">
              <span>➕</span>
              Add Product
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="dashboard-content">
            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon products">👗</div>
                <div className="stat-info">
                  <span className="stat-label">Total Products</span>
                  <span className="stat-value">{stats.totalProducts}</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon orders">📦</div>
                <div className="stat-info">
                  <span className="stat-label">Total Orders</span>
                  <span className="stat-value">{stats.totalOrders}</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon customers">👥</div>
                <div className="stat-info">
                  <span className="stat-label">Customers</span>
                  <span className="stat-value">{stats.totalCustomers}</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon revenue">💰</div>
                <div className="stat-info">
                  <span className="stat-label">Total Revenue</span>
                  <span className="stat-value">{formatCurrency(stats.totalRevenue)}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <div className="action-card warning">
                <div className="action-header">
                  <span className="action-icon">⚠️</span>
                  <span className="action-title">Pending Orders</span>
                </div>
                <div className="action-value">{stats.pendingOrders}</div>
                <button className="action-link">View All</button>
              </div>
              
              <div className="action-card danger">
                <div className="action-header">
                  <span className="action-icon">📉</span>
                  <span className="action-title">Low Stock Items</span>
                </div>
                <div className="action-value">{stats.lowStock}</div>
                <button className="action-link">Manage Stock</button>
              </div>
            </div>

            {/* Tables Grid */}
            <div className="tables-grid">
              {/* Recent Orders */}
              <div className="table-section">
                <div className="table-header">
                  <h3>Recent Orders</h3>
                  <button className="view-all-btn">View All</button>
                </div>
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(order => (
                        <tr key={order.id}>
                          <td className="order-id">{order.id}</td>
                          <td>{order.customer}</td>
                          <td className="amount">{formatCurrency(order.total)}</td>
                          <td>
                            <span className={`status-badge ${order.status}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Products */}
              <div className="table-section">
                <div className="table-header">
                  <h3>Top Products</h3>
                  <button className="view-all-btn">View All</button>
                </div>
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Sales</th>
                        <th>Revenue</th>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, index) => (
                        <tr key={index}>
                          <td className="product-name">{product.name}</td>
                          <td>{product.sales}</td>
                          <td className="amount">{formatCurrency(product.revenue)}</td>
                          <td>
                            <span className={`stock-level ${product.stock < 10 ? 'low' : 'normal'}`}>
                              {product.stock}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <ProductManagement />
        )}

        {activeTab === 'admins' && (
          <AdminUsersManagement />
        )}

        {['orders', 'customers', 'analytics', 'settings'].includes(activeTab) && (
          <div className="dashboard-content">
            <div className="coming-soon">
              <h2>{menuItems.find(item => item.id === activeTab)?.label}</h2>
              <p>This section is under development...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
