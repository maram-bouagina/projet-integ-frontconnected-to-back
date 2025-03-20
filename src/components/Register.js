import React,{useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";
const Register= ()=>{
    const Navigate=useNavigate()
  const [currenClient, setCurrentClient] = useState({ 
    id: '', 
    nom: '', 
    tel: '', 
    adresse: '' ,
    email:'',
    motdepasse:'',
    role:'Client'
    
  });
  const [motdepasse2, setMotdepasse2] = useState('');
  const [err,setErr]=useState(false)
    const onBack= ()=>{
           Navigate("/login");
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
            if (currenClient.motdepasse!=motdepasse2){
                setErr(true);

            }
            else{
                setErr(false);
                axios.post(`http://localhost:8082/user`,currenClient).then(response=>console.log("ajout terminé : ",response.data))
                .catch(error => console.error("Ajout de client impossible: ", error));
                alert("Client inscris");
            }
        
            
        
    }
    return (
        <div className="main-register">
        <div className="form-container-register">
            <form onSubmit={handleSubmit}>
              <div className="form-group-register-client">
                <div>
                <button onClick={onBack}>Back</button></div>
                <label>Nom</label>
                <input
                  type="texnt"
                  required
                  value={currenClient.nom}
                  onChange={(e)=>setCurrentClient({... currenClient, nom : e.target.value})}
                />
              </div>
              <div className="form-group-register">
                <label>tel</label>
                <input
                  type="number"
                  required
                  value={currenClient.tel}
                  onChange={(e)=>setCurrentClient({... currenClient, tel : e.target.value})}
                />
              </div>
              <div className="form-group-ragister">
                <label>Adresse</label>
                <input
                required
                  type="text"
                  value={currenClient.adresse}
                  onChange={(e)=>setCurrentClient({... currenClient, adresse : e.target.value})}
                />
              </div>
              <div className="form-group-register">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={currenClient.email}
                  onChange={(e)=>setCurrentClient({... currenClient, email: e.target.value})}

                />
              </div>
              <div className="form-group-register">
                <label>mot de passe</label>
                <input
                  type="password"
                  required
                  value={currenClient.motdepasse}
                  onChange={(e)=>setCurrentClient({... currenClient, motdepasse: e.target.value})}
                />
              </div>
              <div className="form-group-register">
                <label>mot de passe</label>
                <input
                  type="password"
                  required
                  value={motdepasse2}
                  onChange={(e)=>setMotdepasse2(e.target.value)}
                />
              </div>
              <div className="modal-actions-register">
                <button type="submit" className="action-button--primary-register">
                    S'inscrire
                </button>
              </div>
              {err && <p className="error-message-register">les mots de passe ne correspondent pas</p>}
            </form>
          </div></div>
  
      )
    }

export default Register;