/**
 * Returns Cat markers on the app on the Map View when the user is playing the game
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React, {Component} from "react";
import MissingCat from "/static/images/cats/undefined.png";
import {getRandomRange} from '/src/util/math.js'

/**
 * Main Function of CatMapMarker.js
 * @returns The cat image which bounces on the interactive map
 */
export default class CatMapMarker extends Component{
    constructor(props) {
        super(props);
        var randomBounceTime = getRandomRange(0.3,1);
        var style = {
            animation: `bounce ${randomBounceTime}s infinite alternate`,
            webkitAnimation: `bounce ${randomBounceTime}s infinite alternate`
        }
        this.state = {
            style: style,
          };
        this.loadCatImageFromId = this.loadCatImageFromId.bind(this);
      }
    
    /**
     * Loads a cat image from the appropriate id
     */
    
    loadCatImageFromId(id){
        return `/static/images/cats/${id}.png`
    }  
    render() {
    return (
        <div class="markerImg">
            <object data={this.loadCatImageFromId(this.props.id)} width={this.props.size} style={this.state.style} type="image/png">
                <img width={this.props.size} src={MissingCat} style={this.state.style}/>
            </object>
        </div>
    );
}
    
}