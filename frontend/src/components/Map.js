/**
 * Renders the Map Page of Catpocalypse using Google Map API which allows the player to continue the game
 */
/**
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React, {useEffect, useState} from "react";
import ModalWindow from "./dynamic/ModalWindow";
import warningCat from '/static/images/warningCat.png';
import { geolocated } from "react-geolocated";
import GoogleMapReact from 'google-map-react';
import Background from "./static/Background";
import HorizontalCompass from "./dynamic/HorizontalCompass";
import {useGesture } from '@use-gesture/react'
import SettingsIcon from '@material-ui/icons/Settings';
import MenuButtonImg from '/static/images/MApMenuButton.png';
import PlayerMarker from '/static/images/marker.png';
import MapMarker from "./static/MapMarker";
import {IconButton, Typography} from '@material-ui/core'
import OverlayUI from "./dynamic/OverlayUI";
import SlideUpWindow from "./dynamic/SlideUpWindow";
import SettingsPage from "./SettingsPage";
import GameIcon from "./GameIcon";
import { CircleMenu, CircleMenuItem, TooltipPlacement } from "react-circular-menu";
import Battle from "./subpages/Battle";
import Catdex from "./subpages/Catdex";
import Catsino from "./subpages/Catsino";
import Friends from "./subpages/Friends";
import Shop from "./subpages/Shop";
import CatchingCat from "./CatchingCat";
import LoadingScreen from "./static/LoadingScreen";

/**
 * Variables which cannot be reassigned. This includes the API key, ID and the fixed location of the center of campus as decided by the team of Catpocalypse
 */
const lib = ["places"];
const id = ["64f4173bca5b9f91"]
/**
 * The key from the Google Maps API and also one of their libraries which includes the "&libraries=geometry" URL parameter.
 */
const key = "AIzaSyDv-LEbSc-bYO2UUkBXmiJ-l846ItAKhL4&map_id=64f4173bca5b9f91&v=beta&libraries=geometry";
/**
 * The default location which has been to the center of the University of Exeter
 */
const defaultLocation = { lat: 50.736603, lng: -3.533233};

var map, maps = null;

/**
 * 
 * @param gps - Takes the player's live location from the mobile device's GPS
 * @returns the map when loading the map view page
 */
function Map(gps){
	/**
	 * Variables which are assigned and cannot be changed
	 */
	const [gpsEnabled, setGpsEnabled] = useState(gps.isGeolocationEnabled);
	const [isOnline, setIsOnline] = useState(window.navigator.onLine);
	const [showMapMenu, setMapMenu] = useState(false);
	const [currentSubMenu, setSubMenu] = useState("none");
	const [currentCatch, setCurrentCatch] = useState(null);
	const [mapLoaded, setMapLoaded] = useState(false);
	const [shownWarning, setshownWarning] = useState(false);
	const [currentHuntTheCat, setCurrentHuntTheCat] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
	const [distanceToHuntTheCat, setDistanceToHuntTheCat] = useState(null);
	const [huntCatVisible, setHuntCatVisible] = useState(false);
	const inputRef = React.useRef(null)

	var mouseX, lastHeading = 0;

	const onMouseDown = ({xy: [mx, my] }) =>{
		mouseX = mx;
		lastHeading = map.getHeading();
	};

	/**
	 * 
	 * A fixed variable which shows the type of drag feature present
	 */
	const onDrag = ({ down, xy: [mx, my], delta: [dmx, dmy] }) => {
		var mouseDelta =  mx - mouseX;
		map.setHeading(lastHeading -  mouseDelta/10);
	};

	/**
	 * Another type of drag feature present
	 */
	const drag2 = useGesture(
		{
		  onDrag: onDrag,
		  onDragStart: onMouseDown,
		}
	  );

	/**
	 * Variable where the Player GPS Data is null
	 */
  	var playerGPSData = {
		lat: null, 
		lng: null,
		altitude: null,
		heading: null,
		speed: null
	};

	/**
	 * Runs refresh every second with this function
	 * It also checks and refresh whenever the map is not null, it will find t
	 * he distance between player position and hunt the cat position
	 */
	useEffect(() => {
		if(userDetails == null){
			checkIfUserLoggedIn();
		}
		var timerID = setInterval(() =>  {
			refeshGPSData();
			hideBadElements();
			if(map != null){
				if(currentHuntTheCat != null){
					var pos1 = new maps.LatLng(currentHuntTheCat.lat, currentHuntTheCat.lng);
					var pos2 = new maps.LatLng(playerGPSData.lat,playerGPSData.lng);
					//var pos2 = new maps.LatLng(defaultLocation.lat, defaultLocation.lng);
					//console.log(maps)
					var distance = maps.geometry.spherical.computeDistanceBetween(pos1, pos2);
					console.log("Distance " + distance + " m")
					setDistanceToHuntTheCat(distance);
					if(distance < 50){
						setHuntCatVisible(true);
					}else{
						setHuntCatVisible(false);
					}
				}
			}
		}, 1000);
		var loadTimerID = setInterval(() =>  {
			if (map != null){
				setMapLoaded(true);
			}
		}, 5000);
		return () => {
			clearInterval(loadTimerID);
			clearInterval(timerID);
		}
	});
    
	const handleApiLoaded = (_map, _maps) =>{
		/**
		 * Uses map and maps objects
		 * Initialise map object and assign it to a global variable
		 */
		map = _map;
		maps = _maps;
		map.setTilt(75);
	};

	/**
     * Ensures if the user is logged in to the system or not.
     * @returns the console will be informed if the user is logged in or not and will be recorded by checking the response received from the backend.
     */
	 function checkIfUserLoggedIn(){
        console.log("Checking...");
        fetch(`/api/isLoggedIn`)
        .then((response) => {
            if (response.ok){
                console.log("Is logged in!");
            }
            return response.json();
        }).then((data) => {
            console.log(data);
            setUserDetails(data);
        });
    }

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

	/**
	 * 
	 * @returns the GPS data from geolocated and update state
	 */
	const refeshGPSData = () =>{
		setIsOnline(window.navigator.onLine);
		setGpsEnabled(gps.isGeolocationEnabled);
		if(gps.coords == null){
			return;
		}
		/**
		 * Variables such as latitude, longtitude, altitude, heading and speed
		 */
		const lat = gps.coords.latitude;
		const lng = gps.coords.longitude;
		const altitude = gps.coords.altitude;
		const heading = gps.coords.heading;
		const speed = gps.coords.speed;

		/**
		 * Gets the GPS data of the player
		 */
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

		//slowPanTo(map, new maps.LatLng(defaultLocation.lat, defaultLocation.lng),30,10);
		slowPanTo(map ,new maps.LatLng(playerGPSData.lat,playerGPSData.lng),30,10);
	}

  	/**
	   * Spawns the cats in a specific size in random locations and fetches the API call from the backend
	   * @returns the cats of Catpocalypse will render on the map as expected
	   */
	const renderCats = () =>{
		var cats = [];
		fetch('/api/get-cats')
		.then(response => response.json())
		.then(data => {
			for(var i = 0; i < data.length; i++) {
				var cat = data[i];
				var thisIsHuntTheCat = cat.is_huntable && (cat.player_1 == userDetails.user_id || cat.player_2 == userDetails.user_id )
				if (currentHuntTheCat == null && thisIsHuntTheCat){
					setCurrentHuntTheCat({
						lat: cat.latitude,
						lng: cat.longitude
					})
					console.log({
						lat: cat.latitude,
						lng: cat.longitude
					})
				}
				cats.push(
					<MapMarker
						lat={cat.latitude}
						lng={cat.longitude}
						markerType="cat"
						size={120}
						id={cat.cat_id}
						wildCatId={cat.wildcat_id}
						invisible={thisIsHuntTheCat && !huntCatVisible}
					/>
				);
			}
		})
		return cats;
  	}

	/**
	 * 
	 * @returns transparent background in the map view
	 */
	  const renderTransparentBackground = () =>{
		return (
			<div 
				style={{
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
					}}
			>
			</div>
		);
		
	}

	const renderMeter = () => {
		if(currentHuntTheCat == null){
			return (null);
		}else{
			const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
			var meterPercentage = clamp(100-((distanceToHuntTheCat-30)/200)*100, 0,100);
			var text = "Cold"
			if (meterPercentage>50){
				text = "Hot"
			}
			return(
				<div 
				className="circular_meter" style={{"--p1": "50%","--p2": "50%","--p3": `${meterPercentage}%`}}>
				{text}
				</div>
			);
		}
	}

	/**
	 * 
	 * @returns Creates a button in the map page which redirects the user to further options 
	 * such as Settings, CatDex, Catsino, Friends and Battle
	 */
	const renderOverlayUI = () => {
		return (
			<div>
			<OverlayUI>
				<div
				x="15px"
				y="100px"
				anchor="top right"
				>
					{renderMeter()}
				</div>
			);
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
						<div>
						<IconButton
							size="large"
							color = 'primary' 
							variant="text"
							disableElevation={true}
							ref={inputRef}
						>
						<img src={MenuButtonImg} width={200}/>
						</IconButton>
						</div>
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

	/**
	 * 
	 * @returns the Settings button once the radio menu is opened - it is present on the top right of the screen
	 */
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
				<div>
					<Typography variant="h4" component="h4" style={{color:'white'}}>Settings</Typography>
				</div>
				<div>
					<SettingsIcon style={{color:'white'}}/>
				</div>
				</IconButton>
			</OverlayUI>
			</div>
		);
	}

	/**
	 * 
	 * @returns Submenus such as CatDex, CatSino, Battle, Friends and Cats
	 */
	const renderSubMenus = () => {
		var page = (<SettingsPage/>)
		var title = ""
		var txtcolor = ""
		var color = ""
		var fillBox = false;
		switch (currentSubMenu) {
			case "settings":
				page = (<SettingsPage/>);
				title = "Settings";
				txtcolor = "#FFF";
				break;
			case "catdex":
				page = (<Catdex/>);
				color = "#FFF";
				txtcolor = "#000";
				fillBox = true;
				break;
			case "battle":
				page = (<Battle/>);
				color = "#FFF";
				txtcolor = "#000";
				fillBox = true;
				break;
			case "friends":
				page = (<Friends/>);
				title = "Friends";
				color = "#FFF";
				txtcolor = "#000";
				break;
			case "shop":
				page = (<Shop/>);
				title = "Shop";
				color = "#FFF";
				txtcolor = "#000";
				break;
			case "catsino":
				page = (<Catsino/>);
				title = "Catsino";
				color = "#FFF";
				txtcolor = "#000";
				break;
			default:
				break;
			}
		return (
			<div>
				<SlideUpWindow
				open={currentSubMenu != "none"}
				title={title}
				callback={() => setSubMenu("none")}
				blur={true}
				content={page}
				textColor = {txtcolor}
				backgroundColor = {color}
				fillBox = {fillBox}
				/>
				</div>
		);
	}

	/**
	 * 
	 * @returns Before the map is loaded, the loading screen shows up
	 */
	const renderLoadingScreen=() =>{
		if (!mapLoaded){
			return(<LoadingScreen/>);
		}
	}

	const showWarningModal = () => {
		if (shownWarning == false){
			return (
				<ModalWindow 
				title="Be aware of your surroundings" 
				content="Ensure you are observant of your environment around campus as you play Catpocalypse." 
				open={true}
				imageSrc = {warningCat}
				onClick={_ => setshownWarning(true)}
				/> 
			);
		}
	}
  /**
   * Conditional Views
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
	/**
	 * Ensures that the location has been turned on, if not an error message is returned
	 */
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
	if(currentCatch != null){
		return (<CatchingCat callback={() => {
			setCurrentCatch(null);
			window.location.reload();
		}
		} catId={currentCatch}/>);
	}

	/**
	 * MAIN MAP HTML
	 */
	 const onCatClick = (key, childProps) => {
		if(!childProps.invisible){
			setCurrentCatch(childProps.wildCatId)
		}
	  }
	return (
		<div>
			{renderLoadingScreen()}
			{renderSubMenus()}
			<div style={{ height: '100vh', width: '100%', touchAction: "none" }} {...drag2()} >
			<HorizontalCompass mapObj={map}/>
			{renderOverlayUI()}
			{renderTransparentBackground()}
			{renderSettingsButton()}
			{showWarningModal()}
			<GoogleMapReact
			onChildClick={(key, childProps) => onCatClick(key, childProps)}
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

/**
 * Wrap Map component with geolocated so we can get gps information
 */

export default geolocated({
	positionOptions: {
		enableHighAccuracy: true,
	},
	/**
	 * determines how much time (in miliseconds) we give the 
	 * user to make the decision whether to allow to share 
	 * their location or not
	 */
	
	userDecisionTimeout: 15000,
	watchPosition: true,
})(Map);


/**
 * Provided by Flaudre on StackOverFlow (https://stackoverflow.com/questions/9335150/slow-down-google-panto-function)
 * @param {*} map  - your google.maps.Map object
 * @param {*} endPosition - desired location to pan to, google.maps.LatLng
 * @param {*} n_intervals - number of pan intervals, the more the smoother the transition but the less performant
 * @param {*} T_msec - : the total time interval for the slow pan to complete (milliseconds)
 * @returns makes slow pan steps from point to point around a map
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