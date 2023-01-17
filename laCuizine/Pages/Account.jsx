import {CredentialsContext} from "../src/main.jsx";
import {useContext} from "react";
import Nav from "../components/nav.jsx";
export default function Account(){

    const {isConnected, connectedAccount, userList} = useContext(CredentialsContext)

    return(
        <div>
            <Nav/>
            <div>Nom du compte : {connectedAccount}</div>
            <div>Email : {connectedAccount}</div>

        </div>
    )
}