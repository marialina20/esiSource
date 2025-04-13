import React from 'react';
import { useNavigate } from 'react-router-dom';
import pub from '../images/pub.png'; // Import pub image
import etat from '../images/etat.png'; // Import etat image
import Navvbar from './Navvbar';


const UserHomeP = () => {
  const navigate = useNavigate();

  return (
    <div>
<Navvbar />
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '80px',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e6f0ff',
        padding: '20px'
      }}
    >
      {/* Button for "Publier un article" */}
      <div
        onClick={() => navigate('/publier')}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#b3d9ff',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img
          src={pub} // Use the imported pub image
          alt="Publier un article"
          style={{ width: '30px', height: '30px' }} // Adjust the size as needed
        />
        <p style={{ marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }}>
          + Publier
          <br />
          un article
        </p>
      </div>

      {/* Button for "Voir l'état des Publications" */}
      <div
        onClick={() => navigate('/etat-publications')}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#b3d9ff',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img
          src={etat} // Use the imported etat image
          alt="Voir l'état des Publications"
          style={{ width: '30px', height: '30px' }} // Adjust the size as needed
        />
        <p style={{ marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }}>
          Voir l’état
          <br />
          des Publications
        </p>
      </div>
    </div>
    </div>
  );
};

export default UserHomeP;
