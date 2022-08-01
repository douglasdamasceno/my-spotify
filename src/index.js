import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import GrapApp from './page/graph';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GrapApp />
  </React.StrictMode>
);