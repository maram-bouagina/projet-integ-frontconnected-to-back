import React, { useState, useEffect } from 'react';
import './GererFournisseur.css';
import axios from "axios";

const GererFournisseur = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFournisseur, setCurrentFournisseur] = useState({ 
    id: '', 
    nom: '', 
    tel: '', 
    adresse: '' ,
    email:'',
    motdepasse:'',
    role:'fournisseur'
  });
   useEffect (()=>{
        axios.get(`http://localhost:8082/users`)
        .then(response=> setFournisseurs((response.data).filter(f => f.role =="fournisseur")))
       .catch(error=>console.error("impossible de retrouver les fournisseurs: ",error))
   },[]);
   
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentFournisseur.id) {// idhe ken currentFournisseur has an id -> id is not empty tsir update
      axios.put(`http://localhost:8082/user/${currentFournisseur.id}`,currentFournisseur)
      .then(response=>{setFournisseurs(fournisseurs.map(f => 
        f.id===currentFournisseur.id? response.data :f // f tekhou l valeur mtaa  currentfournisseur ki yil9ah bl id mi tableau makenchi yo93d houwa
      ))
      resetForm();
    })
      .catch(error=>console.error("modification impossible du fournisseur choisi: ",error))
    }
    
    else {
      axios.post(`http://localhost:8082/user`,currentFournisseur)
      .then(response=>{
        setFournisseurs([...fournisseurs, { // this adds a provider to the array list if current fournisseur is empty lil ajout 
          ...response.data, 
        }]);resetForm();

      }).catch(error=>console.error("Ajout de fournisseur impossible: ", error))
      
    }
    
  };

  const resetForm=()=>{
    setShowModal(false);
    setCurrentFournisseur({   id: '', //bech l form yaarjaa vide
      nom: '', 
      tel: '', 
      adresse: '' ,
      email:'',
      motdepasse:'' });
  }
  const handleDelete=(id)=>{
    axios.delete((`http://localhost:8082/user/${id}`))
    .then(()=>{setFournisseurs(fournisseurs.filter(f => f.id !== id))}).catch(error=>console.error("Supression impossible", error))
  }

  return (
    <div className="gerer-fournisseur__container">
      <div className="gerer-fournisseur__header">
        <h2>Gestion des Fournisseurs</h2>
        <button 
          className="action-button--primary"
          onClick={() => setShowModal(true)}
        >
          + Nouveau Fournisseur
        </button>
      </div>

      <table className="gerer-fournisseur__table">
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
          {fournisseurs.map(fournisseur => (
            <tr key={fournisseur.id}>
              <td>{fournisseur.nom}</td>
              <td>{fournisseur.tel}</td>
              <td>{fournisseur.adresse}</td>
              <td>{fournisseur.email}</td>
              <td>
                <button
                  className="action-button--warning"
                  onClick={() => {
                    setCurrentFournisseur(fournisseur);
                    setShowModal(true);
                  }}
                >
                  ✏️ Modifier
                </button>
                <button
                  className="action-button--danger"
                   onClick={() => handleDelete(fournisseur.id)}
                >
                  🗑️ Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="gerer-fournisseur__modal-overlay">
          <div className="gerer-fournisseur__modal-content">
            <h3>{currentFournisseur.id ? 'Modifier' : 'Ajouter'} Fournisseur</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  required
                  value={currentFournisseur.nom}
                  onChange={(e) => setCurrentFournisseur({...currentFournisseur, nom: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>tel</label>
                <input
                  type="number"
                  required
                  value={currentFournisseur.tel}
                  onChange={(e) => setCurrentFournisseur({...currentFournisseur, tel: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <input
                  type="text"
                  required
                  value={currentFournisseur.adresse}
                  onChange={(e) => setCurrentFournisseur({...currentFournisseur, adresse: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={currentFournisseur.email}
                  onChange={(e) => setCurrentFournisseur({...currentFournisseur, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>mot de passe</label>
                <input
                  type="password"
                  required
                  value={currentFournisseur.motdepasse}
                  onChange={(e) => setCurrentFournisseur({...currentFournisseur, motdepasse: e.target.value})}
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
                  {currentFournisseur.id ? 'Enregistrer' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GererFournisseur;