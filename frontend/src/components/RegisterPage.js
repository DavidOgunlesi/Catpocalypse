import React, {useState} from "react";
import PasswordChecklist from "react-password-checklist";
import {isMobile} from 'react-device-detect';
import Background from "./static/Background";
import logo from '/static/images/logo.png';
import {Link} from "react-router-dom";
import {Button, Grid, Typography, TextField, FormControl, InputAdornment,IconButton, FormHelperText, InputLabel, OutlinedInput} from "@material-ui/core";
import {Link as UILink} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

export default function RegisterPage(){
    const [username, setUsername] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    var validPassword = false;
    function onRegister() {
        if (username=="" || emailAddress=="" || password=="" || passwordAgain == "") {
            setErrorMessage("Not all fields have been filled.");
            return;
        }
        if (!validPassword) {
            setErrorMessage("Password doesn't meet criteria.");
            return;
        }
        console.log(username);
        console.log(password);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username:username,
                password:password
            }),
        };
        //send post request to our api!
        fetch('/api/users/', requestOptions)
        .then((response) => {
            if (!response.ok){
                setErrorMessage("Error signing up.");
                return;
            }
            console.log("ok!");
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
                <div className="gradient">
                <img src={logo} className="logo" alt="Logo" />
                <div className="center">
                    
                    <Grid container spacing={1}>
                        <Grid item xs={12} align="center">
                            <Typography variant="h3" component="h3">Register</Typography>
                        </Grid>
                            <Grid item xs={12} align="center">
                                <FormControl component="fieldset">
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
                                        style={{
                                            background: "white"
                                        }}
                                    />
                                </FormControl>
                                </Grid>
                                <Grid item xs={12} align="center">
                                <FormControl component="fieldset">
                                    <TextField
                                        required={true}
                                        type = "text"
                                        onChange={e => setEmailAddress(e.target.value)}
                                        className="inputRounded"
                                        placeholder="Email Address"
                                        variant="standard"
                                        textalign="center"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            background: "white"
                                        }}
                                    />
                                </FormControl>
                                </Grid>
                                <Grid item xs={12} align="center">
                                <FormControl component="fieldset">
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
                                    style={{
                                        background: "white"
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={_=> setShowPassword(!showPassword)}
                                            onMouseDown={e=> e.preventDefault()}
                                            edge="end"
                                          >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                      }
                                />
                                </FormControl>
                                
                                </Grid>
                                
                                <Grid item xs={12} align="center">
                                <FormControl component="fieldset">
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
                                    style={{
                                        background: "white"
                                    }}
                                />
                                </FormControl>
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
                                    <UILink href="" underline="hover" color="white">PRIVACY POLICY</UILink>
                                </Grid>
                    </Grid> 
                </div>
                </div>
            </Background>
        );
    }else {

    }
    
}