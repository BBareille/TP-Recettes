import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Nav from "./nav.jsx";
import {Link} from "react-router-dom";
import {CredentialsContext} from "../src/main.jsx";

export default function Form(){

    const {isConnected, setIsConnected, userList, setConnectedAccount, isRegistered, setIsRegistered} = useContext(CredentialsContext)


    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [mail, setMail] = useState()
    let wrongCredentials = false


    function verifyUser(username, password){
        return userList.filter((item)=> {
            if(username == item.userName && password == item.pwd){
                setIsConnected(true)
                setConnectedAccount([
                    {userName: item.userName,
                        userId :item.id
                    }])
            } else{
                wrongCredentials = true
            }
        })

    }
    function changeHandler(ev){
        if(ev.target.name == "username") {
            setUsername(ev.target.value)
        } else if(ev.target.name == "password"){
            setPassword(ev.target.value)
        } else if(ev.target.name == "mail"){
            setMail(ev.target.value)
        }

    }
    function submitHandler(ev){
        ev.preventDefault()
        verifyUser(username, password)
    }

    function createAccount(ev){
        ev.preventDefault()
        axios.post("http://localhost:3000/users", {
            userName : username,
            email : mail,
            pwd : password,
            role: "author"
        })
    }

    return(
        <div>
            <Nav />
            {isRegistered?
                <form onSubmit={submitHandler}>
                    <h2>Connexion</h2>
                    <div>
                    {wrongCredentials?"":"Nom d'utilisateur inconnu ou mauvais mot de passe"}
                    </div>
                    <input placeholder="Nom d'utilisateur" name="username" onChange={changeHandler}/>
                    <input placeholder="Mot de passe" name="password" onChange={changeHandler} type="password"/>
                    <button>Valider</button>
                    <div>{isConnected?"Authentification r??ussi": ""}</div>
                    <div>Pas encore de compte ?
                        <Link onClick={()=> setIsRegistered(false)} to={"/register"}><em> S'inscrire ici</em></Link>
                    </div>
            </form>:
            <form onSubmit={createAccount}>
                <h2>Cr??ation d'un compte</h2>
                <input placeholder="Email" name="mail" onChange={changeHandler}/>
                <input placeholder="Nom d'utilisateur" name="username" onChange={changeHandler}/>
                <input placeholder="Mot de passe" name="password" onChange={changeHandler} type="password"/>
                <button>Valider</button>
            </form>
            }
        </div>
            )
}