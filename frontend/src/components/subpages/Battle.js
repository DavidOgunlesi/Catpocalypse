/**
 * A set template used to check if the page is working or not.
 * Imports React from the React Package
 */
import { CircularProgress, Typography } from "@material-ui/core";
import React, {useState} from "react";
import Background from "../static/Background";
import io from "socket.io-client";

export default function Battle(){

    const [foundMatch, setFoundMatch] = useState(false);
    const [socketId, setSocketId] = useState(null);
    const socket = io.connect('http://localhost:4000');
    
    socket.on('connect', connectUser);
    
    socket.on('message', function (data) {
        console.log(data);
    });
      
    function connectUser () {  // Called whenever a user signs in
        var userId = 1  // Retrieve userId
        //  if (!userId) return;
        socket.emit('userConnected', userId);
    }
    
    function disconnectUser () {  // Called whenever a user signs out
    var userId = 1 // Retrieve userId
    if (!userId) return;
    socket.emit('userDisconnected', userId);
    }
    connectUser();
    console.log(socket)

    const renderText = () => {
        if (foundMatch){
            return ("Found Match");
        }else{
            return ("Matchmaking...");
        }
    }
    

    function checkIfUserLoggedIn(){
        console.log("Starting Matchmaking API call");
        var socket_id = socketId

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                id: socket_id
            }),
        };
        fetch(`/api/start-matchmaking`, requestOptions)
        .then((response) => {
            if (response.ok){
                setIsLoggedIn(true);
                console.log("Is logged in!");
            }
            return response.json();
        }).then((data) => {
            console.log(data);
        });
    }
    /**
     * Returns Hello World!
     */
    return (
        <Background 
        gradient={false} 
        primaryCol="#E2FADD" 
        outlineCol="#9EE6C9" 
        outlineThickness={200} 
        skew={-32}
        backgroundCol="#B8FCF3"
        >
            <div className="center">
                <Typography
                variant="h3"
                component="h3"
                style={{
                    fontWeight: 500
                }}
                >
                    {renderText()}
                </Typography>
                <div className="center" style={{top: "100px"}}>
                    <CircularProgress />
                </div>
            </div>
        </Background>
    );
    
}