/**
 * A set template used to check if the page is working or not.
 * Imports React from the React Package
 */
 import React from "react";
 import {Button, Grid, Typography, InputAdornment, Item, IconButton} from "@material-ui/core";
 import Box from '@material-ui/core/Box';
 import MissingCat from "/static/images/cats/undefined.png";

 export default function CatdexProfile({cat}){
    console.log(cat.id);
    
    function setImageSize() {
        switch(cat.id) {
            case 1:
                return 9;
                break;
            case 2:
                return 9;
                break;
            case 3:
                return 7;
                 break;
            case 4:
                return 12;
            case 5:
                return 10;
            case 6:
                return 5;
            case 7:
                return 7;
            case 10:
                return 11;
            case 11:
                return 11;
            case 14:
                return 9;
                //
            case 15:
                return 12;
            case 16:
                return 12;
            case 17:
                return 12;
            case 18:
                return 10;
            case 19:
                return 12;
            case 20:
                return 8;
            case 21:
                return 11;
            case 22:
                return 10;
            case 23:
                return 10;
            case 24:
                return 12;
            case 26:
                return 10;
            case 27:
                return 12;
            case 28:
                return 7;
            default:
                return 8;
        }
    }

    function setGender() {
        if (cat.sex == 'male') {
            return '/static/icons/male.svg';
        } else {
            return '/static/icons/female.svg';
        }
    }

    /**
     * Returns Hello World!
     */
    return (
        <div  style = {{opacity:1}}>
        <Grid container spacing={2} style={{padding:20}} justifyContent="center" alignItems="center">
            <Grid item xs={12} align="center">
                <Typography style={{color:'black'}} variant='h2' component='h2'>{cat.name}</Typography>
            </Grid>
            <Grid item xs={setImageSize()} align="center">
                <img src={`/static/images/cats/${cat.id}.png`}/>
            </Grid>
            <Box width="100%"/>
            <Grid item xs={2} align="center">
                <img src={setGender()}/>
            </Grid>
        </Grid>
        </div>
    );    
} 