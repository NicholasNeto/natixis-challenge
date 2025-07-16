


import React from 'react';
import AppRouter from './router/AppRouter';
import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import { BrowserRouter } from 'react-router-dom';

import './App.css';


const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div className="app-container">
       <Navbar />
      <main className="main-content">
        <AppRouter />
      </main>
      <Footer />

    </div>
    </BrowserRouter>
  );
};

export default App;



