import React, { useState, useEffect } from 'react';
import './AdminUsersManagement.css';

const AdminUsersManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [currentUser, setCurrentUser] = useState(null);

  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor',
    status: 'active',
    permissions: []
  });

  // Sample admin users
  const sampleAdmins = [
    {
      id: 1,
      name: 'Super Admin',
      email: 'admin@sokarie.com',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2025-09-03T10:30:00Z',
      createdAt: '2025-01-15T08:00:00Z',
      permissions: ['all']
    },
    {
      id: 2,
      name: 'Store Manager',
      email: 'manager@sokarie.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2025-09-02T16:45:00Z',
      createdAt: '2025-02-20T09:15:00Z',
      permissions: ['products', 'orders', 'customers', 'analytics']
    },
    {
      id: 3,
      name: 'Product Editor',
      email: 'editor@sokarie.com',
      role: 'editor',
      status: 'active',
      lastLogin: '2025-09-01T14:20:00Z',
      createdAt: '2025-03-10T11:30:00Z',
      permissions: ['products']
    },
    {
      id: 4,
      name: 'Marketing Assistant',
      email: 'marketing@sokarie.com',
      role: 'marketing',
      status: 'inactive',
      lastLogin: '2025-08-28T12:00:00Z',
      createdAt: '2025-04-05T13:45:00Z',
      permissions: ['analytics', 'customers']
    },
    {
      id: 5,
      name: 'Customer Support',
      email: 'support@sokarie.com',
      role: 'support',
      status: 'active',
      lastLogin: '2025-09-03T09:15:00Z',
      createdAt: '2025-05-12T10:20:00Z',
      permissions: ['orders', 'customers']
    }
  ];

  const roles = [
    { value: 'super_admin', label: 'Super Admin', color: '#dc2626' },
    { value: 'manager', label: 'Manager', color: '#ea580c' },
    { value: 'editor', label: 'Editor', color: '#0ea5e9' },
    { value: 'marketing', label: 'Marketing', color: '#7c3aed' },
    { value: 'support', label: 'Support', color: '#059669' }
  ];

  const availablePermissions = [
    { id: 'products', label: 'Product Management', description: 'Add, edit, and delete products' },
    { id: 'orders', label: 'Order Management', description: 'View and manage customer orders' },
    { id: 'customers', label: 'Customer Management', description: 'View and manage customer data' },
    { id: 'analytics', label: 'Analytics & Reports', description: 'Access analytics and generate reports' },
    { id: 'settings', label: 'System Settings', description: 'Modify system configurations' },
    { id: 'admins', label: 'Admin Management', description: 'Manage admin users and permissions' }
  ];

  useEffect(() => {
    setAdmins(sampleAdmins);
    
    // Get current user from session
    const session = localStorage.getItem('adminSession');
    if (session) {
      const user = JSON.parse(session);
      setCurrentUser(user);
    }
  }, []);

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const admin = {
      ...newAdmin,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      lastLogin: null
    };
    
    setAdmins([...admins, admin]);
    resetForm();
    setShowAddModal(false);
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setNewAdmin({
      name: admin.name,
      email: admin.email,
      password: '',
      role: admin.role,
      status: admin.status,
      permissions: admin.permissions
    });
    setShowAddModal(true);
  };

  const handleUpdateAdmin = (e) => {
    e.preventDefault();
    const updatedAdmin = {
      ...editingAdmin,
      ...newAdmin,
      password: newAdmin.password || editingAdmin.password
    };
    
    setAdmins(admins.map(a => a.id === editingAdmin.id ? updatedAdmin : a));
    resetForm();
    setEditingAdmin(null);
    setShowAddModal(false);
  };

  const handleDeleteAdmin = (id) => {
    const admin = admins.find(a => a.id === id);
    if (admin && admin.role === 'super_admin') {
      alert('Super Admin account cannot be deleted.');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this admin user?')) {
      setAdmins(admins.filter(a => a.id !== id));
    }
  };

  const toggleAdminStatus = (id) => {
    const admin = admins.find(a => a.id === id);
    if (admin && admin.role === 'super_admin') {
      alert('Super Admin account cannot be deactivated.');
      return;
    }
    
    setAdmins(admins.map(a => 
      a.id === id 
        ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' }
        : a
    ));
  };

  const handlePermissionChange = (permissionId) => {
    const permissions = newAdmin.permissions.includes(permissionId)
      ? newAdmin.permissions.filter(p => p !== permissionId)
      : [...newAdmin.permissions, permissionId];
    setNewAdmin({ ...newAdmin, permissions });
  };

  const resetForm = () => {
    setNewAdmin({
      name: '',
      email: '',
      password: '',
      role: 'editor',
      status: 'active',
      permissions: []
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleInfo = (role) => {
    return roles.find(r => r.value === role) || { label: role, color: '#64748b' };
  };

  const filteredAdmins = admins
    .filter(admin => 
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(admin => filterRole === 'all' || admin.role === filterRole);

  const canManageAdmin = (admin) => {
    if (!currentUser) return false;
    if (currentUser.role === 'super_admin') return true;
    if (admin.role === 'super_admin') return false;
    return currentUser.role === 'manager' && admin.role !== 'manager';
  };

  return (
    <div className="admin-users-management">
      <div className="aum-header">
        <div className="aum-title">
          <h1>Admin Users Management</h1>
          <p>Manage admin users, roles, and permissions</p>
        </div>
        {currentUser && (currentUser.role === 'super_admin' || currentUser.role === 'manager') && (
          <button 
            className="add-admin-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span>👤➕</span>
            Add New Admin
          </button>
        )}
      </div>

      <div className="aum-filters">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Roles</option>
          {roles.map(role => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </div>

      <div className="admins-grid">
        {filteredAdmins.map(admin => {
          const roleInfo = getRoleInfo(admin.role);
          const canManage = canManageAdmin(admin);
          
          return (
            <div key={admin.id} className={`admin-card ${admin.status}`}>
              <div className="admin-header">
                <div className="admin-avatar">
                  <span>{admin.name.charAt(0)}</span>
                  <div className={`status-indicator ${admin.status}`}></div>
                </div>
                <div className="admin-info">
                  <h3 className="admin-name">{admin.name}</h3>
                  <p className="admin-email">{admin.email}</p>
                  <span 
                    className="role-badge"
                    style={{ backgroundColor: roleInfo.color + '20', color: roleInfo.color }}
                  >
                    {roleInfo.label}
                  </span>
                </div>
                {canManage && (
                  <div className="admin-actions">
                    <button 
                      className="action-btn edit"
                      onClick={() => handleEditAdmin(admin)}
                      title="Edit Admin"
                    >
                      ✏️
                    </button>
                    <button 
                      className="action-btn toggle"
                      onClick={() => toggleAdminStatus(admin.id)}
                      title={`${admin.status === 'active' ? 'Deactivate' : 'Activate'} Admin`}
                    >
                      {admin.status === 'active' ? '⏸️' : '▶️'}
                    </button>
                    {admin.role !== 'super_admin' && (
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDeleteAdmin(admin.id)}
                        title="Delete Admin"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="admin-details">
                <div className="detail-row">
                  <span className="detail-label">Last Login:</span>
                  <span className="detail-value">{formatDate(admin.lastLogin)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">{formatDate(admin.createdAt)}</span>
                </div>
              </div>

              <div className="permissions-section">
                <h4>Permissions</h4>
                <div className="permissions-list">
                  {admin.permissions.includes('all') ? (
                    <span className="permission-item all">All Permissions</span>
                  ) : (
                    admin.permissions.map(permission => {
                      const permInfo = availablePermissions.find(p => p.id === permission);
                      return (
                        <span key={permission} className="permission-item">
                          {permInfo?.label || permission}
                        </span>
                      );
                    })
                  )}
                  {admin.permissions.length === 0 && (
                    <span className="permission-item none">No permissions assigned</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAdmins.length === 0 && (
        <div className="no-admins">
          <h3>No admin users found</h3>
          <p>Try adjusting your search criteria or add a new admin user.</p>
        </div>
      )}

      {/* Add/Edit Admin Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingAdmin ? 'Edit Admin User' : 'Add New Admin User'}</h2>
              <button 
                className="close-modal"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingAdmin(null);
                  resetForm();
                }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={editingAdmin ? handleUpdateAdmin : handleAddAdmin}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>{editingAdmin ? 'New Password (leave empty to keep current)' : 'Password'}</label>
                  <input
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    required={!editingAdmin}
                    minLength="6"
                  />
                </div>
                
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={newAdmin.role}
                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                    disabled={editingAdmin && editingAdmin.role === 'super_admin'}
                  >
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <div className="radio-group">
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={newAdmin.status === 'active'}
                      onChange={(e) => setNewAdmin({ ...newAdmin, status: e.target.value })}
                    />
                    <span>Active</span>
                  </label>
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={newAdmin.status === 'inactive'}
                      onChange={(e) => setNewAdmin({ ...newAdmin, status: e.target.value })}
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>
              
              {newAdmin.role !== 'super_admin' && (
                <div className="form-group">
                  <label>Permissions</label>
                  <div className="permissions-grid">
                    {availablePermissions.map(permission => (
                      <label key={permission.id} className="permission-checkbox">
                        <input
                          type="checkbox"
                          checked={newAdmin.permissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
                        />
                        <div className="permission-info">
                          <span className="permission-label">{permission.label}</span>
                          <span className="permission-description">{permission.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingAdmin(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingAdmin ? 'Update Admin' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersManagement;
