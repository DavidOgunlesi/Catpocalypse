import React, {useState} from "react";
import { useParams } from "react-router-dom";
import Background from "./static/Background";
import ModalWindow from "./dynamic/ModalWindow";
import { Grid, TextField, InputAdornment, MenuItem, Select, Button } from "@material-ui/core";

export default function VerifyPage(){

    const params= useParams();  // storing function as an alias
    var defaultEmail = "@exeter.ac.uk";
    const [emailStart, setEmailStart] = useState("");
    const [emailEnd, setEmailEnd] = useState(defaultEmail);
    const [verified, setVerified] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [playerName, setPlayerName] = useState("Player");

    function verify(){
        const token = params.token;
        console.log(token);
        fetch(`/api/email-verify?token=${token}`)
        .then((response) => {
            if (!response.ok){
                setVerified(false);
                return response.json();
            }
            console.log("ok!");
            setVerified(true);
            return response.json();
        }).then((data) =>{
            console.log(data);
            setErrorMsg(data.error);
            setPlayerName(data.username);
        });
    }

    function resendEmail() {
        var fullEmail = `${emailStart}${emailEnd}`;
        console.log(fullEmail);
        // Send email to user from backend
    }
    function renderModalWindow() {
        if (verified) {
            return (<ModalWindow 
                title="Success!" 
                content={`Congratulations ${playerName}! You have successfully verified your account. Come join us in the Catpocalypse World!!`}
                open={true}
    
                />);
        } else {
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