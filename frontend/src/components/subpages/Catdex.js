import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import {isMobile} from 'react-device-detect';
import {Button, Grid, Typography, InputAdornment, Item} from "@material-ui/core";
import Background from "../static/Background";
import MissingCat from "/static/images/cats/undefined.png";

/**
 * Main Function of Catdex.js
 * @returns The catdex main page displaying all cats and which have been obtained.
 */
export default function Catdex(props){

    /**
     * Creates JSON object to fetch all cats from the database
     * @returns The JSON object of all cats in the database
     */
    function renderCats(){
        var cats = [];
		fetch('/api/get-all-cats')
		.then(response => response.json())
		.then(data => {
			for(var i = 0; i < data.length; i++) {
                var cat = data[i];
				cats.push({id:cat.cat_id});
			}
		})
        return cats;
    }

    /**
     * Creates JSON object to fetch all cats the user owns
     * @returns The JSON object of all cats the user owns
     */
    function renderOwnedCats() {
        var ownedCats = [];
        fetch('/api/get-owned-cats')
        .then(response => response.json())
        .then(data => {
			for(var i = 0; i < data.length; i++) {
                var cat = data[i];
				ownedCats.push({id:cat.cat_id});
			}
        })
        return ownedCats;
    }

    /**
     * Loads the appropriate image from the id if the cat is obtained,
     * else it displays the missing cat image
     * @param {integer} param0 == the id for the particular cat being displayed in the Catdex.
     * @param {JSON} param1 == the list of cats the user owns.
     * @returns The cat image displayed on the Catdex
     */
    function loadCatImageFromCatdex(id, ownedCats){
        const isFound = ownedCats.some(ownedCat => {
            if (ownedCat.id === id) {
                return `/static/images/cats/${id}.png`;
            }
            else {
                return '/static/images/cats/undefined.png';
            }
        })
    }


	if (isMobile){
        //var cats = renderCats()
        //var ownedCats = renderOwnedCats()

        //PUT INSIDE GRID
        //{cats.map(cat => {
            //<Grid item xs={4} align="center">
                //<img width={100} src={loadCatImageFromCatdex(cat.id, ownedCats)}/>
            //</Grid>
        //})}

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
                <Grid item xs={4} align="center">
                    <img width={100} src={MissingCat}/>
                </Grid>
                <Grid item xs={4} align="center">
                    <img width={100} src={MissingCat}/>
                </Grid>
                <Grid item xs={4} align="center">
                    <img width={100} src={MissingCat}/>
                </Grid>
                <Grid item xs={4} align="center">
                    <img width={100} src={MissingCat}/>
                </Grid>
                <Grid item xs={4} align="center">
                    <img width={100} src={MissingCat}/>
                </Grid>
                <Grid item xs={4} align="center">
                    <img width={100} src={MissingCat}/>
                </Grid>
            </Grid>
            </div>
            </Background>
        );
		}
	else{
		return(<p>Yessir</p>);
	}
}