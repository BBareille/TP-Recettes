import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useOutletContext} from "react-router";
import Nav from "../components/nav.jsx";
import {CredentialsContext} from "../src/main.jsx";
import {Link} from "react-router-dom";


export default function Recettes(){

    const [recettesList, setRecettesList] = useState()
    const {isConnected} = useContext(CredentialsContext)
    const [comments, setComments] = useState()

    console.log(comments)


    useEffect(()=>{
        axios.get("http://localhost:3000/recipes")
            .then(function (response) {
                setRecettesList(response.data)
            })
    },[])

    function addCommentary(){
        axios.get("http://localhost:3000/recipes/1").then(function(response){console.log(response.data)})
      //  axios.put("http://localhost:3000/recipes/1", {Comments :[comments]})
    }



    function getRecettesList(){
        return recettesList.map((item)=> {
            return (
                <div className="recettes">
                    <h1>{item.title}</h1>
                    <img src={item.image}/>
                    <p>Temps de préparation : {item.prepTime} mn</p>
                    <p>Temps de cuisson : {item.cookingTime} mn</p>
                    <h2>Rating: {item.rating} / 5</h2>
                    <p>Commentaire:</p>
                    <div className="comments">
                    <div>{item.Comments.map(item => item.text)}</div>
                    <div>écrit par <em>{item.Comments.map(item => item.userName)}</em></div>
                    </div>
                    <p>Votre commentaire :</p>
                    <textarea onChange={(ev) => setComments({text : ev.target.value})}></textarea>
                    <button onClick={addCommentary}>Envoyer</button>
                </div>
            )
        })
    }

    if(recettesList) {
        return (
            <div>
                <Nav/>
            <div className="body">
                <Link className="addNew" to="/newRecipes">Ajouter une nouvelle recette</Link>
                <div className="recettesList">{getRecettesList()}</div>
            </div>

            </div>
        )
    }
}