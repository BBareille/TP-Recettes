import Nav from "./nav.jsx";
import {useContext, useState} from "react";
import {CredentialsContext} from "../src/main.jsx";
import axios from "axios";
import {Link} from "react-router-dom";

export default function NewRecipeForm(){

    const {connectedAccount, ingredientsList, themeList, isConnected, connectedAccountId, connectedAccountUsername} = useContext(CredentialsContext)

    const [title, setTitle] = useState()
    const [imageUrl, setImageUrl] = useState("")
    const [themeId, setThemeId] = useState()
    const [prepTime, setPrepTime] = useState()
    const [cookingTime, setCookingTime] = useState()
    const [ingredientsInRecipe, setIngredientsInRecipe] = useState([])
    const [currentIngredientInSelect, setCurrentIngredientInSelect] = useState()
    const [currentQuantityInSelect, setCurrentQuantityInSelect] = useState()
    const [currentUnitInSelect, setCurrentUnitInSelect] = useState()
    const [currentIngredientId, setCurrentIngredientId] = useState(0)




    function sendNewRecipe(ev){
        ev.preventDefault()
        axios.post("http://localhost:3000/recipes", {
            title : title,
            image : imageUrl,
            userId : parseInt(connectedAccountId().toString()),
            themeId : parseInt(themeId),
            prepTime : parseInt(prepTime),
            cookingTime : parseInt(cookingTime),
            ingredientList: ingredientsInRecipe,
            steps: "",
        })
    }


    function getIngredientsList() {
        if (ingredientsList) {
            return ingredientsList.map((item, index) => <option key={index}> {item.label} </option>)
        }
    }

    function getThemeList(){
        if (themeList){
            return themeList.map((item) => <option accessKey={item.index}>{item.label}</option>)
        }
    }

    function getIdFromLabel(label){
        if(ingredientsList) {
            return ingredientsList.filter((item) => item.label == label).map(item => item.id).toString()
        }}

    function addNewIngredients(){
        setIngredientsInRecipe([...ingredientsInRecipe , {
            ingredientId: parseInt(currentIngredientId),
            itemLabel:currentIngredientInSelect,
            quantity:parseInt(currentQuantityInSelect),
            unit:currentUnitInSelect
        }])
    }

    function showIngredients(){
        return(
            ingredientsInRecipe.map((item) => <li>{item.quantity} {item.unit} {item.itemLabel}</li>)
        )

    }

    return(
        <div>
            <Nav/>
            {isConnected?<form onSubmit={sendNewRecipe}>
                <input placeholder="Titre de votre recette" name="title" onChange={(ev) => setTitle(ev.target.value)}/>
                <input placeholder="URL de votre image" name="URL" onChange={(ev) => setImageUrl(ev.target.value)}/>

                <select onChange={(ev) => setThemeId(ev.target.value)}>
                    {getThemeList()}
                </select>
                <input placeholder="Temps de préparation en minutes" name="prepTime" onChange={(ev) => setPrepTime(ev.target.value)}/>
                <input placeholder="Temps de cuisson en minutes" name="cookTime" onChange={(ev) => setCookingTime(ev.target.value)}/>



                <div id="ingredientsList">Liste des ingrédients</div>
                <ul>{showIngredients()}</ul>
                <button type={"button"} onClick={addNewIngredients} id="newIngredients">Ajouter un ingrédients</button>
                <div className="ingredientSelect">

                    {<select onChange={(ev) => {
                        setCurrentIngredientInSelect(ev.target.value)
                        setCurrentIngredientId(() => getIdFromLabel(ev.target.value))
                    }}><option key="test" value="" disabled selected>Selectionne l'ingrédient</option>{getIngredientsList()}</select>}

                    <input placeholder="quantité" onChange={(ev)=> setCurrentQuantityInSelect(ev.target.value)}/>
                    <input placeholder="unité" onChange={(ev) => setCurrentUnitInSelect(ev.target.value)}/>
                </div>



                <div>Instructions</div>
                <button type={"button"}>Ajouter une étape</button>
                <textarea placeholder="Description de l'étape"/>
                <div>Publication en tant que {connectedAccountUsername()}</div>
                <button type={"submit"}>Valider</button>
                </form>
                :
                <div className={"notConnected"}>
                    <p>Vous devez être connecté pour ajouter une nouvelle recette</p>
                    <Link onClick={()=> setIsRegistered(false)} to={"/register"}><em>Créer un compte ici</em></Link>
                </div>}


        </div>
    )
}