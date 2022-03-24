import React from "react";
import {Grid, Typography} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Male from '/static/icons/male.svg';
import Female from '/static/icons/female.svg'

/**
 * Main Function of CatdexProfile.js
 * Displays the profile component for a player owned cat.
 * @returns The profile page displaying the cat obtained by the player.
 */
export default function CatdexProfile({cat}){
    console.log(cat.id);
    
    /**
     * Sets the size of the cat image in the profile.
     * @return The width of the image to be used in the grid item.
     */    
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

    /**
     * Sets the gender to be displayed on the cat's profile.
     * @return The icon containing the gender for this cat.
     */  
    function setGender() {
        if (cat.sex == 'male') {
            return Male;
        } else {
            return Female;
        }
    }

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
            <Box width="100%"/>
            <Grid item xs={12}>
                <Typography style={{color:'black', padding:20}} variant='h4' component='h4'>Level: {cat.level}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography style={{color:'black', padding:20}} variant='h4' component='h4'>Rarity: {cat.rarity}</Typography>
            </Grid>
        </Grid>
        </div>
    );    
} 