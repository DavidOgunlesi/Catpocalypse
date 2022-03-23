/**
 * Whenever the player opens the app after loggining in, there will be a set loading page with an art design of the cats in Catpocalypse.
 */

/**
 * The imports which are required for this page to run which includes packages from React.
 */
 import React from "react";
 import {LinearProgress, Typography} from '@material-ui/core';
 import LoadingScreenImg from '/static/images/loadingScreen.png';

 /**
  * Main function of the Loading Screen
  * @returns page with cats from the game.
  */
 export default function LoadingScreen(){
     /**
      * Fixed Variables required and cannot be assigned using states.
      */
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);

    const progressRef = React.useRef(() => {});
    /**
     * Ensures the loading bar does not exceed 100 and gives an effect 
     */
    React.useEffect(() => {
        progressRef.current = () => {
        if (progress > 100) {
            setProgress(0);
            setBuffer(10);
        } else {
            const diff = Math.random() * 10;
            const diff2 = Math.random() * 10;
            setProgress(progress + diff);
            setBuffer(progress + diff + diff2);
        }
        };
    });

    /**
     * The effect will run for 500 milliseconds
     */
    React.useEffect(() => {
        const timer = setInterval(() => {
        progressRef.current();
        }, 500);

        return () => {
        clearInterval(timer);
        };
    }, []);
    /**
     * Returns the loading page with animated gradient background
     */
     return (
        <div 
        className="animatedLoadingScreenGradient"
        style={{
            position: "absolute",
            width: '100%',
            height: "100%",
            zIndex: 100000
        }}
        >
        <div 
        style={{
            position: "absolute",
            backgroundImage: `url("${LoadingScreenImg}")`,
            backgroundSize: "cover",
            width: '100%',
            height: "100%",
            zIndex: 100000
        }}
        >
        <div 
        style={{
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        top: "80%",
        width: '100%',
        zIndex: 100000
        }}>
            <Typography variant="h3" component="h3" style={{color: "white"}}>Loading...</Typography>
                <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            </div>
        </div>
        </div>
     );
     
 }