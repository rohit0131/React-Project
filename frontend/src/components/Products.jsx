import React, { useState } from 'react';
import { Container, Grid, Pagination } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import { BasicButton } from '../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { addStuff } from '../redux/userHandle';
import { Link } from 'react-router-dom'

const Products = ({ productData }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const itemsPerPage = 9;

  const { currentRole, responseSearch } = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleUpload = (event, product) => {
    event.stopPropagation();
    console.log(product);
    dispatch(addStuff("ProductCreate", product));
  };

  const messageHandler = (event) => {
    event.stopPropagation();
    setMessage("You have to login or register first")
    setShowPopup(true)
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (responseSearch) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <ProductGrid container spacing={3}>
        {currentItems.map((data, index) => (
          <Grid item xs={12} sm={6} md={4}
            key={index}
            onClick={() => navigate("/product/view/" + data._id)}
            sx={{ cursor: "pointer" }}
          >
            <ProductContainer>
           
            <div className='w-full min-w-[280px]  md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow ' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
                         <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                             <img src={data.productImage} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                         </div>
                         <div className='p-4 grid gap-3'>
                             <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{data.productName}</h2>
                             <p className='capitalize text-slate-500'>{data.category}</p>
                             <div className='flex gap-3'>
                                 
                                 <p className='text-slate-500 line-through'>{data.price.mrp}</p>
                                 <p className='text-dark-600 font-medium'>₹{data.price.cost}</p>
                                 <p className='text-green-600 '>{data.price.discountPercent}% off</p>
                             </div>
                             {/* <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(event) => handleAddToCart(event, data)}>Add to Cart</button>
                       */}

              {/* <ProductImage src={data.productImage} />
              <ProductName>{data.productName}</ProductName>
              <PriceMrp>{data.price.mrp}</PriceMrp>
              <PriceCost>₹{data.price.cost}</PriceCost>
              <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount> */}
              
                {currentRole === "Customer" &&
                  <>
                  <button className='text-sm bg-blue-600 hover:bg-blue-800 text-white px-3 py-0.5 rounded-full' onClick={(event) => handleAddToCart(event, data)}>Add to Cart</button>
                      
                    {/* <BasicButton
                      onClick={(event) => handleAddToCart(event, data)}
                    >
                      Add To Cart
                    </BasicButton> */}
                  </>
                }
                {currentRole === "Shopcart" &&
                  <>
                    <BasicButton
                      onClick={(event) => handleUpload(event, data)}
                    >
                      Upload
                    </BasicButton>
                  </>
                }
                {currentRole === null &&
                  <>
                  <button className='text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full'  onClick={messageHandler}>Add to Cart</button>

                    {/* <BasicButton
                      onClick={messageHandler}
                    >
                      Add To Cart
                    </BasicButton> */}
                  </>
                }

                
              </div>
                     </div>
            </ProductContainer>
          </Grid>
        ))}
      </ProductGrid>

      <Container sx={{ mt: 10, mb: 10, display: "flex", justifyContent: 'center', alignItems: "center" }}>
        <Pagination
          count={Math.ceil(productData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </Container>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
};

export default Products;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const ProductGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 8px;
`;

const ProductName = styled.p`
  font-weight: bold;
  text-align: center;
`;

const PriceMrp = styled.p`
  margin-top: 8px;
  text-align: center;
  text-decoration: line-through;
  color: #525050;
`;

const PriceCost = styled.h3`
  margin-top: 8px;
  text-align: center;
`;

const PriceDiscount = styled.p`
  margin-top: 8px;
  text-align: center;
  color: darkgreen;
`;

const AddToCart = styled.div`
  margin-top: 16px;
`;