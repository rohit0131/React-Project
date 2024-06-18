import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Button, Collapse, Stack, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../../redux/userHandle";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { BlueButton, GreenButton } from "../../../utils/buttonStyles";
import { useNavigate } from "react-router-dom";

// import { BsFastForward } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";


const ShippingPage = ({ handleNext, profile }) => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let shippingData = currentUser.shippingData;

  console.log(shippingData);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  });

  const [errors, setErrors] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  });

  const [showTab, setShowTab] = useState(false);
  const buttonText = showTab ? "Cancel" : "Edit";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    const newErrors = {};

    if (formData.address.trim() === "") {
      newErrors.address = "Address is required";
    } else {
      newErrors.address = "";
    }

    if (formData.city.trim() === "") {
      newErrors.city = "City is required";
    } else {
      newErrors.city = "";
    }

    if (formData.state.trim() === "") {
      newErrors.state = "State is required";
    } else {
      newErrors.state = "";
    }

    if (formData.country.trim() === "") {
      newErrors.country = "Country is required";
    } else {
      newErrors.country = "";
    }

    if (
      formData.pinCode.trim() === "" ||
      isNaN(formData.pinCode) ||
      formData.pinCode.length !== 6
    ) {
      newErrors.pinCode = "Pin Code is required and should be a 6-digit number";
    } else {
      newErrors.pinCode = "";
    }

    if (
      formData.phoneNo.trim() === "" ||
      isNaN(formData.phoneNo) ||
      formData.phoneNo.length !== 10
    ) {
      newErrors.phoneNo =
        "Phone Number is required and should be a 10-digit number";
    } else {
      newErrors.phoneNo = "";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const [pinCodeError, setPinCodeError] = useState(false);
  const [phoneNoError, setPhoneNoError] = useState(false);

  useEffect(() => {
    if (shippingData) {
      setAddress(shippingData.address || "");
      setCity(shippingData.city || "");
      setPinCode(shippingData.pinCode || "");
      setCountry(shippingData.country || "");
      setState(shippingData.state || "");
      setPhoneNo(shippingData.phoneNo || "");
    }
  }, [shippingData]);

  const updateShippingData = (shippingData) => {
    const updatedUser = { ...currentUser, shippingData: shippingData };
    dispatch(updateCustomer(updatedUser, currentUser._id));
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      updateShippingData(formData);
      handleNext();
    }
  };

  const profileSubmitHandler = () => {
    if (validateInputs()) {
      updateShippingData(formData);
    }
  };

  const editHandler = (event) => {
    event.preventDefault();
    if (isNaN(pinCode) || pinCode.length !== 6) {
      setPinCodeError(true);
    } else if (isNaN(phoneNo) || phoneNo.length !== 10) {
      setPhoneNoError(true);
    } else {
      setPinCodeError(false);
      setPhoneNoError(false);
      const fields = { address, city, state, country, pinCode, phoneNo };
      updateShippingData(fields);
      setShowTab(false);
    }
  };
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    
    <React.Fragment >
      {shippingData && Object.keys(shippingData).length > 0 ? (
        <React.Fragment>
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                  for="grid-password"
                >
                  Address 
                </label>
                <textarea
                  class="appearance-none block w-full bg-gray-500 text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-semibold "
                  id="grid-password"
                  type="text"
                  value={shippingData && shippingData.address}
                  // style={{fontWeight:"50px"}}
                  placeholder="******************"
                  disabled="true"
                />
              
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                  for="grid-first-name"
                >
                  City 
                </label>
               

                <input
                  class="appearance-none block w-full bg-gray-500 text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white  focus:border-gray-500 font-semibold"
                  id="grid-first-name"
                  type="text"
                  value={shippingData && shippingData.city}
                  placeholder="Pune"
                  disabled="true"
                />
              
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                  for="grid-last-name"
                >
                   State
                </label>
                <input
                  class="appearance-none block w-full bg-gray-500 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-semibold"
                  id="grid-last-name"
                  type="text"
                  value={shippingData && shippingData.state}
                  placeholder="Maharashtra"
                  disabled="true"
                />
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                  for="grid-city"
                >
                   Country
                </label>
                <input
                  class="appearance-none block w-full bg-gray-500 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-semibold"
                  id="grid-city"
                  type="text"
                  value={shippingData && shippingData.country}
                  placeholder="India"
                  disabled="true"
                />
              </div>

              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                  for="grid-zip"
                >
               Pin Code
                </label>
                <input
                  class="appearance-none block w-full bg-gray-500 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-semibold"
                  id="grid-zip"
                  type="text"
                  value={shippingData && shippingData.pinCode}
                  placeholder="412207"
                  disabled="true"
                />
              </div>

              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                  for="grid-zip"
                >
              Phone No
                </label>
                <input
                  class="appearance-none block w-full bg-gray-500 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-semibold font-semibold  "
                  id="grid-zip"
                  type="number"
                   value={shippingData && shippingData.phoneNo}
                  placeholder="7766554433"
                  disabled="true"
                />
              </div>
            </div>
          </form>

          {/* <StyledTypography variant="h6">
            Address : 
          </StyledTypography>
          <StyledTypography variant="h6">
            City : {shippingData && shippingData.city}
          </StyledTypography>
          <StyledTypography variant="h6">
            State : {shippingData && shippingData.state}
          </StyledTypography>
          <StyledTypography variant="h6">
            Country : {shippingData && shippingData.country}
          </StyledTypography>
          <StyledTypography variant="h6">
            Pin Code : {shippingData && shippingData.pinCode}
          </StyledTypography>
          <StyledTypography variant="h6">
            Phone Number : {shippingData && shippingData.phoneNo}
          </StyledTypography> */}

          {profile ? (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={() => setShowTab(!showTab)}
                sx={{ mt: 3, ml: 1 }}
              >
                {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                {buttonText}
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <GreenButton
                onClick={() => navigate("/profile")}
                sx={{ mt: 3, ml: 1 }}
              >
<FaRegEdit size={30} style={{color: "white" }}/>
              </GreenButton>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
              <IoIosArrowForward  size={30} style={{color: "white" }} />
              </Button>
              {/* <button onClick={handleNext}><BsFastForward size={30} style={{color: "black" }} /> </button> */}
            </Box>
          )}

          <Collapse in={showTab} timeout="auto" unmountOnExit>
            <Box
              sx={{
                flex: "1 1 auto",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  maxWidth: 550,
                  px: 3,
                  py: "30px",
                  width: "100%",
                }}
              >
                <form onSubmit={editHandler}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      label="City"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      multiline
                      label="Zip / Postal code"
                      type="number"
                      value={pinCode}
                      error={pinCodeError}
                      helperText={
                        pinCodeError && "Pin Code should be a 6-digit number"
                      }
                      onChange={(event) => setPinCode(event.target.value)}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Country"
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      label="State/Province/Region"
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Phone number"
                      type="number"
                      value={phoneNo}
                      error={phoneNoError}
                      helperText={
                        phoneNoError &&
                        "Phone Number should be a 10-digit number"
                      }
                      onChange={(event) => setPhoneNo(event.target.value)}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Stack>
                  <BlueButton
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    variant="contained"
                    type="submit"
                  >
                    Update
                  </BlueButton>
                </form>
              </Box>
            </Box>
          </Collapse>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                value={formData.address}
                onChange={handleInputChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                value={formData.city}
                onChange={handleInputChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="pinCode"
                name="pinCode"
                label="Zip / Postal code"
                type="number"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
                value={formData.pinCode}
                onChange={handleInputChange}
                error={!!errors.pinCode}
                helperText={errors.pinCode}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
                value={formData.country}
                onChange={handleInputChange}
                error={!!errors.country}
                helperText={errors.country}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                variant="standard"
                value={formData.state}
                onChange={handleInputChange}
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phoneNo"
                name="phoneNo"
                label="Phone number"
                type="number"
                fullWidth
                autoComplete="shipping Phone-number"
                variant="standard"
                value={formData.phoneNo}
                onChange={handleInputChange}
                error={!!errors.phoneNo}
                helperText={errors.phoneNo}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {profile ? (
              <Button
                variant="contained"
                onClick={profileSubmitHandler}
                sx={{ mt: 3, ml: 1 }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, ml: 1 }}
              >
                Next
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
   
  );
};

export default ShippingPage;

const StyledTypography = styled(Typography)`
  margin-bottom: 10px;
`;
