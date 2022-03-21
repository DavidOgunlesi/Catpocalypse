/**
 * A set template used to check if the page is working or not.
 * Imports React from the React Package
 */
 import React from "react";
 import {Typography} from "@material-ui/core";

 export default function CatchingCat({
     catId = null
 }){
 
     /**
      * Returns Hello World!
      */
     return (
         <div>
             <Typography
             variant="h1"
             component="h1"
             >
                Catching Cat {catId}
             </Typography>
        </div>
     );
     
 }