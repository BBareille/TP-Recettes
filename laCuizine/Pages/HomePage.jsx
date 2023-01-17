import Nav from "../components/nav.jsx";
import {useContext} from "react";
import {CredentialsContext} from "../src/main.jsx";
export default function HomePage(){

    const {themeList} = useContext(CredentialsContext)



    function getThemeList(){
        if(themeList) {
            return themeList.map(item => <li id="theme">{item.label}</li>)
        }}

    return(
        <div>
            <Nav/>
            <div className="body">
            <h1>LA CUIZINE</h1>
            <div id="article">

                <article>
                    <h2>Apprenez à cuisiner comme un chef </h2>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aspernatur consectetur consequatur cum, deserunt dicta dignissimos dolores dolorum et eveniet explicabo fugiat fugit illo impedit ipsum laboriosam maiores minima modi natus nulla numquam obcaecati odio quae quibusdam quidem quis reiciendis rem repudiandae sed sequi tempora tenetur voluptates? Laboriosam, minus.
                </article>
            <img id="womanCooking" src="../src/assets/woman-cooking.jpg"/>


            </div>
                <div id="searchSection">
                    <img src="../src/assets/icons8-chercher-64.png"/>
                    <input className="searchBar" placeholder="Recherche d'une recette"/>
                </div>
                <ul id="themeList">
                    {getThemeList()}
                </ul>
            </div>

        </div>
    )
}