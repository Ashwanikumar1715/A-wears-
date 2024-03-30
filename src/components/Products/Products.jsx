import { Fragment , useState, useEffect} from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProducts } from "../../actions/productAction";
import Loader from "../Layouts/Loader";
import MinCategory from "../Layouts/MinCategory";
import Product from "./Product";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import { categories } from "../../utils/constants";
import MetaData from "../Layouts/MetaData";
import { useLocation } from "react-router-dom";
import Categories from "../Layouts/Categories";
const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState(
    location.search ? location.search.split("=")[1] : ""
  );
  const [ratings, setRatings] = useState(0);
  // filter toggles
  const [categoryToggle, setCategoryToggle] = useState(true);
  const [ratingsToggle, setRatingsToggle] = useState(true);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const keyword = params.keyword;

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const clearFilters = () => {
    setPrice([0, 200000]);
    setCategory("");
    setRatings(0);
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, category, price, ratings, currentPage));
  }, [
    dispatch,
    keyword,
    category,
    price,
    ratings,
    currentPage,
    error,
    enqueueSnackbar,
  ]);
  return (
    
    <div className="bg-white">
      <MetaData title="All Products | A-Wears" />

<Categories/>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <span
                  className="uppercase text-white text-xs cursor-pointer font-medium px-25 py-2.5 bg-[#7132a8] text-center"
                  onClick={() => clearFilters()}
                >
                  clear all
                </span>
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    {/* Price Slider Filter */}
                    <div className="flex flex-col gap-2 border-b px-4">
                      <span className="font-medium text-xs">PRICE</span>
                      <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        getAriaLabel={() => "Price range slider"}
                        min={0}
                        max={200000}
                      />
                      <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                          ₹{price[0].toLocaleString()}
                        </span>
                        <span className="font-medium text-gray-400">to</span>
                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                          ₹{price[1].toLocaleString()}
                        </span>
                      </div>
                    </div>
                    {/* Price Slider Filter */}

                    {/* Category Filter */}
                    <div className="flex flex-col border-b px-4">
                      <div
                        className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                        onClick={() => setCategoryToggle(!categoryToggle)}
                      >
                        <p className="font-medium text-xs uppercase">
                          Category
                        </p>
                        {categoryToggle ? (
                          <ExpandLessIcon sx={{ fontSize: "20px" }} />
                        ) : (
                          <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                        )}
                      </div>
                      {categoryToggle && (
                        <div className="flex flex-col pb-1">
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="category-radio-buttons-group"
                              onChange={(e) => setCategory(e.target.value)}
                              name="category-radio-buttons"
                              value={category}
                            >
                              {categories.map((el, i) => (
                                <FormControlLabel
                                  value={el}
                                  control={<Radio size="small" />}
                                  label={
                                    <span className="text-sm" key={i}>
                                      {el}
                                    </span>
                                  }
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      )}
                    </div>
                    {/* Category Filter */}

                    {/* Ratings Filter */}
                    <div className="flex flex-col border-b px-4">
                      <div
                        className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                        onClick={() => setRatingsToggle(!ratingsToggle)}
                      >
                        <p className="font-medium text-xs uppercase">ratings</p>
                        {ratingsToggle ? (
                          <ExpandLessIcon sx={{ fontSize: "20px" }} />
                        ) : (
                          <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                        )}
                      </div>
                      {ratingsToggle && (
                        <div className="flex flex-col pb-1">
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="ratings-radio-buttons-group"
                              onChange={(e) => setRatings(e.target.value)}
                              value={ratings}
                              name="ratings-radio-buttons"
                            >
                              {[4, 3, 2, 1].map((el, i) => (
                                <FormControlLabel
                                  value={el}
                                  key={i}
                                  control={<Radio size="small" />}
                                  label={
                                    <span className="flex items-center text-sm">
                                      {el}
                                      <StarIcon
                                        sx={{ fontSize: "12px", mr: 0.5 }}
                                      />{" "}
                                      & above
                                    </span>
                                  }
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      )}
                    </div>
                    {/* Ratings Filter */}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-300 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Shop by Choice
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-[#7132a8] group-hover:text-[#7132a8]"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only ">View grid</span>
                <Squares2X2Icon className="h-5 w-5 text-[#7132a8]" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                
                <FunnelIcon className="h-5 w-5 text-[#7132a8]" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {/* Price Slider Filter */}
                <div className="flex flex-col gap-2 border-b px-4">
                <span
                  className="uppercase text-white px-2.4 py-3.5 text-center bg-[#7132a8] text-xs cursor-pointer font-medium"
                  onClick={() => clearFilters()}
                >
                  clear all
                </span>
                  <span className="font-medium text-xs">PRICE</span>

                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    getAriaLabel={() => "Price range slider"}
                    min={0}
                    max={200000}
                  />

                  <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
                    <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                      ₹{price[0].toLocaleString()}
                    </span>
                    <span className="font-medium text-gray-400">to</span>
                    <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                      ₹{price[1].toLocaleString()}
                    </span>
                  </div>
                </div>
                {/* Price Slider Filter */}

                {/* Category Filter */}
                <div className="flex flex-col border-b px-4">
                  <div
                    className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                    onClick={() => setCategoryToggle(!categoryToggle)}
                  >
                    <p className="font-medium text-xs uppercase">Category</p>
                    {categoryToggle ? (
                      <ExpandLessIcon sx={{ fontSize: "20px" }} />
                    ) : (
                      <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                    )}
                  </div>

                  {categoryToggle && (
                    <div className="flex flex-col pb-1">
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="category-radio-buttons-group"
                          onChange={(e) => setCategory(e.target.value)}
                          name="category-radio-buttons"
                          value={category}
                        >
                          {categories.map((el, i) => (
                            <FormControlLabel
                              value={el}
                              control={<Radio size="small" />}
                              label={
                                <span className="text-sm" key={i}>
                                  {el}
                                </span>
                              }
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )}
                </div>
                {/* Category Filter */}

                {/* Ratings Filter */}
                <div className="flex flex-col border-b px-4">
                  <div
                    className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                    onClick={() => setRatingsToggle(!ratingsToggle)}
                  >
                    <p className="font-medium text-xs uppercase">ratings</p>
                    {ratingsToggle ? (
                      <ExpandLessIcon sx={{ fontSize: "20px" }} />
                    ) : (
                      <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                    )}
                  </div>

                  {ratingsToggle && (
                    <div className="flex flex-col pb-1">
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="ratings-radio-buttons-group"
                          onChange={(e) => setRatings(e.target.value)}
                          value={ratings}
                          name="ratings-radio-buttons"
                        >
                          {[4, 3, 2, 1].map((el, i) => (
                            <FormControlLabel
                              value={el}
                              key={i}
                              control={<Radio size="small" />}
                              label={
                                <span className="flex items-center text-sm">
                                  {el}
                                  <StarIcon
                                    sx={{ fontSize: "12px", mr: 0.5 }}
                                  />{" "}
                                  & above
                                </span>
                              }
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )}
                </div>
                {/* Ratings Filter */}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* <!-- search column --> */}
                <div className="flex-1">
                  {!loading && products?.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
                      <img
                        draggable="false"
                        className="w-1/2 h-44 object-contain"
                        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
                        alt="Search Not Found"
                      />
                      <h1 className="text-2xl font-medium text-gray-900">
                        Sorry, no results found!
                      </h1>
                      <p className="text-xl text-center text-primary-grey">
                        Please check the spelling or try searching for something
                        else
                      </p>
                    </div>
                  )}

                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">
                      <div className="grid md:grid-cols-3 sm:grid-cols-2 w-full place-content-start overflow-hidden pb-4 border-b ">
                        {products?.map((product) => (
                          <Product {...product} key={product._id} />
                        ))}
                      </div>
                      {filteredProductsCount > resultPerPage && (
                        <Pagination
                          count={Number(
                            (
                              (filteredProductsCount + 6) /
                              resultPerPage
                            ).toFixed()
                          )}
                          page={currentPage}
                          onChange={(e, val) => setCurrentPage(val)}
                          color="secondary"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
