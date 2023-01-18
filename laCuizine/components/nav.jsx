import {Link} from "react-router-dom";
import {CredentialsContext} from "../src/main.jsx";
import {useContext} from "react";

export default function Nav(){

    const {isConnected, connectedAccount, setIsRegistered} = useContext(CredentialsContext)


    return(
        <nav>
            <img src="../src/assets/icons8-cook-64.png"/>
            <div className="link">
            <Link to={"/"}>Acceuil</Link>
            <Link to={"/ingredients"}>Les ingrédients</Link>
            <Link to={"/recettes"}>Les recettes</Link>
                {!isConnected?<Link onClick={() => setIsRegistered(true)} to={"/login"}>Se connecter</Link>:<Link to={"/account"}>Mon compte {connectedAccount.map((item)=> item.userName).toString()}</Link>}
            </div>
        </nav>
    )
}