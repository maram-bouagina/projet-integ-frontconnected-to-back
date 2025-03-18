import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="erp-header">
      <div className="erp-header__container">
      <h1 className="erp-header__logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            ERP Manager
          </Link>
        </h1>
        <nav className="erp-header__nav">
          <button className="erp-header__nav-item" onClick={()=>navigate("/gerer-admin")}>Admins</button>
          <button className="erp-header__nav-item" onClick={()=>navigate("/fournisseurs")}>Fournisseurs</button>
          <button className="erp-header__nav-item" onClick={()=>navigate("/categories")}>Catégories</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;