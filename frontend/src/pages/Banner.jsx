import { styled } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { bannerData } from '../utils/products';
import img1 from '../utils/img/img1.jpg'
// import img2 from '../utils/img/img2.png'
import img3 from '../utils/img/img3.jpg'
import img4 from '../utils/img/img4.png'
import img5 from '../utils/img/img5.png'
const Banner = () => {

    const bannerData = [
        { _id: 1, url: img1  },
        // { _id: 2, url: img2 },
        { _id: 3, url: img3  },
        { _id: 3, url: img4  },
        { _id: 3, url: img5  },]
    return (
        <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            showDots={true}
            slidesToSlide={1}
            customTransition="all .5"
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
        
            {bannerData.map((image) => (
                <Image src={image.url} alt={image.alt} key={image._id} />
            ))}
        </Carousel>
    );
};

export default Banner;


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: 350,
    [theme.breakpoints.down('sm')]: {
        objectFit: 'cover',
        height: 180,
    },
}));
