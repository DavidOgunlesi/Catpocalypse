import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import {isMobile} from 'react-device-detect';
import {Button, Grid, Typography, InputAdornment, Item, IconButton} from "@material-ui/core";
import Background from "../static/Background";
import MissingCat from "/static/images/cats/undefined.png";
import SlideUpWindow from "../dynamic/SlideUpWindow";
import CatdexEntry from "./CatdexEntry";

/**
 * Main Function of Catdex.js
 * @returns The catdex main page displaying all cats in the game and which have been obtained.
 */
export default function Catdex(props){
    const [catdexEntries, setCatdexEntries] = useState([]);
    const [openCatProfile, setCatProfile] = useState(null);
    const [catProfileId, setCatProfileId] = useState(null);

    /**
     * Redirects the player to a page showing each tamed cat owned of a particular cat in the catdex, 
     * does nothing if the cat has not been obtained yet.
     * @param {integer} param0 == the id for the particular cat in the Catdex.
     * @param {JSON} param1 == the list of cats the user owns.
     * @returns ?
     */
    const loadOwnedCats = (id, ownedCats) => {
        var ownedCatsOfThisId = ownedCats.filter(function(cat){
            return cat.id == id;
        });
        for (let i = 0; i < ownedCatsOfThisId.length; i++) {
            //console.log(ownedCatsOfThisId[i]);
        }
        if (ownedCatsOfThisId.length > 0) {
            setCatProfileId(id);
            setCatProfile(ownedCatsOfThisId);
        } else {
            //console.log("Not discovered yet!");
        }
    }
    
    /**
     * Displays the image for each cat in the Catdex, displaying the missing cat if not yet obtained.
     */
    async function renderCatdex(){
        var cats = [];
        var ownedCats = [];
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
                    ownedCats.push({
                        id:cat.cat_id,
                        level: cat.level,
                        health: cat.health,
                        name: cat.name,
                        sex: cat.sex,
                        type: cat.type,
                        rarity: cat.rarity
                    });

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
                    <IconButton onClick={_ => loadOwnedCats(cats[i].id, ownedCats)}>
                    <img height={setImageHeight(cats[i].id)} src={loadCatImage(cats[i].id, ownedCats)} onError={handleOnError} align="center"/>
                    </IconButton>
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
        var imagePath = '/static/images/cats/undefined.png'; 
        const isFound = ownedCats.some(ownedCat => {
            if (ownedCat.id === id) {
                imagePath = `/static/images/cats/${id}.png`;
                return;
            }
        })
        return imagePath;
    }

    /**
     * Sets the image path for the particular catId if it has been obtained,
     * else it sets the path to the missing cat image.
     * @param {integer} param0 == the id for the particular cat being displayed in the Catdex.
     * @param {JSON} param1 == the list of cats the user owns.
     * @returns The path to the image displayed for the particular cat in the Catdex.
     */
    function setImageHeight(id){
        var height;
        if (id == 4 || id == 24) {
            height = 40;
        } else {
            height = 65;
        }
        return height;
    }

    const handleOnError = (e) => {
        e.target.src = '/static/images/cats/undefined.png'; 
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
        <SlideUpWindow
            open={openCatProfile != null}
            callback={() => {
                setCatProfile(null); 
                setCatProfileId(null);
            }}
            blur={false}
            content={<CatdexEntry id = {catProfileId} ownedCats={openCatProfile}/>}
            fillBox = {true}
        />
        <div>
        <Grid container spacing={2} style={{padding:20}} justifyContent="center" alignItems="center">
            {catdexEntries}
            <Grid item xs={3} align="center">
                <IconButton>
                <img height={65} src={MissingCat}/>
                </IconButton>
            </Grid>
            <Grid item xs={3} align="center">
                <IconButton>
                <img height={65} src={MissingCat}/>
                </IconButton>
            </Grid>
            <Grid item xs={3} align="center">
                <IconButton>
                <img height={65} src={MissingCat}/>
                </IconButton>
            </Grid>
            <Grid item xs={3} align="center">
                <IconButton>
                <img height={65} src={MissingCat}/>
                </IconButton>
            </Grid>
        </Grid>
        </div>
        </Background>
    );
}