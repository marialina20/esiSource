import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../images/Logo.png';

const Navvbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSeDeconnecter = () => {
    navigate('/LoginP');
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
        padding: '10px 40px',
        zIndex: 1000,
      }}
    >
      <img
        style={{ height: '32px', marginRight: '40px' }}
        src={Logo}
        alt="Logo"
      />
  
      {/* Right-aligned nav buttons */}
      <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
        <button
          onClick={() => handleNavigate('/homeP')}
          style={navButtonStyle('/homeP')}
          onMouseEnter={(e) => (e.target.style.fontWeight = 'bold')}
          onMouseLeave={(e) => (e.target.style.fontWeight = isActive('/homeP') ? 'bold' : 'normal')}
        >
          Accueil
        </button>
  
        <button
          onClick={() => handleNavigate('/about')}
          style={navButtonStyle('/about')}
          onMouseEnter={(e) => (e.target.style.fontWeight = 'bold')}
          onMouseLeave={(e) => (e.target.style.fontWeight = isActive('/about') ? 'bold' : 'normal')}
        >
          About Us
        </button>
  
        <button
          onClick={() => handleNavigate('/contact')}
          style={navButtonStyle('/contact')}
          onMouseEnter={(e) => (e.target.style.fontWeight = 'bold')}
          onMouseLeave={(e) => (e.target.style.fontWeight = isActive('/contact') ? 'bold' : 'normal')}
        >
          Contact Us
        </button>
  
        <button
         style={{
            padding: '8px 16px',
            marginRight : '80px',
            backgroundColor: '#ffff',
            borderRadius: '5px',
            border: '1px solid #0E00AF',
            boxShadow: '0px 2px 2px rgba(14, 0, 175, 0.7)',
         
            cursor: 'pointer',
          }}
          onClick={handleSeDeconnecter}
        >
          Sign out
        </button>
      </div>
    </div>
  );
  
};

export default Navvbar;
