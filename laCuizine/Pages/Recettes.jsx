import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useOutletContext} from "react-router";
import Nav from "../components/nav.jsx";
import {CredentialsContext} from "../src/main.jsx";
import {Link} from "react-router-dom";


export default function Recettes(){

    const [recettesList, setRecettesList] = useState()
    const {isConnected} = useContext(CredentialsContext)


    useEffect(()=>{
        axios.get("http://localhost:3000/recipes")
            .then(function (response) {
                setRecettesList(response.data)
            })
    },[])

    function getRecettesList(){
        return recettesList.map((item)=> {
            return (
                <div className="recettes">
                    <h1>{item.title}</h1>
                    <img src={item.image}/>
                    <h2>Rating: {item.rating} / 5</h2>
                </div>
            )
        })
    }

    if(recettesList) {
        return (
            <div>
                <Nav/>
            <div>
                <div>{getRecettesList()}</div>
                <Link to="/newRecipes">Ajouter nouvelle recette</Link>
            </div>
            </div>
        )
    }
}