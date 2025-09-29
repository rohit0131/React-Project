import { Box, Paper, Typography, Button } from '@mui/material';
import bgImg from '../../img/bg.png';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import bg from '../../img/bg1.jpg';
import green from '../../img/green.png';

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
    try {
        const ethereum = getEthereumObject();

        /*
         * First make sure we have access to the Ethereum object.
         */
        if (!ethereum) {
            console.error("Make sure you have Metamask!");
            return null;
        }

        console.log("We have the Ethereum object", ethereum);
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            return account;
        } else {
            console.error("No authorized account found");
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

const AuthenticProduct = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const qrData = location.state?.qrData;

    useEffect(() => {
        findMetaMaskAccount().then((account) => {
            if (account !== null) {
                setCurrentAccount(account);
            }
        });
    }, []);

    const connectWallet = async () => {
        try {
            const ethereum = getEthereumObject();
            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = () => {
        connectWallet();
        
    }

    useEffect(() => {
        if(currentAccount){
            navigate('/product', { state: { qrData }});
        }
    }, [currentAccount,navigate, qrData]);

    console.log("qrdata: ", qrData);

    return (
        <Box sx={{
            backgroundImage: `url(${bg})`,
            minHeight: "80vh",
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: -2,
            overflowY: "scroll"
        }}>

            <Paper elevation={3} sx={{ width: "400px", margin: "auto", marginTop: "10%", marginBottom: "10%", padding: "3%", backgroundColor: "#e3eefc" ,borderRadius: "25px" }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "Montserrat",
                        textAlign: "center", marginBottom: "5%", marginTop: "5%", 
                    }}    
                >
                    Congrats!
                </Typography>
                <Typography
                variant="h5"
                sx={{
                    fontFamily: "Montserrat",
                    textAlign: "center", marginBottom: "5%", marginTop: "5%", 
                }}   >
                    Your Product is Authentic
                </Typography>
                <Typography
                variant="body2"
                sx={{
                     alignItems: "center", marginTop: "10%", marginBottom: "5%",
                }}   
                >
                <img src={green} style={{height:100 ,width:120 ,marginLeft:"100px"}}/>
                    {/* Connect Your Wallet to View Product Details */}
                </Typography>

                {/* <Button variant="contained" sx={{ width: "100%", marginTop: "5%" }} onClick={handleClick}>
                    Connect Wallet
                </Button> */}
            </Paper>
        </Box>


    )


}

export default AuthenticProduct;