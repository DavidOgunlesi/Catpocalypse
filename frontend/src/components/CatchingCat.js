/**
 * The Catching Cats page is used to allow players to catch cats from the map view
 */
/**
 * The imports which are required for the CatchingCat.js page to run which includes packages from React and other files which exist.
 */
import React, { useState } from "react";
import {Typography, IconButton, Button, Slider, Grid} from "@material-ui/core";
import OverlayUI from "./dynamic/OverlayUI";
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import MissingCat from '/static/images/cats/undefined.png';
import SlideHorizontalWindow from "./dynamic/SlideHorizontalWindow";
import { useSpring, animated } from 'react-spring';
import HookImg from '/static/images/hooks.png';
import ModalWindow from "./dynamic/ModalWindow";
import {getRandomRange, getIntRandomRange} from '/src/util/math.js';
import LoadingScreen from "./static/LoadingScreen";

import ShrubLeft from "/static/images/catchingCats/shrubLeft.png";
import ShrubRight from "/static/images/catchingCats/shrubRight.png";
import ShrubCenter from "/static/images/catchingCats/shrubCenter.png";
import GameIcon from "./GameIcon";

import WeakCatnip from "/static/images/catchingCats/catnip/weak.png";
import ApprenticeCatnip from "/static/images/catchingCats/catnip/strong.png";
import JourneymanCatnip from "/static/images/catchingCats/catnip/journeyman.png";
/**
* Variable which returns a specific cat from the map to continue the process of catching.
*/
function loadCatImageFromId(id){
    return `/static/images/cats/${id}.png`
} 
/**
 * Animated function which returns effects on the background of the page
 * @returns falling leaves on the display screen for catching cats
 */
function FallingLeaves(){
    return (
        <div class="container">
            <div class="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

/**
 * 
 * @returns catnip image depending on the type of Catnip present - either weak, apprentice or journeyman
 */
function getCatnipImg(type){
    switch (type) {
        case "Weak":
            return WeakCatnip;
        case "Apprentice":
            return ApprenticeCatnip;
        case "Journeyman":
            return JourneymanCatnip;
    }
}

/**
 * Function which returns the catnips when rendered
 * @returns images of the catnips which need to be used
 */
function Catnip({
    type,
    catNipUses = {weak: 30, apprentice: 10, journeyman: 5},
    setSelectedCatnipCallback,
    setShowCatnipCallback
}){
    var img = getCatnipImg(type);
    var catNipUsesNum = catNipUses.weak
    switch (type) {
        case "Weak":
            catNipUsesNum = catNipUses.weak
            break;
        case "Apprentice":
            catNipUsesNum = catNipUses.apprentice
            break;
        case "Journeyman":
            catNipUsesNum = catNipUses.journeyman
            break;
        default:
            break;
    }
    return (
        <button 
            style={{
            height: "100px",
            width: "100px",
            borderRadius: 500,
            }}
            onClick={_ => {
                setSelectedCatnipCallback(type);
                setShowCatnipCallback(false);
            }}
            >
            <Button
            variant="contained"
            disabled
            style={{
                position: "absolute",
                bottom: "0px",
                backgroundColor: "#000",
                borderRadius: 50,
                color: "#FFF"
            }}
            >{type} x{catNipUsesNum}</Button>
            <img src={img} style={{padding: "13px"}} height="100%"/>
        </button>
    );
}

/**
 * 
 * @returns the cat label consisting the cat name and HP on top of the cat when the cat is displayed on the catching cats screen
 */
function CatLabel({wildCatData, hookAnimState}){
    return(
        <div 
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}>
                <div
                style={{
                position: "absolute",
                backgroundColor: "rgba(1,1,1,0.4)",
                transform: "skew(20deg)",
                borderRadius: 10,
                zIndex: 10000,
                width: "50%",
                height: "50px",
                top: "25%",
                display: hookAnimState < 1 ? "block" : "none"
                }}
                >
                    <Typography variant="h5" component="h5" style={{
                        color: "white",
                        transform: "skew(-20deg)"
                    }}
                        >
                        {wildCatData.cat_name} HP: {wildCatData.start_health} {wildCatData.sex == "male" ? <GameIcon src="male"/> : <GameIcon src="female"/>}
                    </Typography>
                    <Slider
                    defaultValue={(wildCatData.health/wildCatData.maxHealth) * 100}
                    valueLabelDisplay="auto"
                    color="#9EE6C9"
                    disabled
                    style={{
                        transform: "skew(-20deg)"
                    }}
                    />
                </div>
            </div>
    );
}
/**
 * 
 * @returns Cat with a bouncing effect while catching
 */
function Cat({wildCatData, hookAnimState}){
    var randomBounceTime = getRandomRange(0.3,1);
    var catAnimStyling = {
        animation: `bounce ${randomBounceTime}s infinite alternate`,
        webkitAnimation: `bounce ${randomBounceTime}s infinite alternate`
    }
    return (
        <div>
            <div className="center">
                <img src={loadCatImageFromId(wildCatData.cat_id)} width={200}
                style={{
                    ...catAnimStyling,
                    display: hookAnimState < 1 ? "block" : "none"
                }}
                />
            </div>
        </div>
    );
}

/**
 * 
 * @returns shurbs on the background on the left, right and center to make the display screen more aesthetic and realistic
 */
function ShrubBackground(){
    return (
        <div>
             <div
            style={{
                backgroundImage: `url("${ShrubLeft}")`,
                backgroundSize: "30%",
                position: "absolute",
                width: '100%',
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                opacity: 0.7,
                backgroundBlendMode: "multiply",
                backgroundPosition: "right bottom"
            }}
            />
            <div
            style={{
                backgroundImage: `url("${ShrubRight}")`,
                backgroundSize: "30%",
                position: "absolute",
                width: '100%',
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                opacity: 0.7,
                backgroundBlendMode: "multiply",
                backgroundPosition: "left bottom"
            }}
            />
            <div
            style={{
                backgroundImage: `url("${ShrubCenter}")`,
                backgroundSize: "100%",
                position: "absolute",
                width: '100%',
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                opacity: 0.4,
                backgroundBlendMode: "multiply",
                backgroundPosition: "center"
            }}/>
        </div>
    );
}

/**
 * Renders the background of the CatchignCat.js
 * @returns background depending on the time during the 24 hour period, i.e day, night, dawn and dusk.
 */
const chooseGradient = () =>{
    
    const dayTimeGradient ={
        background: "rgb(66,75,28)",
        background: "linear-gradient(0deg, rgba(66,75,28,1) 0%, rgba(125,214,55,1) 53%, rgba(131,223,242,1) 63%, rgba(45,217,251,1) 100%)"  
        
    }
    const nightTimeGradient ={
        background: "rgb(16,43,19)",
        background: "linear-gradient(0deg, rgba(16,43,19,1) 0%, rgba(52,149,91,1) 53%, rgba(54,64,173,1) 63%, rgba(15,100,201,1) 100%)"
    }
    const duskGradient = {
        background: "rgb(8,29,10)",
        background: "linear-gradient(0deg, rgba(8,29,10,1) 0%, rgba(15,84,44,1) 53%, rgba(168,96,48,1) 63%, rgba(34,65,94,1) 100%)"
    }
    const dawnGradient = {
        background: "rgb(19,48,16)",
        background: "linear-gradient(0deg, rgba(19,48,16,1) 0%, rgba(45,110,75,1) 53%, rgba(219,141,126,1) 63%, rgba(109,136,170,1) 100%)",
    }
    var gradient = dayTimeGradient;
    /**
     * checks the current date
     */
    const d = new Date();

    /**
     * checks the current time from the hour
     */
    let hour = d.getHours();
    /**
     * the timings set by Catpocalypse members of when day, night,dawn and dusk is defined
     */
    if (hour >= 20 || hour < 5){
        gradient = nightTimeGradient;
    }
    if (hour >= 5 && hour < 6){
        gradient = dawnGradient;
    }
    if (hour >= 6 && hour < 19){
        gradient = dayTimeGradient;
    }
    if (hour >= 19 && hour < 20){
        gradient = duskGradient;
    }
    return (gradient);
} 

/**
 * The main function for CatchingCat.js
 * @param {catId} param {callback} 
 * @returns gets activated when the user clicks on a cat on the map and displays the cat which needs to be caught
 */ 
export default function CatchingCat({
     catId: wildCatId = 1,
     callback=null
 }){
     const [showCatnip, setShowCatnip] = useState(false);
     const [hookAnimState, setHookAnimState] = useState(-1)
     const [failHookAnimState, setFailHookAnimState] = useState(-1)
     const [successModal, setSuccessModal] = useState(false)
     const [wildCatData, setWildCatData] = useState(null);
     const [catNipUses, setCatNipUses] = useState({weak: 30, apprentice: 10, journeyman: 5});
     const [selectedCatnip, setSelectedCatnip] = useState("Weak")
     /**
      * Animation of the hook which comes down from the top of the screen after satisfying certian conditions
      */
     const hookAnim = useSpring({
        from: {
            bottom: "1000px",
            
        },
        to: {
            bottom: "200px",
            
        },
        reverse: hookAnimState == 1,
        pause: hookAnimState == 2 || hookAnimState < 0,
        delay: 0,
        onRest: () => {
            setHookAnimState(hookAnimState+1);
            setSuccessModal(true);
        },
      })
      
      const failhookAnim = useSpring({
        from: {
            bottom: "1000px",
            
        },
        to: {
            bottom: "200px",
            
        },
        reverse: failHookAnimState == 1,
        pause: failHookAnimState == 2 || failHookAnimState< 0,
        delay: 0,
        onRest: () => {
            setFailHookAnimState(failHookAnimState+1);
        },
      })

    /**
     Variable which will close the window
     */
    const closeWindow = () => {
        if (callback!=null){
            callback();
        }
    }

    /**
     * The API call from the backend to return the cats
     */
    const getWildCatData = () =>{
        fetch(`/api/wildcat/${wildCatId}`)
		.then(response => response.json())
		.then(data => {setWildCatData(data); console.log(data);})
    }

    /**
     * The API call from backend which allows the catching of cats to occur
     */
    const collectCat = () =>{
		const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                wildcat_id: wildCatId
            }),
        };
        
		fetch('/api/send-cats', requestOptions)
		.then(response => response.json())
		.then(data => console.log(data))
  	}

    if (wildCatData == null){
        console.log("Getting data " + wildCatId)
        getWildCatData()
        console.log(wildCatData)
        return (<LoadingScreen/>);
    }

    /**
     * 
     * @returns Different types of Catnips gives the different probabilities of the cat being caught.
     */
    const tryCatch = () =>{
        setShowCatnip(false);
        if (hookAnimState == 0 || failHookAnimState == 0 || hookAnimState == 1 || failHookAnimState == 1){
            return;
        }
        var catchChance = 20
        switch(selectedCatnip){

        }
        switch (selectedCatnip) {
            case "Weak":
                catchChance = 20
                break;
            case "Apprentice":
                catchChance = 40
                break;
            case "Journeyman":
                catchChance = 80
                break
        }
        if (getIntRandomRange(0,100) < catchChance){
            setHookAnimState(0);
        }else{
            setFailHookAnimState(0);
        }
    }

    /**
     * 
     * @returns Renders use depending on the type of catnip available
     */
    const renderUses = () =>{
        switch (selectedCatnip) {
            case "Weak":
                return catNipUses.weak;
            case "Apprentice":
                return catNipUses.apprentice;
            case "Journeyman":
                return catNipUses.journeyman;
            default:
                break;
        }
    }
    /**
     * Returns a modal window once the cat has been successfully caught, a sliding window for the Catnips, radio buttons for catching. 
     */
     console.log(`current catnip: ${showCatnip}`);
     return (
        <div style={{
             ...chooseGradient(), 
             width: "100%",
             height: "100%"
        }}>
            <FallingLeaves/>
            <ShrubBackground/>
                <ModalWindow 
				title="CATCHA!" 
				content="You caught a cat!" 
                open={true}
				openState={successModal}
				onClick={_=>{ 
                    collectCat();
                    closeWindow();
                }}
				buttonText="Continue"
				/>
                <CatLabel wildCatData={wildCatData} hookAnimState={hookAnimState}/>
                <Cat wildCatData={wildCatData} hookAnimState={hookAnimState}/>
                <SlideHorizontalWindow
                open={showCatnip}
                callback={() => {
                    setShowCatnip(false);
                }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={4} alignItems="center">
                            <Catnip type="Weak" catNipUses={catNipUses}  setSelectedCatnipCallback = {setSelectedCatnip} setShowCatnipCallback={setShowCatnip}/>
                        </Grid>
                        <Grid item xs={4} alignItems="center">
                            <Catnip type="Apprentice" catNipUses={catNipUses} setSelectedCatnipCallback = {setSelectedCatnip} setShowCatnipCallback={setShowCatnip}/>
                        </Grid>
                        <Grid item xs={4} alignItems="center">
                            <Catnip type="Journeyman" catNipUses={catNipUses} setSelectedCatnipCallback = {setSelectedCatnip} setShowCatnipCallback={setShowCatnip}/>
                        </Grid>
                    </Grid> 
                </SlideHorizontalWindow>

            <OverlayUI>
                <IconButton
                style={{
                    display: hookAnimState < 1 ? "block" : "none"
                }}
                variant="h4"
                x="0px"
                y="0px"
                size="large"
                anchor = "top left"
                onClick={() => {
                    closeWindow();
                }}
                >
                    <ArrowBackRounded style = {{color:'white'}}/>
                    <Typography variant="h4" component="h4" style={{color: "white"}}>Back</Typography>
                </IconButton>
                <div
                x="20px"
                y="20px"
                anchor = "bottom right"
                style={{
                    display: hookAnimState < 1 ? "block" : "none"
                }}
                >
                    <IconButton
                    variant="contained"
                    size="large" 
                    style={{ 
                        borderRadius: 500, 
                        background: "rgba(255, 255, 255, 0.5)" 
                    }}
                    fullWidth={true}
                    onClick={() => {
                        setShowCatnip(true);
                        //console.log(`Setting catnip on Click: ${showCatnip}`);
                    }}
                    >
                        <Button
                        variant="contained"
                        disabled
                        style={{
                            position: "absolute",
                            bottom: "0px",
                            backgroundColor: "#000",
                            borderRadius: 50,
                            color: "#FFF"
                        }}
                        >x{renderUses()}
                        </Button>
                        <img src={getCatnipImg(selectedCatnip)} style={{padding: "3px"}}width={40}/>
                        
                    </IconButton>
                    
                </div>
                <div
                y="100px"
                anchor = "bottom middle"
                style={{
                    display: hookAnimState < 1 ? "block" : "none"
                }}
                >
                    <div className="center">
                        <IconButton
                        variant="contained"
                        size="large" 
                        style={{ 
                            borderRadius: 500, 
                            background: "rgba(255, 255, 255, 0.5)" 
                        }}
                        fullWidth={true}
                        onClick={() => {
                            var currentUse = 0
                            switch (selectedCatnip) {
                                case "Weak":
                                    currentUse = catNipUses.weak;
                                case "Apprentice":
                                    currentUse =catNipUses.apprentice;
                                case "Journeyman":
                                    currentUse =catNipUses.journeyman;
                                default:
                                    break;
                            }
                            if(currentUse <= 0){
                                return;
                            }
                            tryCatch();
                            setCatNipUses({
                                weak: selectedCatnip == "Weak" ? catNipUses.weak-1 : catNipUses.weak,
                                apprentice: selectedCatnip == "Apprentice" ? catNipUses.weak-1 : catNipUses.apprentice,
                                journeyman: selectedCatnip == "Journeyman" ? catNipUses.journeyman-1 : catNipUses.journeyman
                            });
                        }}
                        >
                            <GameIcon src="fishingRod" height={100} width={100}/>
                            
                        </IconButton>
                    </div>
                    
                </div>
                <animated.img 
                y="200px"
                anchor = "bottom middle"
                src={HookImg} 
                width={200}
                style={hookAnim}
                /> 
                <animated.img 
                y="200px"
                anchor = "bottom middle"
                src={HookImg} 
                width={200}
                style={failhookAnim}
                /> 
                <animated.img 
                y="200px"
                anchor = "bottom middle"
                src={loadCatImageFromId(wildCatData.cat_id)} 
                width={120}
                style={{
                    ...hookAnim,
                    display: hookAnimState == 1 ? "block" : "none"
                }}
                />        
            </OverlayUI>
        </div>
     );
     
 }
