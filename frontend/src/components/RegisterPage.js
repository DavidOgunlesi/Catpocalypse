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

export default function RegisterPage(){
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
    var validPassword = false;


    function onRegister() {
        if (username=="" || emailStart=="" || password=="" || passwordAgain == "") {
            setErrorMessage("Not all fields have been filled.");
            return;
        }

        if (!validPassword) {
            setErrorMessage("Password doesn't meet criteria.");
            return;
        }
        console.log(username);
        console.log(password);
        const fullEmail = `${emailStart}${emailEnd}`;
        console.log(fullEmail);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username:username,
                password:password,
                email: fullEmail
            }),
        };
        //send post request to our api!
        fetch('/api/register', requestOptions)
        .then((response) => {
            if (!response.ok){
                setErrorMessage("Error signing up.");
                return;
            }
            setShowRegisteredModal(true);
            return response.json();
        }) //Turn response to json
        .then((data) => console.log(data)); //do stuff with json response data
    }
    
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
                <ModalWindow
                title="Check your Email!"
                content="Check your email for a verification link."
                open= {showRegisteredModal}
                />
                <SlideUpWindow
                open={showPrivacyPolicy}
                title="Privacy Policy" 
                content={<PrivacyPolicy/>}
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
                                        variant="standard"
                                        textalign="center"
                                        variant="outlined"
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
                            <Grid item xs={12} align="center">
                                    <TextField
                                        required={true}
                                        type={showPassword  ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="inputRounded"
                                        placeholder="Password"
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
                                        variant="standard"
                                        textalign="center"
                                        variant="outlined"
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