import React, {useEffect, useState} from "react";
import ModalWindow from "./dynamic/ModalWindow";
import warningCat from '/static/images/warningCat.png';
import { geolocated } from "react-geolocated";
import GoogleMapReact from 'google-map-react';
import Background from "./static/Background";
import HorizontalCompass from "./dynamic/HorizontalCompass";

const lib = ["places"];
const id = ["64f4173bca5b9f91"]
const key = "AIzaSyDv-LEbSc-bYO2UUkBXmiJ-l846ItAKhL4&map_id=64f4173bca5b9f91&v=beta";
const defaultLocation = { lat: 50.736603, lng: -3.533233};
import MapMarker from "./static/MapMarker";

var map ,maps = null;

function Map(gps){
  var mouseDiv = document.getElementById("mouseDiv");
  $(mouseDiv).on("mousemove", function(e) {
      if (e.which == 1) {
          console.log("X: " + e.pageX + " Y: " + e.pageY);
      }
  });
    const [gpsEnabled, setGpsEnabled] = useState(gps.isGeolocationEnabled);
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);

    //Create state for Player GPS
    const [playerGPSData, setPlayerGPSData] = useState({
        lat: null, 
        lng: null,
        altitude: null,
        heading: null,
        speed: null
    })
    
    function handleApiLoaded(_map, _maps){
        // use map and maps objects
        // Initialise map object and assign to global variable
        map = _map;
        maps = _maps;
        //map.setMapTypeId('hybrid');
        map.setTilt(55);
      };

    //Get GPS data from geolocated and update state
    function refeshGPSData(){
      setIsOnline(window.navigator.onLine);
      setGpsEnabled(gps.isGeolocationEnabled)
      if(gps.coords == null){
        return;
      }
      console.log(playerGPSData);
      const lat = gps.coords.latitude;
      const lng = gps.coords.longitude;
      const altitude = gps.coords.altitude;
      const heading = gps.coords.heading;
      const speed = gps.coords.speed;

      setPlayerGPSData({
        lat:lat, 
        lng:lng,
        altitude: altitude,
        heading: heading,
        speed: speed
      })

      if (playerGPSData.lat == null ||  playerGPSData.lng == null){
        return;
      }
      if (map == null){
        return;
      }

      slowPanTo(map ,new maps.LatLng(playerGPSData.lat,playerGPSData.lng),30,10);
    }

    //Run refresh every second
    useEffect(() => {
        var timerID = setInterval(() =>  refeshGPSData(), 1000);
        return () => clearInterval(timerID);
    });
    /**
     * WARNINGS
     */
    console.log("ONLINE" + isOnline);
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

    var lastMouseX = 0;
    function saveMouseX(e){
      console.log("saved mouseX:", e.clientX);
      lastMouseX = e.clientX;
    }
    function rotateMap(e){
      if (e.which == 1) {
        console.log("X: " + e.pageX + " Y: " + e.pageY);
      }
      console.log("X: " + e.pageX + " Y: " + e.pageY);
      console.log("mouse location:", e.clientX, e.clientY);
      //const mousePosXDelta = e.clientX - lastMouseX;
      //map.setHeading(map.getHeading() + mousePosXDelta);
      //console.log("mouse delta:", mousePosXDelta);
    }

    /**
     * MAIN MAP HTML
     */
    return (
        <div style={{ height: '100vh', width: '100%' }} onMouseMove={rotateMap}>
        <HorizontalCompass />
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
                gestureHandling: "cooperative"
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <MapMarker
              lat={playerGPSData.lat+0.0003}
              lng={playerGPSData.lng+0.0003}
              markerType="cat"
            />
            <MapMarker
              lat={playerGPSData.lat}
              lng={playerGPSData.lng}
              markerType="player"
            />
          </GoogleMapReact>
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