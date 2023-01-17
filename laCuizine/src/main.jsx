import React, {createContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Form from "../components/Form.jsx";
import "./index.css"
import HomePage from "../Pages/HomePage.jsx";
import Ingredients from "../Pages/Ingredients.jsx";
import Recettes from "../Pages/Recettes.jsx";
import "../index.css"
import axios from "axios";
import Account from "../Pages/Account.jsx";
import NewRecipeForm from "../components/NewRecipeForm.jsx";




const router = createBrowserRouter([
    {path: "/", element:<HomePage/>},
    {path: "/login", element:<Form registered={true}/>},
    {path: "/register", element:<Form registered={false}/>},
    {path: "/ingredients", element:<Ingredients/>},
    {path: "/recettes", element:<Recettes/>},
    {path: "/account", element:<Account/>},
    {path: "/newRecipes", element:<NewRecipeForm/>},
])
export const CredentialsContext = React.createContext("")

export function App(){
    const [isConnected, setIsConnected]= useState(false)
    const [userList, setUserList] = useState()
    const [connectedAccount, setConnectedAccount] = useState()
    const [ingredientsList, setIngredientsList]= useState()
    const [themeList, setThemeList] = useState()


    async function listUser(){
        useEffect(()=> {
            axios.get("http://localhost:3000/users")
                .then(function(response) {
                    setUserList(response.data)
                })
        },[])

    }
    listUser()
    async function getIngredientsList(){
        useEffect(()=> {
            axios.get("http://localhost:3000/ingredients")
                .then(function(response) {
                    setIngredientsList(response.data)
                })
        },[])

    }getIngredientsList()

    async function getThemeList(){
        useEffect(()=> {
            axios.get("http://localhost:3000/themes")
                .then(function(response) {
                    setThemeList(response.data)
                })
        },[])

    }getThemeList()


    return(
        <CredentialsContext.Provider value={
            {
                isConnected,
                setIsConnected,
                userList,
                setUserList,
                connectedAccount,
                setConnectedAccount,
                ingredientsList,
                themeList
            }}>
            <RouterProvider router={router} />
        </CredentialsContext.Provider>
    )

}


ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
            <App/>
  </React.StrictMode>,
)

