import Nav from "./nav.jsx";
import {useContext, useState} from "react";
import {CredentialsContext} from "../src/main.jsx";
import axios from "axios";

export default function NewRecipeForm(){

    const {connectedAccount, ingredientsList, themeList} = useContext(CredentialsContext)

    const [title, setTitle] = useState()
    const [imageUrl, setImageUrl] = useState("")
    const [themeId, setThemeId] = useState()
    const [prepTime, setPrepTime] = useState()
    const [cookingTime, setCookingTime] = useState()

    function sendNewRecipe(ev){
        ev.preventDefault()
        axios.post("http://localhost:3000/recipes", {
            title : title,
            themeId : themeId,
            prepTime : prepTime,
            cookingTime : cookingTime,
        })
    }

    console.log(title, themeId, prepTime, cookingTime)

    function getIngredientsList() {
        if (ingredientsList) {
            return ingredientsList.map((item, index) => <option key={index}> {item.label} </option>)
        }
    }

    function getThemeList(){
        if (themeList){
            return themeList.map((item) => <option key={item.index}>{item.label}</option>)
        }
    }

    function addIngredients(ev){
        ev.preventDefault()
        return <select><option>Test</option></select>
    }



    return(
        <div>
            <Nav/>
        <form onSubmit={sendNewRecipe}>
            <input placeholder="Titre de votre recette" name="title" onChange={(ev) => setTitle(ev.target.value)}/>
            <input placeholder="URL de votre image" name="URL" onChange={(ev) => setImageUrl(ev.target.value)}/>

            <select onChange={(ev) => setThemeId(ev.target.value)}>
                {getThemeList()}
            </select>
            <input placeholder="Temps de préparation en minutes" name="prepTime" onChange={(ev) => setPrepTime(ev.target.value)}/>
            <input placeholder="Temps de cuisson en minutes" name="cookTime" onChange={(ev) => setCookingTime(ev.target.value)}/>
            <div id="ingredientsList">Liste des ingrédients</div>
            <ul><li></li></ul>
            <button id="newIngredients" onClick={addIngredients}>Ajouter un ingrédients</button>
            <select>
                {getIngredientsList()}
            </select>
            <div>Instructions</div>
            <button>Ajouter une étape</button>
            <textarea placeholder="Description de l'étape"/>
            <div>Publication en tant que {connectedAccount}</div>
            <button>Valider</button>
        </form>
        </div>
    )
}