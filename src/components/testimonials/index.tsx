import { useRef } from "react";
import { Box } from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { testimonials } from "../../data/reviews";

const Testimonials = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    className: "center",
    centerMode: true,
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 1500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // const gotoNext = () => {
  //   sliderRef?.current?.slickNext && sliderRef?.current?.slickNext();
  // };

  // const gotoPrev = () => {
  //   sliderRef?.current?.slickPrev && sliderRef?.current?.slickPrev();
  // };

  return (
    <Box
      id="reviews"
      sx={
        {
          // width: "90%",
          // margin: "0 auto",
          // padding: "20px 0",
          // marginBottom: "20px",
          // position: "relative",
        }
      }
    >
      <Box className="testimonials-heading">
        <Box className="testimonials-heading">
          <h1 className="gradient-text">Testimonials</h1>
          <p className="testimonials-description">
            Dono't just take our word for it - see what actual users of our
            service <br /> have to say about their experience
          </p>
        </Box>
      </Box>
      <Box>
        <Slider {...settings} ref={sliderRef}>
          {testimonials.map((data) => (
            <Box className="review-card" key={data.id}>
              <Box className="review-text">
                "
                {data.review.length > 200
                  ? `${data.review.slice(0, 200)} ...`
                  : data.review}
                "
              </Box>
              <Box className="review-star-rating">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
                  <Box key={value}>
                    <StarOutlinedIcon sx={{ color: "gold" }} />
                  </Box>
                ))}
              </Box>
              <Box className="reviewer-photo-container">
                <img src={data.photo} className="reviewer-photo" />
              </Box>
              <Box className="reviewer-name">{data.name}</Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Testimonials;
