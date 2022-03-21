/**
 * A set template used to check if the page is working or not.
 * Imports React from the React Package
 */
 import React from "react";
 import {LinearProgress, Typography} from '@material-ui/core';

 export default function LoadingScreen(){
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);

    const progressRef = React.useRef(() => {});
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

    React.useEffect(() => {
        const timer = setInterval(() => {
        progressRef.current();
        }, 500);

        return () => {
        clearInterval(timer);
        };
    }, []);
     /**
      * Returns Hello World!
      */
     return (
        <div 
        style={{
            position: "absolute",
            backgroundColor: "#B8FCF3",
            width: '100%',
            height: "100%",
            zIndex: 100000
        }}
        >
            <div 
            style={{
            position: "absolute",
            backgroundColor: "#B8FCF3",
            top: "80%",
            width: '100%',
            zIndex: 100000
        }}>
            <Typography variant="h3" component="h3">Loading...</Typography>
                <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            </div>
        </div>
     );
     
 }