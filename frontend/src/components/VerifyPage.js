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
    var ifVerify = false; 

    function verify(){
        // Fill API stuff from backend
    }

    function resendEmail() {
        var fullEmail = `${emailStart}${emailEnd}`;
        console.log(fullEmail);
        // Send email to user from backend
    }
    function renderModalWindow() {
        if (ifVerify) {
            return (<ModalWindow 
                title="Success!" 
                content="Congratulations Player! You have successfully verified your account. Come join us in the Catpocalypse World!!" 
                open={true}
    
                />);
        } else {
            return (
            <div>
                <ModalWindow
                title="Error in Verifying" 
                content="Invalid verification token. Your verification link may be incorrect. We can resend the link to your email address." 
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