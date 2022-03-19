/**
 * The Horizontal Compass sets the compass on top of the Map view while playing Capolcalypse.
 * It informs the user of the current direction they are in.
 */

/**
 * The imports which are required for this page to run which includes packages from React.
 */
import { Box, Typography } from "@material-ui/core";
import React,{useState, useEffect} from "react";
import { useSpring, animated } from 'react-spring'

/**
 * 
 * @param {*} param0 
 * @returns The Compass Letter
 */
function CompassLetter({coordinate, children, fontVariant}) {
    // console.log(window.innerWidth/50)
    var absPixelPos = (90 + coordinate)*(window.innerWidth/50);

    const props = useSpring({
        to: {
            left: `${absPixelPos}px`, 
            position: 'absolute',
            
        },
        delay: 0,
      })
      //console.log(coordinate)
    return(
            <animated.div style={props}>
                <Typography 
                style={{
                    padding: "10px",
                    display: `${ coordinate < 90 && coordinate > -90 ? "block" : "none"}`,
                    fontWeight: 600
                }} 
                variant={fontVariant} 
                component={fontVariant}
                >
                    {children}
                </Typography>
            </animated.div>
    );
}
  /** */
  const North = ({coordinate}) => {
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360} fontVariant="h3"> N </CompassLetter>
        </div>
    );
  };
  const NorthEast = ({coordinate}) => {
    coordinate += 45;
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360} fontVariant="h4"> NE </CompassLetter>
        </div>
    );
  };
  const East = ({coordinate}) => {
    coordinate += 90;
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360} fontVariant="h3"> E </CompassLetter>
        </div>
    );
  };
  const SouthEast = ({coordinate}) => {
    coordinate += 135;
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360} fontVariant="h4"> SE </CompassLetter>
        </div>
    );
  };
  const South = ({coordinate}) => {
    coordinate += 180;
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360} fontVariant="h3"> S </CompassLetter>
        </div>
    );
  };
  const SouthWest = ({coordinate}) => {
    coordinate += 225;
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360} fontVariant="h4"> SW </CompassLetter>
        </div>
    );
  };
  const West = ({coordinate}) => {
    coordinate += 270;
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360} fontVariant="h3"> W </CompassLetter>
        </div>
    );
  };
  const NorthWest = ({coordinate}) => {
    coordinate += 315;
    return (
        <div>
            <CompassLetter coordinate={coordinate % 360} fontVariant="h4"> NW </CompassLetter>
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
    pointerEvents: 'none',
    background: 'transparent',
    textAlign: 'center',
    zIndex: 10000
  };

/**
 * 
 * @returns The box showing the direction the user is currently in.
 */
export default function HorizontalCompass({
    mapObj = null
}){
    const [coordinate, setCoordinate] = useState(0);
    //Run refresh every second
	useEffect(() => {
		var timerID = setInterval(() =>  {
            if (mapObj != null){
                // console.log(`h:${mapObj.heading}`)
                if (coordinate >= 0){
                    setCoordinate(-mapObj.heading)
                }else {
                    setCoordinate(-360-mapObj.heading)
                }
            }
        }, 1000);
		return () => clearInterval(timerID);
	});
    return (
        <Box sx={style}>
                <North coordinate={coordinate} />
                <NorthEast coordinate={coordinate} />
                <East coordinate={coordinate} />
                <SouthEast coordinate={coordinate} />
                <South coordinate={coordinate} />
                <SouthWest coordinate={coordinate} />
                <West coordinate={coordinate} />
                <NorthWest coordinate={coordinate} />
                <div
                    style={{
                        position: 'relative',
                        top:"80px",
                        height: "5px",
                        width: '80%',
                        background: "black",
                        left: '50%',
                        transform: 'translateX(-50%)',
                        webkitMaskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 90%)",

                    }}

                ></div>
          
        </Box>
      );
    
}