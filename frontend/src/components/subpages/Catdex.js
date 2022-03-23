import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import {isMobile} from 'react-device-detect';
import {Button, Grid, Typography, InputAdornment, Item} from "@material-ui/core";
import Background from "../static/Background";
import MissingCat from "/static/images/cats/undefined.png";

/**
 * Main Function of Catdex.js
 * @returns The catdex main page displaying all cats in the game and which have been obtained.
 */
export default function Catdex(props){
    const [catdexEntries, setCatdexEntries] = useState([]);

    /**
    * Redirects the player to a page showing each tamed cat owned of a particular cat in the catdex, 
    * does nothing if the cat has not been obtained yet.
    * @param {integer} param0 == the id for the particular cat in the Catdex.
    * @param {JSON} param1 == the list of cats the user owns.
    * @returns ?
    */
    function loadOwnedCats(id, ownedCats) {
        console.log(id, ownedCats);
    }

    /**
     * Displays the image for each cat in the Catdex, displaying the missing cat if not yet obtained.
     */
    async function renderCatdex(){
        var cats = [];
        var ownedCats = [];
        console.log("Starting api call");
        try {
            //Creates a JSON object to fetch all cats in the Catdex 
		    await fetch('/api/get-all-cats')
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.length; i++) {
                    var cat = data[i];
                    cats.push({id:cat.cat_id});
                }
            })
            //Creates a JSON object to fetch all cats owned by the player
            await fetch('/api/get-owned-cats')
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.data.length; i++) {
                    var cat = data.data[i];
                    ownedCats.push({id:cat.cat_id});

                }
            })
        } catch(e) {
            throw e;
        }        
        
        //Displays the image for each cat in the Catdex
        var catdexEntry = [];
        for (let i = 0; i < cats.length; i++) {
            catdexEntry.push(
                <Grid item xs={3} align="center">
                    <img width={100} src={loadCatImage(cats[i].id, ownedCats)} onclick={() => {loadOwnedCats(cats[i].id, ownedCats)}}/>
                </Grid>
            )
        }
        setCatdexEntries(catdexEntry);
    }

    /**
     * Sets the image path for the particular catId if it has been obtained,
     * else it sets the path to the missing cat image.
     * @param {integer} param0 == the id for the particular cat being displayed in the Catdex.
     * @param {JSON} param1 == the list of cats the user owns.
     * @returns The path to the image displayed for the particular cat in the Catdex.
     */
    function loadCatImage(id, ownedCats){
        console.log("loading image");
        var imagePath = '/static/images/cats/undefined.png'; 
        console.log("Id: " + id);
        console.log("OwnedCats: " + ownedCats);
        console.log(ownedCats);
        const isFound = ownedCats.some(ownedCat => {
            console.log("ownedCat: " + ownedCat.id);
            if (ownedCat.id === id) {
                imagePath = `/static/images/cats/${id}.png`;
                console.log(imagePath);
                return;
            }
        })
        return imagePath;
    }

    //renders each Catdex entry as a grid item
    if (catdexEntries.length == 0){
        renderCatdex()
    }

    return(
        <Background 
        gradient={false} 
        primaryCol="#E2FADD" 
        outlineCol="#9EE6C9" 
        outlineThickness={200} 
        skew={-32}
        backgroundCol="#B8FCF3"
        >
        <div>
        <Grid container spacing={2} style={{padding:20}}>
            {catdexEntries}
        </Grid>
        </div>
        </Background>
    );
}