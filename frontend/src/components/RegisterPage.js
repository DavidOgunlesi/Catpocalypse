import React, {useState} from "react";
import PasswordChecklist from "react-password-checklist";
import {isMobile} from 'react-device-detect';
import Background from "./static/Background";
import logo from '/static/images/logo.png';
import {Button, Grid, Typography, TextField, FormControl, Link} from "@material-ui/core";

export default function RegisterPage(){
    const [username, setUsername] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
	const [passwordAgain, setPasswordAgain] = useState("")
    function onRegister() {
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
        .then((response) => response.json()) //Turn response to json
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
                    
                    <Grid container spacing={3}>
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
                                    type = "password"
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
                                <PasswordChecklist
                                    rules={["minLength","specialChar","number","capital","match"]}
                                    minLength={5}
                                    value={password}
                                    valueAgain={passwordAgain}
                                    onChange={(isValid) => {}}
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
                                <Grid item xs={12} align="center">
                                    <Link href="" underline="hover" color="white">PRIVACY POLICY</Link>
                                </Grid>
                    </Grid> 
                </div>
                </div>
            </Background>
        );
    }else {

    }
    
}