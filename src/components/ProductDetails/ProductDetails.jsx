import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  clearErrors,
  getProductDetails,
  getSimilarProducts,
  newReview,
} from "../../actions/productAction";
import { NextBtn, PreviousBtn } from "../Home/Banner/Banner";
import ProductSlider from "../Home/ProductSlider/ProductSlider";
import Loader from "../Layouts/Loader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { addItemsToCart } from "../../actions/cartAction";
import { getDeliveryDate, getDiscount } from "../../utils/functions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../actions/wishlistAction";
import MinCategory from "../Layouts/MinCategory";
import MetaData from "../Layouts/MetaData";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, LinearProgress } from "@mui/material";
import Categories from "../Layouts/Categories";

const dummydata = {
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const navigate = useNavigate();

  // reviews toggle
  const [open, setOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const productId = params.id;
  const itemInWishlist = wishlistItems.some((i) => i.product === productId);

  const addToWishlistHandler = () => {
    if (itemInWishlist) {
      dispatch(removeFromWishlist(productId));
      enqueueSnackbar("Remove From Wishlist", { variant: "success" });
    } else {
      dispatch(addToWishlist(productId));
      enqueueSnackbar("Added To Wishlist", { variant: "success" });
    }
  };

  const reviewSubmitHandler = () => {
    if (rating === 0 || !comment.trim()) {
      enqueueSnackbar("Empty Review", { variant: "error" });
      return;
    }
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", productId);
    dispatch(newReview(formData));
    setOpen(false);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId));
    enqueueSnackbar("Product Added To Cart", { variant: "success" });
  };

  const handleDialogClose = () => {
    setOpen(!open);
  };

  const itemInCart = cartItems.some((i) => i.product === productId);

  const goToCart = () => {
    navigate("/cart");
  };

  const buyNow = () => {
    addToCartHandler();
    navigate("/shipping");
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (reviewError) {
      enqueueSnackbar(reviewError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(productId));
    // eslint-disable-next-line
  }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

  useEffect(() => {
    dispatch(getSimilarProducts(product?.category));
  }, [dispatch, product, product.category]);
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="bg-white lg:px-20">
      <Categories/>
      <div className="pt-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* <!-- image wrapper --> */}
          <div className="w-full sm:w-4/5 sm:sticky top-16 sm:h-screen">
            {/* <!-- imgbox --> */}
            <div className="flex flex-col gap-3 m-3">
              <div className="w-full h-full pb-6 border relative">
                <Slider {...settings}>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        draggable="false"
                        className="w-full h-96 object-contain"
                        src={item.url}
                        alt={product.name}
                        key={i}
                      />
                    ))}
                </Slider>
                <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                  <span
                    onClick={addToWishlistHandler}
                    className={`${
                      itemInWishlist
                        ? "text-red-500"
                        : "hover:text-red-500 text-gray-300"
                    } cursor-pointer`}
                  >
                    <FavoriteIcon sx={{ fontSize: "18px" }} />
                  </span>
                </div>
              </div>

              <div className="w-full flex gap-3">
                {/* <!-- add to cart btn --> */}
               
                <Button
                  onClick={buyNow}
                  disabled={product.stock < 1 ? true : false}
                  variant="contained"
              
                  sx={{
                    mt: "1rem",
                    px: "2.5rem",
                    py: ".7rem",
                    bgcolor: "blue",}}
                  className={
                    product.stock < 1
                      ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-[#ee3c3c] cursor-not-allowed rounded-sm shadow hover:shadow-lg"
                      : "p-4 w-full flex items-center justify-center gap-2 text-white bg-[#262664] rounded-sm shadow hover:shadow-lg"
                  }
                >
                  <FlashOnIcon />
                  {product.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                </Button>
                {/* <!-- add to cart btn --> */}
              </div>
            </div>
            {/* <!-- imgbox --> */}
          </div>
          {/* <!-- image wrapper --> */}

          {/* Product info */}
          <div className="1g:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 1g:max-w-7xl 1g:px-8 1g:pb-24">
            <div className="1g:col-span-2">
              <h1 className="text-lg 1g:text-xl font-semibold text-gray-900">
                {product.brand && product.brand.name}
              </h1>
              <h1 className="text-lg lg:text-xl Otext-gray-900 opacity-60 pt-1">
                {product.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 1g:row-span-3 1g:mt-0">
              <h2 className="sr-only">{product.description}</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold">
                  ₹{product.price?.toLocaleString()}
                </p>
                <p className="opacity-50 line-through">
                  ₹{product.cuttedPrice?.toLocaleString()}
                </p>
                <p className="text-green-600 font-semibold">
                  {getDiscount(product.price, product.cuttedPrice)}%&nbsp;off
                </p>
                {product.stock <= 10 && product.stock > 0 && (
                  <span className="text-red-500 text-sm font-medium">
                    Hurry, Only {product.stock} left!
                  </span>
                )}
              </div>
              {/* <!-- warranty & brand --> */}
              <div className="flex gap-8 mt-2 items-center text-sm">
                <img
                  draggable="false"
                  className="w-20 h-8 p-0.5 border object-contain"
                  src={product.brand?.logo.url}
                  alt={product.brand && product.brand.name}
                />
                <span>
                  {product.warranty} Year Warranty{" "}
                  <Link className="font-medium text-primary-blue" to="/">
                    Know More
                  </Link>
                </span>
              </div>
              {/* <!-- warranty & brand --> */}
              {/* Reviews */}

              <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                <p className="text-gray-500">Delivery</p>
                <span>Delivery by {getDeliveryDate()}</span>
              </div>

              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={3.7} readOnly />
                  <p className="opacity-60 text-sm">
                    {product.ratings && product.ratings.toFixed(1)}
                  </p>
                  <p className="ml-3 text-sm font-bold text-indigo-600">
                    {product.numOfReviews}
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {dummydata.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </form>
            </div> <br />
            {product.stock > 0 && (
                  <Button
                    onClick={itemInCart ? goToCart : addToCartHandler}
                    variant="contained"
                    className="w-full mt-5"
                    sx={{
                      mt: "1rem",
                      px: "2.5rem",
                      py: ".7rem",
                      bgcolor: "#9155fd",}}
                    
                  >
                    <ShoppingCartIcon />
                    {itemInCart ? "GO TO CART" : "ADD TO CART"}
                  </Button>
                )}
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul className="list-disc flex flex-col gap-2 w-64">
                    {product.highlights?.map((highlight, i) => (
                      <li key={i}>
                        <p>{highlight}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="flex items-center gap-3">
                <span className="text-[#120a20]">
                  <VerifiedUserIcon sx={{ fontSize: "18px" }} />
                </span>{" "}
                {product.warranty} Year
              </p>
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  {/* <!-- specifications border box --> */}
                  <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                    <h1 className="px-6 py-4 border-b text-2xl font-medium">
                      Specifications
                    </h1>
                    <h1 className="px-6 py-3 text-lg">General</h1>

                    {/* <!-- specs list --> */}
                    {product.specifications?.map((spec, i) => (
                      <div
                        className="px-6 py-2 flex items-center text-sm"
                        key={i}
                      >
                        <p className="text-gray-500 w-3/12">{spec.title}</p>
                        <p className="flex-1">{spec.description}</p>
                      </div>
                    ))}
                    {/* <!-- specs list --> */}
                  </div>
                  {/* <!-- specifications border box --> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* rating and reviews */}
        <section>
          <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>
          <div className="border p-5">
            <Grid container>
              <Grid item xs={12}>
                <div className="space-y-5">
                  {/* <!-- reviews border box --> */}
                  <div className="w-full mt-4 rounded-sm border flex flex-col">
                    <div className="flex justify-between items-center border-b px-6 py-4">
                      <h1 className="text-2xl font-medium">
                        Ratings & Reviews
                      </h1>
                      <button
                        onClick={handleDialogClose}
                        className="shadow bg-[hsl(17,100%,50%)] text-white px-4 py-2 rounded-sm hover:shadow-lg"
                      >
                        Rate Product
                      </button>
                    </div>

                    <Dialog
                      aria-labelledby="review-dialog"
                      open={open}
                      onClose={handleDialogClose}
                    >
                      <DialogTitle className="border-b">
                        Submit Review
                      </DialogTitle>
                      <DialogContent className="flex flex-col m-1 gap-4">
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large"
                          precision={0.5}
                        />
                        <TextField
                          label="Review"
                          multiline
                          rows={3}
                          sx={{ width: 400 }}
                          size="small"
                          variant="outlined"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <button
                          onClick={handleDialogClose}
                          className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={reviewSubmitHandler}
                          className="py-2 px-6 rounded bg-green-600 hover:bg-green-700 text-white shadow uppercase"
                        >
                          Submit
                        </button>
                      </DialogActions>
                    </Dialog>

                    <div className="flex items-center border-b">
                      <h1 className="px-6 py-3 text-3xl font-semibold">
                        {product.ratings && product.ratings.toFixed(1)}
                        <StarIcon />
                      </h1>
                      <p className="text-lg text-gray-500">
                        ({product.numOfReviews}) Reviews
                      </p>
                    </div>

                    {viewAll
                      ? product.reviews
                          ?.map((rev, i) => (
                            <div
                              className="flex flex-col gap-2 py-4 px-6 border-b"
                              key={i}
                            >
                              <Rating
                                name="read-only"
                                value={rev.rating}
                                readOnly
                                size="small"
                                precision={0.5}
                              />
                              <p>{rev.comment}</p>
                              <span className="text-sm text-gray-500">
                                by {rev.name}
                              </span>
                            </div>
                          ))
                          .reverse()
                      : product.reviews
                          ?.slice(-3)
                          .map((rev, i) => (
                            <div
                              className="flex flex-col gap-2 py-4 px-6 border-b"
                              key={i}
                            >
                              <Rating
                                name="read-only"
                                value={rev.rating}
                                readOnly
                                size="small"
                                precision={0.5}
                              />
                              <p>{rev.comment}</p>
                              <span className="text-sm text-gray-500">
                                by {rev.name}
                              </span>
                            </div>
                          ))
                          .reverse()}
                    {product.reviews?.length > 3 && (
                      <button
                        onClick={() => setViewAll(!viewAll)}
                        className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-primary-blue text-white"
                      >
                        {viewAll ? "View Less" : "View All"}
                      </button>
                    )}
                  </div>
                  {/* <!-- reviews border box --> */}
                </div>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* similar-products */}
        <section className="pt-10">
          {/* Sliders */}
          <div className="flex flex-col gap-3 mt-10">
            <ProductSlider
              title={"Similar Products"}
              tagline={"Based on the category"}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
