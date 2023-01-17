import {Link} from "react-router-dom";
import {CredentialsContext} from "../src/main.jsx";
import {useContext} from "react";

export default function Nav(){

    const {isConnected, connectedAccount} = useContext(CredentialsContext)


    return(
        <nav>
            <img src="../src/assets/icons8-cook-64.png"/>
            <div className="link">
            <Link to={"/"}>Acceuil</Link>
            <Link to={"/ingredients"}>Les ingrédients</Link>
            <Link to={"/recettes"}>Les recettes</Link>
                {!isConnected?<Link to={"/login"}>Se connecter</Link>:<Link to={"/account"}>Mon compte {connectedAccount.charAt(0).toUpperCase()+connectedAccount.slice(1)}</Link>}
            </div>
        </nav>
    )
}