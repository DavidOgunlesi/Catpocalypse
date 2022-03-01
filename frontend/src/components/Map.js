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

const AnyReactComponent = () => <img src={Cat}/>;

function Map(gps){
    //Create state for Player GPS
    const [playerGPSData, setPlayerGPSData] = useState({
        lat: null, 
        lng: null
    })

    
    function handleApiLoaded(map, maps){
        // use map and maps objects
        map.setTilt(45);
      };

    //Get GPS data from geolocated and update state
    function refeshGPSData(){
        if(gps.coords != null){
            const lat = gps.coords.latitude;
            const lng = gps.coords.longitude;
            setPlayerGPSData({lat:lat, lng:lng})
        }
        console.log(playerGPSData);
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
              lat={defaultLocation.lat}
              lng={defaultLocation.lng}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      );
    
}

//Wrap Map component with geolocated so we can get gps information
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Map);