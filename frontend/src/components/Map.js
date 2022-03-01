import React, {useEffect} from "react";
import {
  GoogleMap,
  LoadScript,
  Marker
} from "@react-google-maps/api";
import ModalWindow from "./dynamic/ModalWindow";
import warningCat from '/static/images/warningCat.png';
import { geolocated } from "react-geolocated";
import Cat from "/static/images/cat.png";

const lib = ["places"];
const id = ["64f4173bca5b9f91"]
const key = "AIzaSyDv-LEbSc-bYO2UUkBXmiJ-l846ItAKhL4&map_id=64f4173bca5b9f91";
const defaultLocation = { lat: 50.736603, lng: -3.533233};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends React.Component{
    render() {
        return (
            <div>
                <ModalWindow 
                title="Be aware of your surroundings" 
                content="Ensure you are observant of your environment around campus as you play Catpocalypse" 
                open={true}
                imageSrc = {warningCat}
                /> 
            <LoadScript googleMapsApiKey={key} libraries={lib} mapIds={id} >
            <GoogleMap
                center={defaultLocation}
                zoom={20}
                options= {{ 
                    mapId: "64f4173bca5b9f91", 
                    draggable: false,  
                    disableDefaultUI: true,
                    //rotateControl: true,
                    //rotateControlOptions: true
                }}
                defaultOptions={{mapTypeControl: false}}
                mapContainerStyle={{ height: "100vh", width: "100%" }}
            >
                <Marker position={{ lat: 50.736603, lng: -3.533233 }} icon={{url: Cat}} animation={1}/>
            </GoogleMap>
            </LoadScript>
            </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Map);