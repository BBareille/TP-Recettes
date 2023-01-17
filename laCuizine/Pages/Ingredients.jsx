import axios from "axios";
import {useEffect, useState} from "react";
import Nav from "../components/nav.jsx";
import {Link} from "react-router-dom";
export default function Ingredients(){

    const [ingredientsList, setIngredientsList] = useState()
    const [recipesList, setRecipesList] = useState()
    const [hasRecipes, setHasRecipes] = useState()

    useEffect(()=>{
        axios.get("http://localhost:3000/ingredients")
            .then(function (response) {
                setIngredientsList(response.data)
            })
        axios.get("http://localhost:3000/recipes")
            .then(function (response){
                setRecipesList(response.data)
            })
    },[])

    function getIngredientList(ingredientId) {
        if(recipesList) {
            const result = recipesList.filter(recipe =>
            {
                const arrayOfIngredients = recipe.ingredientList.map((item)=> item.ingredientId)

                return arrayOfIngredients.indexOf(ingredientId) !== -1

            })

            const listResult = result.map((item) => <li>{item.title}</li>)
            if(listResult.length >= 1){ return (<div>
                <ul>
                    <li>
                        {listResult}
                    </li>
                </ul>
            </div>
            )}

        }

    }
    function showIngredientsList(){
        return ingredientsList.map((item)=> {
            return (
                <li>
                    {(item.label).charAt(0).toUpperCase()+(item.label).slice(1)}
                    <ul id={item.id}> <Link to="/recettes">{getIngredientList(item.id)}</Link></ul>
                </li>)
        })
    }


    if(ingredientsList) {
        return (
            <div>
            <Nav/>
                <h1>Liste des différents ingrédients</h1>
            <ul className="ingredientList">
                {showIngredientsList()}
            </ul>
            </div>
        )
    }
}