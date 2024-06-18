import { InputBase, Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchedProducts } from '../../../redux/userHandle';
import { GrSearch } from "react-icons/gr";

const Search = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = () => {
        dispatch(getSearchedProducts("searchProduct", searchTerm));

        if (location.pathname !== "/ProductSearch") {
            navigate("/ProductSearch");
        }
    };

    return (
        
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
        <input type='text' placeholder='search product here...' className='w-full outline-none  text-black' value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}/>
        <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
          <GrSearch />
        </div>
    </div>
        // <SearchContainer>
        //     <InputSearchBase
        //         placeholder="Search for products, brands and more"
        //         value={searchTerm}
        //         onChange={(e) => setSearchTerm(e.target.value)}
        //         onKeyDown={(e) => {
        //             if (e.key === 'Enter') {
        //                 handleSearch();
        //             }
        //         }}
        //     />
        //     <SearchIconWrapper>
        //         <SearchIcon sx={{ color: "#4d1c9c" }} />
        //     </SearchIconWrapper>
        // </SearchContainer>
    )
}

// const SearchContainer = styled(Box)`
//   border-radius: 2px;
//   margin-left: 10px;
//   width: 38%;
//   background-color: #fff;
//   display: flex;
// `;

// const SearchIconWrapper = styled(Box)`
//   margin-left: auto;
//   padding: 5px;
//   display: flex;
//   color: blue;
// `;

// const InputSearchBase = styled(InputBase)`
//   font-size: unset;
//   width: 100%;
//   padding-left: 20px;
// `;

export default Search;