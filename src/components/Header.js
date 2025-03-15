import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="erp-header">
      <div className="erp-header__container">
        <h1 className="erp-header__logo">ERP Manager</h1>
        <nav className="erp-header__nav">
          <button className="erp-header__nav-item">Admins</button>
          <button className="erp-header__nav-item">Fournisseurs</button>
          <button className="erp-header__nav-item">Catégories</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;