/**
 * The Verify Page shows up when the user clicks on the verification link they received in their email inbox 
 * and would verify the link as a final step for the user to complete their registeration.
 */

/**
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React, {useState} from "react";
import { useParams } from "react-router-dom";
import Background from "./static/Background";
import ModalWindow from "./dynamic/ModalWindow";
import { Grid, TextField, InputAdornment, MenuItem, Select, Button } from "@material-ui/core";

/**
 * The overall function for VerifyPage.js which runs when this page gets rendered.
 * @returns message informing the user if the verification is successful with their username or if unsuccessful, it will return an error message
 * The error message will also provide an opportunity for the user to re-enter their email address for another verification link.
 */
export default function VerifyPage(){

    /**
     * constant variables used as states for verification, including paramters, email address, error message,  verified and the player name.
     */
    const params= useParams();  // storing function as an alias
    var defaultEmail = "@exeter.ac.uk"; // the default domain for each user in the University of Exeter will have "@exeter.ac.uk"
    const [emailStart, setEmailStart] = useState("");
    const [emailEnd, setEmailEnd] = useState(defaultEmail);
    const [verified, setVerified] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [playerName, setPlayerName] = useState("Player");

    /**
     * This function is actual function which checks for the verification from the link the uer has received.
     * @returns response of the verification
     */
    function verify(){
        const token = params.token;
        console.log(token);
        fetch(`/api/email-verify?token=${token}`) // fetches an API and checks if the token is valid or not
        .then((response) => {
            if (!response.ok){
                setVerified(false); // sets the verified state to false
                return response.json();
            }
            console.log("ok!"); // returns the message ok! when the server has been to successfully verify the link.
            setVerified(true); // sets the verified state to true.
            return response.json();
        }).then((data) =>{
            console.log(data); // logs the data in the console log.
            setErrorMsg(data.error);
            setPlayerName(data.username);
        });
    }

    /**
     * resendEmail() is the function which allows the user to re-enter their email address and this is where the user will be able to re-verify their account
     * @returns full email address of the user to the console. 
     */
    function resendEmail() {
        var fullEmail = `${emailStart}${emailEnd}`;
        console.log(fullEmail);
        // Send email to user from backend
    }

    /**
     * Shows a pop- up window to the user with Capocalypse's colour palette as the background
     * @returns the modal window to the user depending on whether the verification has bene successful or not
     * If successful, the user will be able to see a Congratulations message with their username they signed up with
     * If unsuccesful, it will tell the user about the error, allow them to re-enter their email(calls the resendEmail() function) or close the window.
     */
    function renderModalWindow() {
        if (verified) {
            return (<ModalWindow 
                title="Success!" 
                content={`Congratulations ${playerName}! You have successfully verified your account. Come join us in the Catpocalypse World!!`}
                open={true}
    
                />);
        } else {
            /**
             * Error message in the modal window in form of a grid.
             */
            return (
            <div>
                <ModalWindow
                title="Error in Verifying" 
                content={`${errorMsg} We can resend the link to your email address.`} 
                open={true}
                buttonLink="/"
                extraContentBefore={
                    
                    <Grid container spacing={2}>
                    <Grid item xs={12} align="center">
                        <TextField
                            required={true}
                            type = "email"
                            className="inputRounded"
                            placeholder="Email"
                            onChange={e=> setEmailStart(e.target.value)}
                            variant="standard"
                            textalign="center"
                            variant="outlined"
                            size="small"
                            fullWidth={true}
                            style={{
                                background: "white"
                            }}
                            InputProps={{
                                endAdornment: 
                                    <InputAdornment position="start">
                                        <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    fullWidth={true}
                                    value={defaultEmail}
                                    onChange={e=> setEmailEnd(e.target.value)}
                                >
                                    <MenuItem value={defaultEmail}>{defaultEmail}</MenuItem>
                                </Select>
                                </InputAdornment>,
                                }}
                        />
                    </Grid>
                    <Grid item xs ={12}> <Button 
                    color = 'primary' 
                    variant="contained"
                    size="large" 
                    style={{ borderRadius: 50 }}
                    disableElevation={true}
                    fullWidth={true}
                    onClick={_ => {resendEmail()}}
                    >
                        Resend
                    </Button></Grid>
                    </Grid>
                }
                /> 
            </div>);
        }
    }
    /**
     * Calls the verify() function
     */
    verify(); 
    return (
        <Background
        gradient={false} 
        primaryCol="#FEEAC2" 
        outlineCol="#FFC992" 
        outlineThickness={200} 
        skew={-32}
        backgroundCol="#FFF59D"
        >
        {renderModalWindow()}   
        </Background>
    );
}