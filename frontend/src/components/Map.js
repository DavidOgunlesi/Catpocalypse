import React, {useEffect, useState} from "react";
import ModalWindow from "./dynamic/ModalWindow";
import warningCat from '/static/images/warningCat.png';
import { geolocated } from "react-geolocated";
import GoogleMapReact from 'google-map-react';
import Background from "./static/Background";
import HorizontalCompass from "./dynamic/HorizontalCompass";
import { useDrag, useGesture } from '@use-gesture/react'
import SettingsIcon from '@material-ui/icons/Settings';
import MenuButtonImg from '/static/images/MApMenuButton.png';
import PlayerMarker from '/static/images/marker.png';
import MapMarker from "./static/MapMarker";
import {IconButton, Button, Typography} from '@material-ui/core'
import OverlayUI from "./dynamic/OverlayUI";
import SlideUpWindow from "./dynamic/SlideUpWindow";
import SettingsPage from "./SettingsPage";
import GameIcon from "./GameIcon";
import { CircleMenu, CircleMenuItem, TooltipPlacement } from "react-circular-menu";
import { useSpring, animated } from 'react-spring';
import Battle from "./subpages/Battle";
import Catdex from "./subpages/Catdex";
import CatPlayerInventory from "./subpages/CatPlayerInventory";
import Catsino from "./subpages/Catsino";
import Friends from "./subpages/Friends";
import Shop from "./subpages/Shop";

const lib = ["places"];
const id = ["64f4173bca5b9f91"]
const key = "AIzaSyDv-LEbSc-bYO2UUkBXmiJ-l846ItAKhL4&map_id=64f4173bca5b9f91&v=beta";
const defaultLocation = { lat: 50.736603, lng: -3.533233};


var map, maps = null;

function Map(gps){
	const [gpsEnabled, setGpsEnabled] = useState(gps.isGeolocationEnabled);
	const [isOnline, setIsOnline] = useState(window.navigator.onLine);
	const [showSettings, setSettings] = useState(false);
	const [showMapMenu, setMapMenu] = useState(false);
	const [currentSubMenu, setSubMenu] = useState("none");
	const inputRef = React.useRef(null)

	var mouseX, lastHeading = 0;
	/*const drag = useDrag(({ down, movement: [mx, my] }) => {
		map.setHeading(map.getHeading() -  mx);
		console.log({ x: down ? mx : 0, y: down ? my : 0 });
	})*/

	const onMouseDown = ({xy: [mx, my] }) =>{
		mouseX = mx;
		lastHeading = map.getHeading();
		// console.log(`setting mouseX: ${mouseX} last Heading:${lastHeading}`);
	};

	const onDrag = ({ down, xy: [mx, my], delta: [dmx, dmy] }) => {
		var mouseDelta =  mx - mouseX;
		map.setHeading(lastHeading -  mouseDelta/10);
		//console.log(`mouseX: ${mouseX}`)
		//console.log(`mouseDelta: ${mouseDelta}`);
		//console.log({ x: down ? mx : 0, y: down ? my : 0 });
	};

	const drag2 = useGesture(
		{
		  onDrag: onDrag,
		  onDragStart: onMouseDown,
		}
	  );

  	var playerGPSData = {
		lat: null, 
		lng: null,
		altitude: null,
		heading: null,
		speed: null
	};

    //Run refresh every second
	useEffect(() => {
		var timerID = setInterval(() =>  {
			refeshGPSData();
			hideBadElements();
		}, 1000);
		return () => clearInterval(timerID);
	});
    
	const handleApiLoaded = (_map, _maps) =>{
		// use map and maps objects
		// Initialise map object and assign to global variable
		map = _map;
		maps = _maps;
		map.setTilt(75);
	};

	/*
	* Hides elements associated with radial menu, so all the buttons can be clicked
	* Elemnts it forcibly hides cover one row of buttons due to the hacky setup I
	* created. But it works without issues so if not broken why fix it! 
	*/
	const hideBadElements = () =>{
		var collection = document.getElementsByClassName("sc-dkPtRN kZbNWb");
		for (let index = 0; index < collection.length; index++) {
			const element = collection.item(index);
			element.style.display = "none";
			element.style.visibility = "hidden";
			
		}
	}

	//Get GPS data from geolocated and update state
	const refeshGPSData = () =>{
		setIsOnline(window.navigator.onLine);
		setGpsEnabled(gps.isGeolocationEnabled);
		if(gps.coords == null){
			return;
		}
		//console.log(playerGPSData);
		const lat = gps.coords.latitude;
		const lng = gps.coords.longitude;
		const altitude = gps.coords.altitude;
		const heading = gps.coords.heading;
		const speed = gps.coords.speed;

		playerGPSData = {
			lat: lat, 
			lng: lng,
			altitude: altitude,
			heading: heading,
			speed: speed
		};

		if (playerGPSData.lat == null ||  playerGPSData.lng == null){
			return;
		}
		if (map == null){
			return;
		}
		defaultLocation
		// slowPanTo(map, new maps.LatLng(defaultLocation.lat, defaultLocation.lng),30,10);
		slowPanTo(map ,new maps.LatLng(playerGPSData.lat,playerGPSData.lng),30,10);
	}

  	const renderCats = () =>{
		var cats = [];
		fetch('/api/get-cats')
		.then(response => response.json())
		.then(data => {
			for(var i = 0; i < data.length; i++) {
				var cat = data[i];
				cats.push(
					<MapMarker
						lat={cat.latitude}
						lng={cat.longitude}
						markerType="cat"
						size={120}
						id={cat.cat_id}
					/>
				);
			}
		})
		return cats;
  	}

	const renderTransparentBackground = () =>{
		return (
			<animated.div 
				style={useSpring({
					to: {
						position: "absolute",
						width: "100%",
						height: "100%",
						top: 0,
						overflow: "hidden",
						display: showMapMenu ? "block" : "none",
						backdropFilter: showMapMenu ? " blur(5px) brightness(70%) hue-rotate(120deg)" : null,
						zIndex: 10000,
						touchAction: "none",
						backgroundImage: "radial-gradient(circle at bottom right, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0))"
					},
					delay: 0,
				})}
			>
			</animated.div>
		);
		
	}

	const renderOverlayUI = () => {
		return (
			<div>
			<OverlayUI>
				<div  x="55%" y="50%" sortingLayer={1000}>
					<img src={PlayerMarker} width={50} style={{
						position:"absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						margin: "auto"
					}}/>
				</div>
				
				<div 
				x="-100px"
				y="-100px"
				anchor="bottom right"
				sortingLayer= {20010}
				>
					<CircleMenu
					startAngle={200}
					rotationAngle={70}
					itemSize={4}
					radius={10}
					menuToggleElement={
						<IconButton
							size="large"
							color = 'primary' 
							variant="text"
							disableElevation={true}
						>
						<img src={MenuButtonImg} width={200}/>
						</IconButton>
					}
					onMenuToggle={(menuActive)=>{
						setMapMenu(menuActive);
						inputRef.current.click();
					}}
					/**
					 * rotationAngleInclusive (default true)
					 * Whether to include the ending angle in rotation because an
					 * item at 360deg is the same as an item at 0deg if inclusive.
					 * Leave this prop for angles other than 360deg unless otherwise desired.
					 */
					rotationAngleInclusive={true}
					>
					<CircleMenuItem
					onClick={() => setSubMenu("catdex")}
					tooltip="Catdex"
					tooltipPlacement={TooltipPlacement.Top}
					>
						<GameIcon src="catdex"/>
					</CircleMenuItem>
					<CircleMenuItem 
					onClick={() => setSubMenu("cats")}
					tooltip="Cats" 
					tooltipPlacement={TooltipPlacement.Top}
					>
						<GameIcon src="cats"/>
					</CircleMenuItem>
					<CircleMenuItem 
					onClick={() => setSubMenu("battle")}
					tooltip="Battle" 
					tooltipPlacement={TooltipPlacement.Top}
					>
						<GameIcon src="battle"/>
					</CircleMenuItem>
					</CircleMenu>
					</div>
			</OverlayUI>
			<OverlayUI>
				<div 
				className="transparentCircle"
				zIndex={100000}
				/>
				<div 
				x="-100px"
				y="-100px"
				anchor="bottom right"
				sortingLayer= {20000}
				>
					<CircleMenu
					startAngle={200}
					rotationAngle={70}
					itemSize={4}
					radius={20}
					menuToggleElement={
						<IconButton
							size="large"
							color = 'primary' 
							variant="text"
							disableElevation={true}
							ref={inputRef}
						>
						<img src={MenuButtonImg} width={200}/>
						</IconButton>
					}
					/**
					 * rotationAngleInclusive (default true)
					 * Whether to include the ending angle in rotation because an
					 * item at 360deg is the same as an item at 0deg if inclusive.
					 * Leave this prop for angles other than 360deg unless otherwise desired.
					 */
					rotationAngleInclusive={true}
					>
					<CircleMenuItem
					onClick={() => setSubMenu("friends")}
					tooltip="Friends"
					tooltipPlacement={TooltipPlacement.Top}
					>
						<GameIcon src="friends"/>
					</CircleMenuItem>
					<CircleMenuItem 
					onClick={() => setSubMenu("shop")}
					tooltip="Shop"
					tooltipPlacement={TooltipPlacement.Top}
					>
						<GameIcon src="shop"/>
					</CircleMenuItem>
					<CircleMenuItem 
					onClick={() => {
						setSubMenu("catsino");
						console.log(currentSubMenu);
					}}
					tooltip="Catsino"
					tooltipPlacement={TooltipPlacement.Top}
					>
						<GameIcon src="catsino"/>
					</CircleMenuItem>
					</CircleMenu>
					
					</div>
			</OverlayUI>
			</div>
		);
	}

	const renderSettingsButton = () =>{
		return (
			<div
			style={{
				display: showMapMenu ? "block" : "none"
			}}
			>
			<OverlayUI>
				<IconButton 
					x="0px"
					y="140px"
					anchor="top right"
					sortingLayer={30000}
					size="large"
					color = 'primary' 
					variant="text"
					style={{ borderRadius: 50 }}
					onClick={() => setSubMenu("settings")}
				>
				<animated.div
				style={useSpring({
					from:{
						opacity: 0
					},
					to: {
						opacity: 1
					},
					delay: 1000,
				})}
				>
					<Typography variant="h4" component="h4" style={{color:'white'}}>Settings</Typography>
				</animated.div>
				<animated.div
				style={useSpring({
					from:{
						opacity: 0,
						transform:" rotate(0deg)",
					},
					to: {
						transform: "rotate(180deg)",
						opacity: 1,
					},
					delay: 1000,
				})}
				>
					<SettingsIcon style={{color:'white'}}/>
				</animated.div>
				</IconButton>
			</OverlayUI>
			</div>
		);
	}

	const renderSubMenus = () => {
		var page = (<SettingsPage/>)
		var title = ""
		switch (currentSubMenu) {
			case "settings":
				page = (<SettingsPage/>)
				title = "Settings"
				break;
			case "catdex":
				page = (<Catdex/>)
				title = "Catdex"
				break;
			case "catinv":
				page = (<CatPlayerInventory/>)
				title = "Cats"
				break;
			case "battle":
				page = (<Battle/>)
				title = "Battle"
				break;
			case "friends":
				page = (<Friends/>)
				title = "Friends"
				break;
			case "shop":
				page = (<Shop/>)
				title = "Shop"
				break;
			case "catsino":
				page = (<Catsino/>)
				title = "Catsino"
				break;
			default:
				break;
			}
		console.log(page)
		return (
			<div>
				<SlideUpWindow
				open={currentSubMenu != "none"}
				title={title}
				callback={() => setSubMenu("none")}
				blur={true}
				content={page}
				textColor = "#fff"
				/>
				</div>
		);
	}
  /**
   * WARNINGS
   */
	if(!isOnline){
		return(
			<Background 
			gradient={false} 
			primaryCol="#FEEAC2" 
			outlineCol="#FFC992" 
			outlineThickness={200}
			skew={-32}
			backgroundCol="#FFF59D"
			>
				<ModalWindow 
				title="Cannot Connect To Server" 
				content="You have lost connection to the server. Please check your internet connection." 
				open={true}
				onClick={_=>{ window.location.reload();}}
				buttonText="Refresh"
				/>
			</Background>
		);
	}
	if(!gpsEnabled){
		return(
			<Background 
			gradient={false} 
			primaryCol="#FEEAC2" 
			outlineCol="#FFC992" 
			outlineThickness={200}
			skew={-32}
			backgroundCol="#FFF59D"
			>
				<ModalWindow 
				title="Location Not Enabled :(" 
				content="Ensure you have turned on location in your respective device browser settings." 
				open={true}
				imageSrc = {warningCat}
				onClick={_=>{ window.location.reload();}}
				buttonText="Refresh"
				/>
			</Background>
		);
	}

	/**
	 * MAIN MAP HTML
	 */
	/**
	 * import Battle from "./Battle";
import Catdex from "./Catdex";
import CatPlayerInventory from "./CatPlayerInventory";
import Catsino from "./Catsino";
import Friends from "./Friends";
import Shop from "./Shop";
	 */
	return (
		<div>
			{renderSubMenus()}
			<div style={{ height: '100vh', width: '100%', touchAction: "none" }} {...drag2()} >
			<HorizontalCompass mapObj={map}/>
			{renderOverlayUI()}
			{renderTransparentBackground()}
			{renderSettingsButton()}
			<ModalWindow 
			title="Be aware of your surroundings" 
			content="Ensure you are observant of your environment around campus as you play Catpocalypse" 
			open={true}
			imageSrc = {warningCat}
			/> 
			<GoogleMapReact
			bootstrapURLKeys={{ key: key }}
			defaultCenter={defaultLocation}
			defaultZoom={19}
			options= {{ 
				mapId: id, 
				draggable: false,  
				disableDefaultUI: true,
				keyboardShortcuts: false,
				gestureHandling: "greedy"
			}}
			yesIWantToUseGoogleMapApiInternals
			onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
			>
			{renderCats()}
			</GoogleMapReact>
			</div>
		</div>
	);
    
}

//Wrap Map component with geolocated so we can get gps information
export default geolocated({
	positionOptions: {
		enableHighAccuracy: true,
	},
	//determines how much time (in miliseconds) we give the 
	//user to make the decision whether to allow to share 
	//their location or not
	userDecisionTimeout: 15000,
	watchPosition: true,
})(Map);

/*
map: your google.maps.Map object

endPosition: desired location to pan to, google.maps.LatLng

n_intervals: number of pan intervals, the more the smoother the transition but the less performant

T_msec: the total time interval for the slow pan to complete (milliseconds)
*/
var slowPanTo = function(map, endPosition, n_intervals, T_msec) {
	var f_timeout, getStep, i, j, lat_array, lat_delta, lat_step, lng_array, lng_delta, lng_step, pan, ref, startPosition;
	getStep = function(delta) {
		return parseFloat(delta) / n_intervals;
	};
	startPosition = map.getCenter();
	lat_delta = endPosition.lat() - startPosition.lat();
	lng_delta = endPosition.lng() - startPosition.lng();
	lat_step = getStep(lat_delta);
	lng_step = getStep(lng_delta);
	lat_array = [];
	lng_array = [];
	for (i = j = 1, ref = n_intervals; j <= ref; i = j += +1) {
		lat_array.push(map.getCenter().lat() + i * lat_step);
		lng_array.push(map.getCenter().lng() + i * lng_step);
	}
	f_timeout = function(i, i_min, i_max) {
		return parseFloat(T_msec) / n_intervals;
	};
	pan = function(i) {
	if (i < lat_array.length) {
		return setTimeout(function() {
			map.panTo(new google.maps.LatLng({
				lat: lat_array[i],
				lng: lng_array[i]
			}));
			return pan(i + 1);
		}, f_timeout(i, 0, lat_array.length - 1));
	}
	};
	return pan(0);
};