/**
 * A set template used to check if the page is working or not.
 * Imports React from the React Package
 */
 import React from "react";
 import {Button, Grid, Typography, InputAdornment, Item, IconButton} from "@material-ui/core";
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
                break;
            case 5:
                return 10;
                break;
            case 6:
                return 5;
                break;
            case 7:
                return 7;
                break;
            case 10:
                return 11;
                break;
            case 11:
                return 11;
                break;
            case 14:
                return 9;
                break;
                //
            case 15:
                return 12;
                break;
            case 16:
                return 12;
                break;
            case 17:
                return 12;
                break;
            case 18:
                return 10;
                break;
            case 19:
                return 12;
                break;
            case 20:
                return 8;
                break;
            case 21:
                return 11;
                break;
            //
            case 22:
                return 10;
                break;
            case 23:
                return 10;
                break;
            case 24:
                return 12;
                break;
            case 26:
                return 10;
                break;
            case 27:
                return 12;
                break;
            case 28:
                return 7;
                break;
            default:
                return 8;
                break;
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
        </Grid>
        </div>
     );    
} 