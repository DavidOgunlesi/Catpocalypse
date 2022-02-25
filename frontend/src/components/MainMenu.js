import React, {useState, useEffect} from "react";

export default function MainMenu(){

    // Create states
    const [width, setWidth] = useState(window.innerWidth);

    // Check if the window has been resized, if so update state
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    // If we are in a moble browser or not
    const isMobile = width <= 768;
    if (isMobile) {
        return (
            <div>In Mobile Browser</div>
        );
    }else{
        return (
            <div>In Desktop Browser!</div>
        );
    }
    
}