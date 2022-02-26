import React from "react";

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
    var colStyle;
    var defStyle = {
        transform: `skew(${skew}deg)`,
        outline: `${outlineThickness}px solid ${outlineCol}`
    };
    var childStyle = {
        transform: `skew(${-skew}deg)`
    };
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