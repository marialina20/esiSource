import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import NavvbarAdminHome from './NavvbarHomeAdmin';
import Navvbartwo from './Navvbartwo';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        console.log('Token from storage:', token); // Debug log
        
        if (!token) {
          console.log('No token found, redirecting to login');
          navigate('/LoginP', { replace: true });
          return;
        }

        // Verify token is valid by making a test request
        try {
          const testResponse = await axios.get('http://localhost:8000/users/me/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('Token validation response:', testResponse.data); // Debug log
        } catch (testError) {
          console.log('Token validation failed:', testError);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/LoginP', { replace: true });
          return;
        }

        // Main data request
        const response = await axios.get('http://localhost:8000/api/stats/publications/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Dashboard data response:', response.data); // Debug log
        setDashboardData(response.data);
      } catch (err) {
        console.error('Dashboard error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/LoginP', { replace: true });
        } else {
          setError(err.message || 'Failed to load dashboard data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);
  
  // Calculate circle percentages
  const total = dashboardData?.totalPublications || 0;
  const darkBlue = total * 0.5;
  const blue = total * 0.3;
  const white = total - darkBlue - blue;

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading dashboard...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '40px' }}>Error: {error}</div>;
  if (!dashboardData) return <div style={{ textAlign: 'center', padding: '40px' }}>No data available</div>;

  return (
    <div style={{ backgroundColor: '#E4F1FF', minHeight: '100vh' }}>
      <Navvbartwo />
      <div style={{ paddingTop: '80px', textAlign: 'center', fontWeight: '700', fontSize: '24px', color: '#002366' }}>
        Bienvenue sur Votre DASHBOARD
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', gap: '60px', flexWrap: 'wrap' }}>
        {/* Left Block */}
        <div style={{ backgroundColor: '#B0D4FD', borderRadius: '20px', padding: '30px', display: 'flex', gap: '30px', alignItems: 'center' }}>
          {/* Circle */}
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="20" fill="none" />
            <circle cx="100" cy="100" r="90" stroke="#002366" strokeWidth="20" fill="none"
              strokeDasharray="220 220" strokeDashoffset="0" strokeLinecap="butt"
              transform="rotate(-90 100 100)" />
            <circle cx="100" cy="100" r="90" stroke="#0979D0" strokeWidth="20" fill="none"
              strokeDasharray={`${blue} ${total - blue}`} strokeDashoffset="-220"
              strokeLinecap="butt" transform="rotate(-90 100 100)" />
            <text x="100" y="105" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#000">
              {dashboardData.totalPublications}
            </text>
            <text x="100" y="130" textAnchor="middle" fontSize="14" fill="#002366">
              Total de publications
            </text>
          </svg>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
            <div style={cardStyle}>
              <div style={numberStyle}>{dashboardData.Publications}</div>
              <div>Publications</div>
            </div>
            <div style={cardStyle}>
              <div style={numberStyle}>{dashboardData.medias}</div>
              <div>Medias</div>
            </div>
            <div style={cardStyle}>
              <div style={numberStyle}>{dashboardData.users}</div>
              <div>Utilisateurs</div>
            </div>
          </div>
        </div>

        {/* Right Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
          <div style={sideCardStyle}>
            <div style={numberStyle}>{dashboardData.refusées}</div>
            <div>Publications refusées</div>
          </div>
          <div style={sideCardStyle}>
            <div style={numberStyle}>{dashboardData.en_attente}</div>
            <div>Publications en attente</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Keep your existing style definitions
const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '10px 14px',
  width: '100px',
  fontWeight: '600',
  fontSize: '13px',
  color: '#002366',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const sideCardStyle = {
  backgroundColor: '#B0D4FD',
  borderRadius: '15px',
  padding: '20px',
  width: '180px',
  textAlign: 'center',
  fontWeight: '600',
  color: '#002366',
  fontSize: '14px',
};

const numberStyle = {
  fontSize: '22px',
  fontWeight: 'bold',
};

export default DashboardPage;