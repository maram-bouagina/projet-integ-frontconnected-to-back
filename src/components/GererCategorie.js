import React, { useState } from 'react';
import './GererCategorie.css';

const GererCategorie = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategorie, setCurrentCategorie] = useState({ 
    id: '', 
    nom: '', 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCategorie.id) {
      setCategories(categories.map(c => 
        c.id === currentCategorie.id ? currentCategorie : c
      ));
    } else {
      setCategories([...categories, { 
        ...currentCategorie, 
        id: Date.now() 
      }]);
    }
    setShowModal(false);
    setCurrentCategorie({ id: '', nom: ''});
  };

  return (
    <div className="gerer-categorie__container">
      <div className="gerer-categorie__header">
        <h2>Gestion des Catégories</h2>
        <button 
          className="action-button--primary"
          onClick={() => setShowModal(true)}
        >
          + Nouvelle Catégorie
        </button>
      </div>

      <table className="gerer-categorie__table">
        <thead>
          <tr>
            <th colspan="2">Nom</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(categorie => (
            <tr key={categorie.id}>
              <td>{categorie.nom}</td>
              <td>
                <button
                  className="action-button--warning"
                  onClick={() => {
                    setCurrentCategorie(categorie);
                    setShowModal(true);
                  }}
                >
                  ✏️ Modifier
                </button>
                <button
                  className="action-button--danger"
                  onClick={() => setCategories(categories.filter(c => c.id !== categorie.id))}
                >
                  🗑️ Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="gerer-categorie__modal-overlay">
          <div className="gerer-categorie__modal-content">
            <h3>{currentCategorie.id ? 'Modifier' : 'Ajouter'} Catégorie</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  required
                  value={currentCategorie.nom}
                  onChange={(e) => setCurrentCategorie({...currentCategorie, nom: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="action-button--secondary"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="action-button--primary">
                  {currentCategorie.id ? 'Enregistrer' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GererCategorie;