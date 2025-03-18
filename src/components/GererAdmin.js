import React, { useState } from 'react';
import './GererAdmin.css';

const GererAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({ id: '', nom: '', tel: '', 
    adresse: '' ,
    email:'',
    motdepasse:'' });

   useEffect (()=>{
           axios.get(`http://localhost:8081/users`)
           .then(response=> setFournisseurs(response.data))
          .catch(error=>console.error("impossible de retrouver les admins: ",error))
      },[]); 


  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAdmin.id) {
      axios.put(`http://localhost:8081/user/${currentAdmin.id}`,currentAdmin)
        .then(response=>{setAdmin(admins.map(a => 
          a.id===currentAdmin.id? response.data :a 
        ))
        resetForm();
      })
        .catch(error=>console.error("modification impossible de l'admin choisi: ",error))

    } else {
      axios.post(`http://localhost:8081/user`,currentAdmin)
      .then(response=>{
        setAdmin([...admins, { 
          ...response.data, 
        }]);resetForm();

      }).catch(error=>console.error("Ajout de l' admin impossible: ", error))
      
    }
  };
  const resetForm=()=>{
    setShowModal(false);
    setCurrentAdmin({   id: '', //bech l form yaarjaa vide
      nom: '', 
      tel: '', 
      adresse: '' ,
      email:'',
      motdepasse:'' });
  }
  const handleDelete=(id)=>{
    axios.delete((`http://localhost:8081/user/${id}`))
    .then(()=>{setAdmins(admins.filter(a => a.id !== id))}).catch(error=>console.error("Supression impossible", error))
  }


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