/**
 * The Horizontal Compass sets the compass on top of the Map view while playing Capolcalypse.
 * It informs the user of the current direction they are in.
 */

/**
 * The imports which are required for this page to run which includes packages from React.
 */
import { Box, Grid, Typography } from "@material-ui/core";
import React,{useState} from "react";

/**
 * 
 * @param {*} param0 
 * @returns The Compass Letter
 */
function CompassLetter({coordinate, children}) {
    console.log(window.innerWidth/50)
    var absPixelPos = (90 + coordinate)*(window.innerWidth/50);
    const style = {
        position: 'absolute',
        left: `${absPixelPos}px`,
        display: `${ coordinate < 90 && coordinate > -90 ? "block" : "none"}`
    }
    return(
            <div style={style}><Typography variant="h2" component="h2">{children}</Typography></div>
    );
}
  /** */
  const North = ({coordinate}) => {
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360}> N </CompassLetter>
        </div>
    );
  };
  const East = ({coordinate}) => {
    coordinate += 90;
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360}> E </CompassLetter>
        </div>
    );
  };
  const South = ({coordinate}) => {
    coordinate += 180;
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360}> S </CompassLetter>
        </div>
    );
  };
  const West = ({coordinate}) => {
    coordinate += 270;
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360}> W </CompassLetter>
        </div>
    );
  };
  /**
   * Sets the style of the compass which is a transparent horizontal box and is centered as well.
   */
  const style = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'transparent',
    textAlign: 'center',
    zIndex: 100000
  };

/**
 * 
 * @returns The box showing the direction the user is currently in.
 */
export default function HorizontalCompass(){
    const [coordinate, setCoordinate] = useState(0);

    return (
        <Box sx={style}>
                <North coordinate={coordinate} />
                <East coordinate={coordinate} />
                <South coordinate={coordinate} />
                <West coordinate={coordinate} />
                <div
                    style={{
                        position: 'relative',
                        top:"100px",
                        height: "5px",
                        width: '80%',
                        background: "black",
                        left: '50%',
                        transform: 'translateX(-50%)',
                        webkitMaskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 90%)",

                    }}

                ></div>
                <button
                    onClick={() => {
                    console.log(coordinate);
                    setCoordinate(coordinate + 10);
                    }}
                >
                    increment
                </button>
                <button
                    onClick={() => {
                    console.log(coordinate);
                    setCoordinate(coordinate - 10);
                    }}
                >
                    decrement
                </button>
          
        </Box>
      );
    
}
/*
<div>
<North coordinate={coordinate} />
<East coordinate={coordinate} />
<South coordinate={coordinate} />
<West coordinate={coordinate} />
</div>*/