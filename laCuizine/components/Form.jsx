import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Nav from "./nav.jsx";
import {Link} from "react-router-dom";
import {CredentialsContext} from "../src/main.jsx";

export default function Form(props){

    const {isConnected, setIsConnected, userList, setUserList, connectedAccount, setConnectedAccount} = useContext(CredentialsContext)


    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [mail, setMail] = useState()


    function verifyUser(username, password){
        return userList.filter((item)=> {
            if(username == item.userName && password == item.pwd){
                setIsConnected(true)
                setConnectedAccount(item.userName)
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

            {props.registered?
                <form onSubmit={submitHandler}>
                    <h2>Connexion</h2>
                    <input placeholder="Nom d'utilisateur" name="username" onChange={changeHandler}/>
                    <input placeholder="Mot de passe" name="password" onChange={changeHandler} type="password"/>
                    <button>Valider</button>
                    <div>{isConnected?"Authentification réussi": ""}</div>
                    <div>Pas encore de compte ?
                        <Link to={"/register"}><em> S'inscrire ici</em></Link>
                    </div>
            </form>:
            <form onSubmit={createAccount}>
                <h2>Création d'un compte</h2>
                <input placeholder="Email" name="mail" onChange={changeHandler}/>
                <input placeholder="Nom d'utilisateur" name="username" onChange={changeHandler}/>
                <input placeholder="Mot de passe" name="password" onChange={changeHandler} type="password"/>
                <button>Valider</button>
            </form>
            }
        </div>
            )
}