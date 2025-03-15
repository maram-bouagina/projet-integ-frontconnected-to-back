import React, { useState } from 'react';
import './GererAdmin.css';

const GererAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({ id: '', nom: '', tel: '', 
    adresse: '' ,
    email:'',
    motdepasse:'' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAdmin.id) {
      setAdmins(admins.map(a => a.id === currentAdmin.id ? currentAdmin : a));
    } else {
      setAdmins([...admins, { ...currentAdmin, id: Date.now() }]);
    }
    setShowModal(false);
    setCurrentAdmin({   id: '', //bech l form yaarjaa vide
      nom: '', 
      tel: '', 
      adresse: '' ,
      email:'',
      motdepasse:'' });
  };

  return (
    <div className="gerer-admin__container">
      <div className="gerer-admin__header">
        <h2>Gestion des Admins</h2>
        <button className="action-button--primary" onClick={() => setShowModal(true)}>
          + Nouvel Admin
        </button>
      </div>

      <table className="gerer-admin__table">
        <thead>
          <tr>
          <th>Nom</th>
            <th>Tel</th>
            <th>Adresse</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
               <td>{admin.nom}</td>
              <td>{admin.tel}</td>
              <td>{admin.adresse}</td>
              <td>{admin.email}</td>
              <td>
                <button 
                  className="action-button--warning"
                  onClick={() => {
                    setCurrentAdmin(admin);
                    setShowModal(true);
                  }}
                >
                  ✏️ Modifier
                </button>
                <button 
                  className="action-button--danger"
                  onClick={() => setAdmins(admins.filter(a => a.id !== admin.id))}
                >
                  🗑️ Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="gerer-admin__modal-overlay">
          <div className="gerer-admin__modal-content">
            <h3>{currentAdmin.id ? 'Modifier' : 'Ajouter'} Admin</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  required
                  value={currentAdmin.nom}
                  onChange={(e) => setCurrentAdmin({...currentAdmin, nom: e.target.value})}
                />
              </div>
              <div className="form-group">
              <label>Tel</label>
                <input
                  type="number"
                  required
                  value={currentAdmin.tel}
                  onChange={(e) => setCurrentAdmin({...currentAdmin, tel: e.target.value})}
                />
              </div>
              <div className="form-group">
              <label>Adresse</label>
                <input
                  type="text"
                  required
                  value={currentAdmin.adresse}
                  onChange={(e) => setCurrentAdmin({...currentAdmin, adresse: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={currentAdmin.email}
                  onChange={(e) => setCurrentAdmin({...currentAdmin, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  required
                  value={currentAdmin.motdepasse}
                  onChange={(e) => setCurrentAdmin({...currentAdmin, motdepasse: e.target.value})}
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
                  {currentAdmin.id ? 'Enregistrer' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GererAdmin;