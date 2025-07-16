
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './styles/NavBar.css';


const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="top-bar">
        <NavLink to="/" className="navbar-brand">
          Product Catalog
        </NavLink>
        
        <div className="user-actions">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">Olá, {user?.name || 'Utilizador'}!</span>
              <button onClick={logout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="nav-button">
              Login
            </NavLink>
          )}
        </div>
      </div>

      {isAuthenticated && (
        <nav className="main-nav">
          <NavLink to="/produtos" className="nav-link">
            Produtos
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
