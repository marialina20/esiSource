import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../images/Logo.png';

const NavvbarAdminHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    // Verify token before navigation
    const token = localStorage.getItem('access_token');
    if (!token) {
      // Store the intended path to redirect after login
      navigate('/LoginP', { state: { from: location }, replace: true });
      return;
    }
    navigate(path);
  };

  const handleSeDeconnecter = () => {
    // Clear authentication tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
    
    // Redirect to login and prevent back navigation
    navigate('/login', { replace: true });
  };

  const navButtonStyle = (path) => ({
    marginRight: '30px',
    padding: '10px',
    color: '#4D4D4D',
    fontWeight: isActive(path) ? 'bold' : 'normal',
    border: 'none',
    backgroundColor: '#ffff',
    cursor: 'pointer',
    borderBottom: isActive(path) ? '3px solid #4D4D4D' : 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      fontWeight: 'bold'
    }
  });

  return (
    <div
      style={{
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffff',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'fixed',
        top: 0, 
        left: 0,
        padding: '12px 40px',
        zIndex: 1000,
      }}
    >
      <img
        style={{ height: '32px', marginRight: '40px', cursor: 'pointer' }}
        src={Logo}
        alt="Logo"
        onClick={() => handleNavigation('/home')}
      />
  
      {/* Right-aligned nav buttons */}
      <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
        <button
          onClick={() => handleNavigation('/HomePage')}
          style={navButtonStyle('/home')}
          onMouseEnter={(e) => (e.target.style.fontWeight = 'bold')}
          onMouseLeave={(e) => (e.target.style.fontWeight = isActive('/home') ? 'bold' : 'normal')}
        >
          Home
        </button>
  
        <button
          onClick={() => handleNavigation('/admin/manage-users')}
          style={navButtonStyle('/Manage')}
          onMouseEnter={(e) => (e.target.style.fontWeight = 'bold')}
          onMouseLeave={(e) => (e.target.style.fontWeight = isActive('/admin/manage-users') ? 'bold' : 'normal')}
        >
          Manage users
        </button>
  
        <button
          onClick={() => handleNavigation('/Dashboard')}
          style={navButtonStyle('/Dashboard')}
          onMouseEnter={(e) => (e.target.style.fontWeight = 'bold')}
          onMouseLeave={(e) => (e.target.style.fontWeight = isActive('/Dashboard') ? 'bold' : 'normal')}
        >
          Dashboards
        </button>
  
        <button
          style={{
            padding: '8px 16px',
            marginRight: '80px',
            backgroundColor: '#ffff',
            borderRadius: '5px',
            border: '1px solid #0E00AF',
            boxShadow: '0px 2px 2px rgba(14, 0, 175, 0.7)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#f0f0f0'
            }
          }}
          onClick={handleSeDeconnecter}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffff')}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default NavvbarAdminHome;