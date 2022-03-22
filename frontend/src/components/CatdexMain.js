import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import {isMobile} from 'react-device-detect';
import logo from '/static/images/logo.png';
import cat from '/static/images/cat.png';
import {Button, Grid, Typography, InputAdornment, Item} from "@material-ui/core";
import FallingCat from "./dynamic/FallingCat";
import {getRandomRange} from '/src/util/math.js';
import Background from "./static/Background";
import {Link} from "react-router-dom";
import LoginPage from "./LoginPage";
import {GoogleLogin} from 'react-google-login';
import GoogleLogo from '/static/images/GoogleLogo.png';
import ModalWindow from "./dynamic/ModalWindow";
import ChoiceModalWindow from "./dynamic/ChoiceModalWindow";
import MissingCat from "/static/images/cats/undefined.png";
import { FormatAlignJustify } from "@material-ui/icons";


export default function Catdex(props){
    //super(props);
    //const [style, setStyle] = useState(style);

    /**
     * Loads a cat image from the appropriate id if the cat is obtained,
     * else it displays the missing cat image
     */

    function renderCats(){
        //first do the fetch
        //then all data is 
        var cats = [];
		fetch('/api/get-all-cats')
		.then(response => response.json())
		.then(data => {
			for(var i = 0; i < data.length; i++) {
				cats.push(cat_id);
			}
		})

        var ownedCats = [];
        fetch('/api/get-owned-cats')
        .then(response => response.json())
        .then(data => {
			for(var i = 0; i < data.length; i++) {
                var cat = data[i];
				cats.push(id ={cat.cat_id}
                          cat_name = {cat.cat_name});
			}
        })
        loadCatImageFromCatdex(ownedCats);

    }

    function loadCatImageFromCatdex(ownedCats){
        for(i in ownedCats){
            return `/static/images/cats/${id}.png`
        }
    }


	if (isMobile){
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