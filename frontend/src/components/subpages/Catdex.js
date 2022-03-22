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
    const getCats = () => {
		var cats = [];
		fetch('/api/get-all-cats')
		.then(response => response.json())
		.then(data => {
			for(var i = 0; i < data.length; i++) {
				var cat = data[i];
				cats.push(
                <Grid item xs={4} align="center">
                    <img width={100} src={MissingCat}/>
                </Grid>
				);
			}
		})
        console.log(cats);
		return cats;
  	}

    function renderCats(){
        var cats = [];
		fetch('/api/get-all-cats')
		.then(response => response.json())
		.then(data => {
			for(var i = 0; i < data.length; i++) {
                var cat = data[i];
				cats.push({id:cat.cat_id});
			}
            console.log(cats);
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
			for(var i = 0; i < data.data.length; i++) {
                var cat = data.data[i];
				ownedCats.push({id:cat.cat_id});
                console.log(cat);
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
        console.log("IM WORKING!!");
        const isFound = ownedCats.some(ownedCat => {
            if (ownedCat.id === id) {
                return `/static/images/cats/${id}.png`;
            }
            else {
                return '/static/images/cats/undefined.png';
            }
        })
    }



    function displayCats() {
        var cats = renderCats()
        console.log(cats.length);
        var ownedCats = renderOwnedCats()
        var catdexEntry = [];
        for (let i = 0; i < cats.length; i++) {
            catdexEntry.push(
                <Grid item xs={4} align="center">
                    <img width={100} src={loadCatImageFromCatdex(cats[i].id, ownedCats)}/>
                </Grid>
            )
        }
        return catdexEntry;
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
            {getCats()}
            <Grid item xs={4} align="center">
                <img width={100} src={MissingCat}/>
            </Grid>
        </Grid>
        </div>
        </Background>
    );
}