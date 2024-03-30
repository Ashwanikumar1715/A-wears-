import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Searchbar from "./Searchbar";
import logo from "../../../assets/images/logo.png";
import PrimaryDropDownMenu from "./PrimaryDropDownMenu";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector((state) => state.cart);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);

  return (
    <header className=" bg-white border fixed top-0 py-2.5 w-full z-20">
      {/* <!-- navbar container --> */}
      <div className="w-full sm:w-full lg:w-11/12 px-1 sm:px-4 m-auto flex   relative">
        {/* <!-- logo & search container --> */}
        <div className="flex items-center flex-1 ">
          <Link className="h-12 mr-5 sm:mr-20" to="/">
            <img
              draggable="false"
              className="h-full w-full object-contain"
              src={logo}
              alt="HarvestHub Logo"
            />
          </Link>

          <Searchbar />
        </div>
        {/* <!-- logo & search container --> */}

        {/* <!-- right navs --> */}
        <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">
          {isAuthenticated === false ? (
            <Link
              to="/login"
              className="px-2.5 sm:px-9 py-2.5 text-white bg-[#6a09e8] border font-medium rounded-lg cursor-pointer"
            >
              Login
            </Link>
          ) : (
            <span
              className="userDropDown flex items-center text-white px-2.5 py-2.5 bg-[#7132a8] rounded-lg font-medium gap-1 cursor-pointer"
              onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
            >
              {user.name && user.name.split(" ", 1)}
              <span>
                {togglePrimaryDropDown ? (
                  <ExpandLessIcon sx={{ fontSize: "16px" }} />
                ) : (
                  <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                )}
              </span>
            </span>
          )}

          {togglePrimaryDropDown && (
            <PrimaryDropDownMenu
              setTogglePrimaryDropDown={setTogglePrimaryDropDown}
              user={user}
            />
          )}

          <Link
            to="/cart"
            className="flex items-center text-[#6a09e8] font-medium gap-2 relative"
          >
            <span>
              <ShoppingCartIcon />
            </span>
            {cartItems.length > 0 && (
              <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                {cartItems.length}
              </div>
            )}
            Cart
          </Link>
        </div>
        {/* <!-- right navs --> */}
      </div>
      {/* <!-- navbar container --> */}
    </header>
  );
};

export default Header;
