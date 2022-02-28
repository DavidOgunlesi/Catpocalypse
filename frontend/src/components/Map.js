//import ReactDOM from "react-dom";
import React from "react";
import {
  GoogleMap,
  LoadScript
} from "@react-google-maps/api";

const lib = ["places"];
const id = ["64f4173bca5b9f91"]
const key = "AIzaSyDv-LEbSc-bYO2UUkBXmiJ-l846ItAKhL4&map_id=64f4173bca5b9f91";
const defaultLocation = { lat: 50.736603, lng: -3.533233};

export default class Map extends React.Component {
  render() {
    return (
      <div>
       <LoadScript googleMapsApiKey={key} libraries={lib} mapIds={id} >
        <GoogleMap
          center={defaultLocation}
          zoom={19}
          options={{ mapId: "64f4173bca5b9f91" }}
          mapContainerStyle={{ height: "100vh", width: "100%" }}
        />
        </LoadScript>
      </div>
    );
  }
}