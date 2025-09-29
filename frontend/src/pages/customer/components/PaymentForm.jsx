import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { IoIosArrowBack } from "react-icons/io";

import { fetchProductDetailsFromCart, removeAllFromCart, removeSpecificProduct } from '../../../redux/userSlice';

const PaymentForm = ({ handleBack }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { status, currentUser, productDetailsCart } = useSelector(state => state.user);

    const params = useParams();
    const productID = params.id;

    const [paymentData, setPaymentData] = useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setPaymentData((prevData) => ({
            ...prevData,
            [id]: id === 'expDate' ? value.slice(0, 7) : value,
        }));
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (productID) {
            dispatch(fetchProductDetailsFromCart(productID));
        }
    }, [productID, dispatch]);

    const productsQuantity = currentUser.cartDetails.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = currentUser.cartDetails.reduce((total, item) => total + (item.quantity * item.price.cost), 0);

    const singleProductQuantity = productDetailsCart && productDetailsCart.quantity
    const totalsingleProductPrice = productDetailsCart && productDetailsCart.price && productDetailsCart.price.cost * productDetailsCart.quantity

    const paymentID = `${paymentData.cardNumber.slice(-4)}-${paymentData.expDate.slice(0, 2)}${paymentData.expDate.slice(-2)}-${Date.now()}`;
    const paymentInfo = { id: paymentID, status: "Successful" }

    const multiOrderData = {
        buyer: currentUser._id,
        shippingData: currentUser.shippingData,
        orderedProducts: currentUser.cartDetails,
        paymentInfo,
        productsQuantity,
        totalPrice,
    }

    const singleOrderData = {
        buyer: currentUser._id,
        shippingData: currentUser.shippingData,
        orderedProducts: productDetailsCart,
        paymentInfo,
        productsQuantity: singleProductQuantity,
        totalPrice: totalsingleProductPrice,
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (productID) {
            dispatch(addStuff("newOrder", singleOrderData));
            dispatch(removeSpecificProduct(productID));
        }
        else {
            dispatch(addStuff("newOrder", multiOrderData));
            dispatch(removeAllFromCart());
        }
    };

    useEffect(() => {
        if (status === 'added') {
            navigate('/Aftermath');
        }
        else if (status === 'failed') {
            setMessage("Order Failed")
            setShowPopup(true)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
        }
    }, [status, navigate]);

    function formatCardNumber(cardNumber) {
        // Remove non-numeric characters from input
        const numericOnly = cardNumber.replace(/\D/g, '');
        
        // Insert a space every 4 characters
        const formatted = numericOnly.replace(/(\d{4})/g, '$1 ').trim();
        
        return formatted;
    }

    function formatExpiryDate(expDate) {
        if (!expDate) return ""; // Handle empty value
        const formattedDate = expDate
            .replace(/\D/g, '') // Remove non-numeric characters
            .replace(/(\d{2})(\d{2})/, '$1/$2') // Add "/" between month and year
            .slice(0, 7); // Limit to MM/YYYY format
        return formattedDate;
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
            <h1 class="text-center font-bold text-xl uppercase">Secure payment info</h1>
            </Typography>

            <div className=" mt-3 mb-3 flex -mx-2">
                <div className="px-2">
                    <label htmlFor="type1" className="flex items-center cursor-pointer">
                    
                        <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3" />
                    </label>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardName"
                            label="Name on card"
                            type='text'
                            fullWidth
                            autoComplete="cc-name"
                            variant="standard"
                            value={paymentData.cardName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardNumber"
                            label="Card number"
                            type="text"
                            fullWidth
                            autoComplete="cc-number"
                            variant="standard"
                           
                            onChange={handleInputChange}
                            value={formatCardNumber(paymentData.cardNumber)} 
                            
                            inputProps={{ inputMode: 'numeric', maxLength: 19 }}
                         />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="expDate"
                        label="Expiry date (MM/YYYY)"
                        type="text" // Change type to text
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        value={formatExpiryDate(paymentData.expDate)}
                        onChange={handleInputChange}
                        inputProps={{ inputMode: 'numeric' }}
                    />


                        
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cvv"
                            label="CVV"
                            type="text"
                            helperText="Last three digits on signature strip"
                            fullWidth
                            autoComplete="cc-csc"
                            variant="standard"
                            value={paymentData.cvv}
                            onChange={handleInputChange}
                            inputProps={{ inputMode: 'numeric', maxLength: 3 }}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                       variant="contained"
                    onClick={handleBack}
                     sx={{ mt: 3, ml: 1 }}>
                       <IoIosArrowBack  size={30} style={{color: "white" }} />
                    </Button>
                    <Button
                        variant="contained"
                        type='submit'
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Place order
                    </Button>
                </Box>
            </form>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </React.Fragment>
    );
}

export default PaymentForm;
