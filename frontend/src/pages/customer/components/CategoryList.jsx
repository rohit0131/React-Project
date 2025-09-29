import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getSearchedProducts } from '../../../redux/userHandle';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productData } = useSelector(state => state.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();


    // Filter unique items based on category
    const uniqueItems = productData.filter((data, index, self) => {
        return self.findIndex((item) => item.category === data.category) === index;
    });

    // Handler function for category click
    const catHandler = (key) => {
        setAnchorEl(null);
        dispatch(getSearchedProducts("searchProductbyCategory", key));
        if (location.pathname !== "/ProductSearch") {
            navigate("/ProductSearch");
        }
    };
    const truncateString = (str, num) => {
        if (str.length <= num) {
          return str;
        }
        return str.slice(0, num) + '...';
      };

    const maxLength = 10; // Set your desired character limit here

                        
    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-center overflow-scroll scrollbar-none'>
                {uniqueItems.map((data, index) => (
                    <div onClick={() => catHandler(data.category)} className='cursor-pointer  items-center justify-center  '  key={data._id}>
                        {data ? (
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                <img src={data.productImage} alt={data.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                            </div>
                        ) : (
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}></div>
                      
                        )}
                    
                        
                       
                            <p className='text-center text-sm md:text-base capitalize'>
                            {truncateString(data.category, maxLength)}
                            </p>

                        {/* <p className='text-center text-sm md:text-base capitalize'>{data.category}</p> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryList;
