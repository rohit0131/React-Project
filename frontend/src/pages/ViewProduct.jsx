import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import styled from 'styled-components';
import { BasicButton } from '../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../redux/userHandle';
import { Avatar, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { generateRandomColor, timeAgo } from '../utils/helperFunctions';
import { MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { updateCustomer } from '../redux/userHandle';


const ViewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;

    

    
    const productBuyingHandler = (id) => {
        console.log(currentUser);
        dispatch(updateCustomer(currentUser, currentUser._id));
        navigate(`/product/buy/${id}`)
    }


    const { currentUser, currentRole, productDetails, loading, responseDetails } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getProductDetails(productID));
    }, [productID, dispatch]);


    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const deleteHandler = (reviewId) => {
        const fields = { reviewId };

        dispatch(updateStuff(fields, productID, "deleteProductReview"));
    };

    const reviewer = currentUser && currentUser._id

    return (
        <>
            
                <>
                    {
                        responseDetails ?
                            <div>Product not found</div>
                            :
                            <>
                            <div className='container mx-auto p-4'>

                                <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                                    {/***product Image */}
                                    <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

                                        <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                                            <img src={productDetails && productDetails.productImage} className='h-full w-full object-scale-down mix-blend-multiply' />
                                        </div>
                                    </div>
                               






                                 {/***product details */}
                                {
                                    loading ? (
                                    <div className='grid gap-1 w-full'>
                                        <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                                        <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                                        <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                                        <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
                            
                                        </div>

                                        <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                                        <p className='text-red-600 bg-slate-200 w-full'></p>
                                        <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                                        </div>

                                        <div className='flex items-center gap-3 my-2 w-full'>
                                        <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                                        <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                                        </div>

                                        <div className='w-full'>
                                        <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                                        <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                                        </div>
                                    </div>
                                    ) : 
                                    (
                                    <div className='flex flex-col gap-1'>
                                   
                                    <h1 className='text-2xl lg:text-4xl font-medium' style={{ fontFamily: 'Montserrat, sans-serif', fontWeight:700 }}> {productDetails && productDetails.productName}</h1>
                                        <p className='capitalize text-slate-400'>Category: {productDetails && productDetails.category}</p>

                                        

                                        <div className='flex items-center gap-2 lg:text-3xl  my-1'>
                                        <p className='text-black-500 font-medium text-2xl lg:text-3xl'>₹{productDetails && productDetails.price && productDetails.price.cost}</p>
                                        <p className='text-slate-300 line-through font-medium text-2xl lg:text-3xl'>₹{productDetails && productDetails.price && productDetails.price.mrp}</p>
                                        <p className='text-green-500 font-small text-xl '>{productDetails && productDetails.price && productDetails.price.discountPercent}%off</p>
                                        </div>

                                        <div className='flex items-center gap-3 my-2'>
                                        {/* <button className='border-2 border-green-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-green-600 hover:text-green-600 hover:bg-white' onClick={() => productBuyingHandler()} >Buy</button> */}
 
                                        {
                                    currentRole === "Customer" &&
                                    <>

                                        <button className='border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-blue-600 hover:text-blue-600 hover:bg-white'   onClick={() => dispatch(addToCart(productDetails))}>Add To Cart</button> 

                                        </>
                                        }
                                        </div>

                                        <div>
                                        <p className='text-slate-600 font-medium my-1'>Description : </p>
                                        <p>{productDetails && productDetails.description}</p>
                                        </div>
                                    </div>
                                    )
                                }

                            </div>
                                                
                            </div>




                                {/* <ProductContainer>
                                    <ProductImage src={productDetails && productDetails.productImage} alt={productDetails && productDetails.productName} />
                                    <ProductInfo>
                                        <ProductName>{productDetails && productDetails.productName}</ProductName>
                                        <PriceContainer>
                                            <PriceCost>₹{productDetails && productDetails.price && productDetails.price.cost}</PriceCost>
                                            <PriceMrp>₹{productDetails && productDetails.price && productDetails.price.mrp}</PriceMrp>
                                            <PriceDiscount>{productDetails && productDetails.price && productDetails.price.discountPercent}% off</PriceDiscount>
                                        </PriceContainer>
                                        <Description>{productDetails && productDetails.description}</Description>
                                        <ProductDetails>
                                            <p>Category: {productDetails && productDetails.category}</p>
                                            <p>Subcategory: {productDetails && productDetails.subcategory}</p>
                                        </ProductDetails>
                                    </ProductInfo>
                                </ProductContainer> */}

                                {/* {
                                    currentRole === "Customer" &&
                                    <>
                                    <button className='border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-blue-600 hover:text-blue-600 hover:bg-white'   onClick={() => dispatch(addToCart(productDetails))}>Add To Cart</button> 

                                        <ButtonContainer>
                                            <BasicButton
                                                onClick={() => dispatch(addToCart(productDetails))}
                                            >
                                                Add to Cart
                                            </BasicButton>
                                        </ButtonContainer>
                                    </>
                                } */}
                                <ReviewWritingContainer>
                                    <Typography variant="h4">Reviews</Typography>
                                </ReviewWritingContainer>

                                {productDetails.reviews && productDetails.reviews.length > 0 ? (
                                    <ReviewContainer>
                                        {productDetails.reviews.map((review, index) => (
                                            <ReviewCard key={index}>
                                                <ReviewCardDivision>
                                                    <Avatar sx={{ width: "60px", height: "60px", marginRight: "1rem", backgroundColor: generateRandomColor(review._id) }}>
                                                        {String(review.reviewer.name).charAt(0)}
                                                    </Avatar>
                                                    <ReviewDetails>
                                                        <Typography variant="h6">{review.reviewer.name}</Typography>
                                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>

                                                            <Typography variant="body2">
                                                                {timeAgo(review.date)}
                                                            </Typography>
                                                        </div>
                                                        <Typography variant="subtitle1">Rating: {review.rating}</Typography>
                                                        <Typography variant="body1">{review.comment}</Typography>
                                                    </ReviewDetails>
                                                    {review.reviewer._id === reviewer &&
                                                        <>
                                                            <IconButton onClick={handleOpenMenu} sx={{ width: "4rem", color: 'inherit', p: 0 }}>
                                                                <MoreVert sx={{ fontSize: "2rem" }} />
                                                            </IconButton>
                                                            <Menu
                                                                id="menu-appbar"
                                                                anchorEl={anchorElMenu}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'left',
                                                                }}
                                                                keepMounted
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'left',
                                                                }}
                                                                open={Boolean(anchorElMenu)}
                                                                onClose={handleCloseMenu}
                                                                onClick={handleCloseMenu}
                                                            >
                                                                <MenuItem onClick={() => {
                                                                    handleCloseMenu()
                                                                }}>
                                                                    <Typography textAlign="center">Edit</Typography>
                                                                </MenuItem>
                                                                <MenuItem onClick={() => {
                                                                    deleteHandler(review._id)
                                                                    handleCloseMenu()
                                                                }}>
                                                                    <Typography textAlign="center">Delete</Typography>
                                                                </MenuItem>
                                                            </Menu>
                                                        </>
                                                    }
                                                </ReviewCardDivision>
                                            </ReviewCard>
                                        ))}
                                    </ReviewContainer>
                                )
                                    :
                                    <ReviewWritingContainer>
                                        <Typography variant="h6">No Reviews Found. Add a review.</Typography>
                                    </ReviewWritingContainer>
                                }
                            </>
                    }
                </>
            }
        </>
    );
};

export default ViewProduct;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const ProductImage = styled.img`
    max-width: 300px;
    /* width: 50%; */
    margin-bottom: 20px;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductName = styled.h1`
    font-size: 24px;
`;

const PriceContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
`;

const PriceMrp = styled.p`
    margin-top: 8px;
    text-decoration: line-through;
    color: #525050;
`;

const PriceCost = styled.h3`
    margin-top: 8px;
`;

const PriceDiscount = styled.p`
    margin-top: 8px;
    color: darkgreen;
`;

const Description = styled.p`
    margin-top: 16px;
`;

const ProductDetails = styled.div`
    margin: 16px;
`;

const ButtonContainer = styled.div`
    margin: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ReviewWritingContainer = styled.div`
    margin: 6rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    flex-direction:column;
`;

const ReviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ReviewCard = styled(Card)`
  && {
    background-color: white;
    margin-bottom: 2rem;
    padding: 1rem;
  }
`;

const ReviewCardDivision = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewDetails = styled.div`
  flex: 1;
`;