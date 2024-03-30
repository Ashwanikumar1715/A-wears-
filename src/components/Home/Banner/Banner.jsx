// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './Banner.css';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import banner1 from '../../../assets/images/Banners/gadget-sale.jpg';
// import banner2 from '../../../assets/images/Banners/kitchen-sale.jpg';
// import banner3 from '../../../assets/images/Banners/banner3-m4-pro.webp';
// import banner4 from '../../../assets/images/Banners/banner4-9-pro.webp';
// import banner5 from '../../../assets/images/Banners/banner5.jpg';
// import banner6 from '../../../assets/images/Banners/banner6-reno7.webp';

// export const PreviousBtn = ({ className, onClick }) => {
//   return (
//     <div className={className} onClick={onClick}>
//       <ArrowBackIosIcon />
//     </div>
//   )
// }

// export const NextBtn = ({ className, onClick }) => {
//   return (
//     <div className={className} onClick={onClick}>
//       <ArrowForwardIosIcon />
//     </div>
//   )
// }

// const Banner = () => {

//   const settings = {
//     autoplay: true,
//     autoplaySpeed: 2000,
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     prevArrow: <PreviousBtn />,
//     nextArrow: <NextBtn />,
//   };

//   const banners = [banner1, banner2, banner3, banner5, banner4, banner6];

//   return (
//     <>
//       <section className="h-44 sm:h-72 w-full rounded-sm shadow relative overflow-hidden">
//         <Slider {...settings}>
//           {banners.map((el, i) => (
//             <img draggable="false" className="h-44 sm:h-72 w-full object-cover" src={el} alt="banner" key={i} />
//           ))}
//         </Slider>
//       </section>
//     </>
//   );
// };

// export default Banner;
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import banner1 from '../../../assets/images/Banners/banner (1).jpg';
import banner2 from '../../../assets/images/Banners/banner (2).jpg';
import banner3 from '../../../assets/images/Banners/banner (3).jpg';
import banner4 from '../../../assets/images/Banners/banner (4).jpg';
// import banner5 from '../../../assets/images/Banners/banner (5).png';
// import banner6 from '../../../assets/images/Banners/banner (6).png';
// import banner7 from '../../../assets/images/Banners/banner (7).png';
// import banner8 from '../../../assets/images/Banners/banner (8).png';
// import banner9 from '../../../assets/images/Banners/banner (9).png';
// import banner10 from '../../../assets/images/Banners/banner (10).png';

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon />
    </div>
  )
}

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon />
    </div>
  )
}

const Banner = () => {

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const banners = [banner1, banner2, banner3,  banner4,];

  useEffect(() => {
    // Preload the first image in the banners array
    const image = new Image();
    image.src = banners[0];
  }, [banners]);

  return (
    <>
      <section className="h-25 sm:h-[25rem] w-full rounded-sm shadow relative overflow-hidden">
        <Slider {...settings} className='w-[80%] m-auto'>
          {banners.map((el, i) => (
            <img draggable="false" className="h-25 sm:h-[24rem] w-full object-cover" src={el} alt="banner" key={i} />
          ))}
        </Slider>
      </section>
    </>
  );
};

export default Banner;
