import { useDispatch, useSelector } from "react-redux";
import FolderIcon from "@mui/icons-material/Folder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../actions/userAction";

const Sidebar = ({ activeTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.user);
  console.log(user);
  const handleLogout = () => {
    dispatch(logoutUser());
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    navigate("/login");
  };

  return (
    <div className="flex   sm:flex flex-col gap-10 w-1/4 px-5">
      {/* <!-- profile card --> */}
      <div className="flex flex-col items-center p-3 bg-white rounded-md shadow">
        {/* <!-- user icon --> */}
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            draggable="false"
            className="h-full w-full object-cover border-2 border-black rounded-full"
            src={user.avatar.url}
            alt="Avatar"
          />
        </div>
        {/* <!-- user name --> */}
        <div className="mt-2">
          <h2 className="font-large">Hi,{user.name}</h2>
        </div>
        {/* <!-- nav tiles --> */}
     
          {/* <!-- my orders tab --> */}
          <div className="flex items-center gap-5 px-4 py-4 ">
            <Link
              className="hidden  sm:flex  w-full justify-between font-medium text-black hover:text-primary-blue"
              to="/orders"
            >
              MY ORDERS
            </Link>
          </div>
          {/* <!-- my orders tab --> */}

          {/* <!-- my stuff tab --> */}
          <div className="hidden  md:flex flex-col pb-3 border-b text-sm">
            <Link
              className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue"
              to="/"
            >
              My Reviews & Ratings
            </Link>

            <Link
              to="/wishlist"
              className={`${
                activeTab === "wishlist"
                  ? "bg-blue-50 text-primary-blue font-medium"
                  : "hover:bg-blue-50 hover:text-primary-blue"
              } p-3 pl-14`}
            >
              My Wishlist
            </Link>
          </div>
          {/* <!-- my stuff tab --> */}

          {/* <!-- logout tab --> */}
          <div className="flex items-center gap-5 px-4 py-4 ">
            <span className=" text-primary-blue">
              <PowerSettingsNewIcon />
            </span>
            <div
              className="hidden  sm:flex w-full justify-between font-medium text-gray-500 hover:text-primary-blue cursor-pointer"
              onClick={handleLogout}
            >
              Logout
              <span className="hidden md:block">
                <ChevronRightIcon />
              </span>
            </div>
          </div>
          {/* <!-- logout tab --> */}
       
        {/* <!-- nav tiles --> */}

       
      </div>
      {/* <!-- profile card --> */}
    </div>
  );
};

export default Sidebar;
