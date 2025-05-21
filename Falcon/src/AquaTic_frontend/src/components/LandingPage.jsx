// src/components/LandingPage.jsx
import React from 'react';
import { ConnectButton, ConnectDialog, useConnect } from '@connect2ic/react';
import '@connect2ic/core/style.css';
import logo from '/2NovaPal.png';

const LandingPage = ({ onEnter }) => {
  const { isConnected } = useConnect();

  return (
    <div className="landing-page container text-center">
      <img src={logo} alt="NovaPal" className="logo" />
      <h1>Bienvenidos a FALCON</h1>
      <p>Monitoriza y gestiona datos eficientemente</p>
      <div className="d-flex justify-content-center">
        <ConnectButton className="btn btn-primary mt-3" />
      </div>
      {isConnected && (
        <button className="btn btn-success mt-3" onClick={onEnter}>
          Acceder
        </button>
      )}
      <ConnectDialog />
    </div>
  );
};

export default LandingPage;