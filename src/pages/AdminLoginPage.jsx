import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Sample admin accounts
  const adminAccounts = [
    {
      email: 'admin@sokarie.com',
      password: 'admin123',
      role: 'super_admin',
      name: 'Super Admin'
    },
    {
      email: 'manager@sokarie.com',
      password: 'manager123',
      role: 'manager',
      name: 'Store Manager'
    },
    {
      email: 'editor@sokarie.com',
      password: 'editor123',
      role: 'editor',
      name: 'Product Editor'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const admin = adminAccounts.find(
        acc => acc.email === credentials.email && acc.password === credentials.password
      );

      if (admin) {
        // Store admin session
        localStorage.setItem('adminSession', JSON.stringify({
          ...admin,
          loginTime: new Date().toISOString()
        }));
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
      setLoading(false);
    }, 1000);
  };

  const fillSampleCredentials = (account) => {
    setCredentials({
      email: account.email,
      password: account.password
    });
    setError('');
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <h1>Sokarie</h1>
            <p>Admin Portal</p>
          </div>
        </div>

        <div className="login-form-container">
          <h2>Sign In to Admin Panel</h2>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="Enter your admin email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="demo-accounts">
            <h3>Demo Accounts</h3>
            <p>Click on any account below to auto-fill credentials:</p>
            
            <div className="demo-account-list">
              {adminAccounts.map((account, index) => (
                <div 
                  key={index}
                  className="demo-account"
                  onClick={() => fillSampleCredentials(account)}
                >
                  <div className="account-info">
                    <span className="account-name">{account.name}</span>
                    <span className="account-role">{account.role.replace('_', ' ')}</span>
                  </div>
                  <div className="account-credentials">
                    <span>{account.email}</span>
                    <span>{account.password}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="login-footer">
          <p>&copy; 2025 Sokarie Fashion. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
