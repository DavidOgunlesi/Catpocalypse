/**
 * Sets the background of Catpocalypse using the colour palette which has been decided by the team.
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */

import React from "react";

/**
 * 
 * Main function of the Background.js file
 * @returns background with the following colours, properties as mentioned.
 */
export default function Background({ 
    gradient = false,
    primaryCol = '#000', 
    secondaryCol = '#000',
    backgroundCol = "#FFFFFF",
    skew = 0,
    outlineCol =  '#000',
    outlineThickness = 0,
    children
}) {
    /**
     * Variables of the attributes present
     */
    var colStyle;
    var defStyle = {
        transform: `skew(${skew}deg)`,
        outline: `${outlineThickness}px solid ${outlineCol}`
    };
    var childStyle = {
        transform: `skew(${-skew}deg)`
    };
    /**
     * There are different backgrounds depending on the type of gradient present
     */
    if (gradient){
        colStyle = {
            backgroundImage: `linear-gradient(45deg, ${primaryCol},  ${secondaryCol})`
        };
    }else{
        colStyle = {
            backgroundColor: `${primaryCol}`
        };
    }
    return (
        <div className="background" style={{backgroundColor: `${backgroundCol}`}}>
            <div className="background" style={{...defStyle,...colStyle}}>
                <div className="comp_skewedBackground_content" style={childStyle}>
                    {children}
                </div>
            </div>
        </div>
    );
    
}