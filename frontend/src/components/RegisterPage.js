/**
 * The Register Page is the page which allows the user to register an account in Catpocalypse.
 * The following page will explain the documentation of what occurs in RegisterPage.js.
 */

/**
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React, {useState} from "react";
import PasswordChecklist from "react-password-checklist";
import {isMobile} from 'react-device-detect';
import Background from "./static/Background";
import logo from '/static/images/logo.png';
import {Link} from "react-router-dom";
import {Button, Grid, Typography, TextField, FormControl, 
    InputAdornment,IconButton, FormHelperText, Select, MenuItem} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import SlideUpWindow from "./dynamic/SlideUpWindow";
import PrivacyPolicy from "./PrivacyPolicy";
import ModalWindow from "./dynamic/ModalWindow";


/**
 * 
 * @returns the Registeration page of Catpocalypse when the user clicks on the "Sign Up" button from the Main Menu.
 */
export default function RegisterPage(){
    
    // constant variables used as states for registration, including username, email address, password, privacy policy amd the error message.
    const defaultEmail = "@exeter.ac.uk";
    const [username, setUsername] = useState("");
    const [emailStart, setEmailStart] = useState("");
    const [emailEnd, setEmailEnd] = useState(defaultEmail);
    const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [showRegisteredModal, setShowRegisteredModal] = useState(false);
    var validPassword = false; // valid password default value is always set as false.


    /**
     * The function checks if username, email, password, passwordAgain have been entered while using password validation as well.
     * If there is any error, the function will return a specific error message for each error which took place.
     * When successful, it will send a POST request to our API which helps in the creation of the account.
     * At the same time, it will inform the user to check for the verification link in their email inbox.
     * Again, if there is any error, the error will be known to the user.
     * While signing up, the user has the option to access the privacy policy of Catpocalypse to check and see what data of theirs is going to taken and how it would be used by the company.
     * @returns Ensures that all fields have been inputted while signing up. 
     */
    function onRegister() {
        if (username=="" || emailStart=="" || password=="" || passwordAgain == "") {
            setErrorMessage("Not all fields have been filled.");
            return;
        }

        if (!validPassword) {
            setErrorMessage("Password doesn't meet criteria.");
            return;
        }
        console.log(username); // Logs the username of the user
        console.log(password); // Logs the password of the user
        const fullEmail = `${emailStart}${emailEnd}`;
        console.log(fullEmail); // Logs the full email address of the user including the domain "exeter.ac.uk"
        /**
         * Receives an API call from the backend
         */
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username:username,
                password:password,
                email: fullEmail
            }),
        };
        
        /**
         * Sends Post request to our API in the backend
         */
        fetch('/api/register', requestOptions)
        .then((response) => {
            if (!response.ok){
                setErrorMessage("Error signing up.");
                return;
            }
            setShowRegisteredModal(true);
            console.log("SENT!");
            return response.json();
        }) //Turn response to json
        .then((data) => console.log(data)); //do stuff with json response data
    }

    /**
     * 
     * @returns A modal window showing that a verification email has been sent to the user's email address as specified in the registration page
     */
    function renderSuccessModal(){
        if (showRegisteredModal) {
            return(
                <ModalWindow
                title="Check your Email!"
                content="Check your email for a verification link."
                open= {true}
                //openState= {showRegisteredModal}
                />
            );
        }
        return null;
    }

    /**
     * Only allows registeration to take place if the user is playing in their mobile and not their desktop.
    /**
     * Returns a pop - up window asking the user to check their email for the verification link.
     */
    if(isMobile){
        return (
            <Background 
            gradient={false} 
            primaryCol="#FEEAC2" 
            outlineCol="#FFC992" 
            outlineThickness={200}
            skew={-32}
            backgroundCol="#FFF59D"
            >
                {renderSuccessModal()}
                <SlideUpWindow
                open={showPrivacyPolicy}
                title="Privacy Policy" 
                textContent={<PrivacyPolicy/>}
                callback={setShowPrivacyPolicy}
                />
                <div className="gradient">
                    <img src={logo} className="logo" alt="Logo" />
                    <div className="center">
                        <Grid container spacing={1}>
                            <Grid item xs={12} align="center">
                                <Typography variant="h3" component="h3">Sign up</Typography>
                            </Grid>
                            <Grid item xs={12} align="center">
                                    <TextField
                                        required={true}
                                        type = "text"
                                        onChange={e => setUsername(e.target.value)}
                                        className="inputRounded"
                                        placeholder="Username"
                                        variant="outlined"
                                        textalign="center"
                                        size="small"
                                        fullWidth={true}
                                        style={{
                                            background: "white"
                                        }}
                                    />
                            </Grid>
                            <Grid item xs={12} align="center">
                                    <TextField
                                        required={true}
                                        type = "email"
                                        className="inputRounded"
                                        placeholder="Email"
                                        onChange={e=> setEmailStart(e.target.value)}
                                        variant="outlined"
                                        textalign="center"
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
                            <Grid item xs={12} align="center">
                                    <TextField
                                        required={true}
                                        type={showPassword  ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="inputRounded"
                                        placeholder="Password"
                                        variant="outlined"
                                        textalign="center"
                                        size="small"
                                        fullWidth={true}
                                        style={{
                                            background: "white"
                                        }}
                                        InputProps={{
                                            endAdornment: 
                                            <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={_=> setShowPassword(!showPassword)}
                                                onMouseDown={e=> e.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                            </InputAdornment>,
                                          }}
                                    />
                                
                            </Grid>
                            <Grid item xs={12} align="center">
                                    <TextField
                                        required={true}
                                        type = "password" 
                                        onChange={e => setPasswordAgain(e.target.value)}
                                        className="inputRounded"
                                        placeholder="Re-enter Password"
                                        variant="outlined"
                                        textalign="center"
                                        size="small"
                                        fullWidth={true}
                                        style={{
                                            background: "white"
                                        }}
                                    />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <FormHelperText variant="filled" error={true}>
                                    {errorMessage}
                                </FormHelperText>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <PasswordChecklist
                                    rules={["minLength","specialChar","number","capital","match"]}
                                    minLength={5}
                                    value={password}
                                    valueAgain={passwordAgain}
                                    onChange={(isValid) => {validPassword = isValid}}
                                    style = {{color:"white"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                color = 'primary' 
                                variant="contained"
                                size="large" 
                                style={{ borderRadius: 50 }}
                                disableElevation={true}
                                disableFocusRipple={true}
                                disableRipple={true}
                                fullWidth={true}
                                onClick={onRegister}
                                >
                                    Sign Up!
                                </Button> 
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                color = 'primary' 
                                variant="contained"
                                size="large" 
                                style={{ borderRadius: 50 }}
                                disableElevation={true}
                                fullWidth={true}
                                component={Link}
                                to="/"
                                >
                                    Back
                                </Button> 
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button 
                                variant="string" 
                                underline="hover" 
                                color = 'primary'  
                                onClick={_ => setShowPrivacyPolicy(true)}
                                >
                                    PRIVACY POLICY
                                </Button>
                            </Grid>
                        </Grid> 
                    </div>
                </div>
            </Background>
        );
    }else {

    }
    
}