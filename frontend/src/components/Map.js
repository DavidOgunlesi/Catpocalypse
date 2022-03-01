import React, {Component, useEffect, useState} from "react";
import ModalWindow from "./dynamic/ModalWindow";
import warningCat from '/static/images/warningCat.png';
import { geolocated } from "react-geolocated";
import Cat from "/static/images/cat.png";
import GoogleMapReact from 'google-map-react';

const lib = ["places"];
const id = ["64f4173bca5b9f91"]
const key = "AIzaSyDv-LEbSc-bYO2UUkBXmiJ-l846ItAKhL4&map_id=64f4173bca5b9f91";
const defaultLocation = { lat: 50.736603, lng: -3.533233};

const AnyReactComponent = () => <div><img class="bounce" src={Cat}/></div>;
var map ,maps = null;

function Map(gps){
    //Create state for Player GPS
    //const [mapLocation, setMapLocation] = useState(defaultLocation);
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
        //map.setTilt(map.getTilt() + 45); // doesnt work!
        map = _map;
        maps = _maps;
        //map.setMapTypeId('hybrid');
        //map.setTilt(45);
      };

    //Get GPS data from geolocated and update state
    function refeshGPSData(){
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
     // setMapLocation({lat: playerGPSData.lat, lng: playerGPSData.lng})

      if (playerGPSData.lat == null ||  playerGPSData.lng == null){
        return;
      }
      if (map == null){
        return;
      }

      //mapObject.setCenter({lat: playerGPSData.lat, lng: playerGPSData.lng});
      slowPanTo(map ,new maps.LatLng(playerGPSData.lat,playerGPSData.lng),10,500);
    }

    //Run refresh every second
    useEffect(() => {
        var timerID = setInterval(() => refeshGPSData(), 1000);
        return () => clearInterval(timerID);
    });

    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <ModalWindow 
            title="Be aware of your surroundings" 
            content="Ensure you are observant of your environment around campus as you play Catpocalypse" 
            open={true}
            imageSrc = {warningCat}
            /> 
          <GoogleMapReact
            bootstrapURLKeys={{ key: key }}
            defaultCenter={defaultLocation}
            defaultZoom={20}
            options= {{ 
                mapId: id, 
                draggable: false,  
                disableDefaultUI: true,
                //rotateControl: true,
                //rotateControlOptions: true
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <AnyReactComponent
              lat={playerGPSData.lat}
              lng={playerGPSData.lng}
              text="My Marker"
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
    userDecisionTimeout: 5000,
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