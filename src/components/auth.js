import React,{useState,useEffect,createContext,useContext} from "react";
const authcontext=createContext({
    id:'',
     motdepasse:'',
    email:'',
    login:()=>{},
    logout:()=>{}
})
export const AuthProvider=({children})=>{
    const [id,setId]=useState(localStorage.getItem("id")||"");
    const [motdepasse,setMotdepasse]=useState(localStorage.getItem("motdepasse")||"");
    const [email,setEmail]=useState(localStorage.getItem("email")||"");
    const [isloggedin,setIsloggedin]=useState(false);
    useEffect (()=>{
        const storageId=localStorage.getItem("id");
        const storageMotdepasse=localStorage.getItem("motdepasse");
        const storageEmail=localStorage.getItem("email");
        if(isloggedin){
            setId(storageId);
            setMotdepasse(storageMotdepasse);
            setEmail(storageEmail);
        }
    },[isloggedin]);
    const login=(id,motdepasse,email)=>{
            localStorage.setItem("id",id);
            localStorage.setItem("motdepasse",motdepasse);
            localStorage.setItem("email",email);
            setIsloggedin(true);
            console.log("auth state inside login fct", {id,motdepasse,email});
    }

    const logout = () => {
        setId("");
        setMotdepasse("");
        setEmail("");        
        localStorage.setItem("id",id);
        localStorage.setItem("motdepasse",motdepasse);
        localStorage.setItem("email",email);
        setIsloggedin(false);
      };

      return (
        <authcontext.Provider value={{ id,motdepasse,email, login, logout }}>
        {children}
      </authcontext.Provider>
    );}
    export const useAuth = () => {
        const context = useContext(authcontext);
        console.log("useAuth - Current Auth Context:", context); 
        return context; 

}