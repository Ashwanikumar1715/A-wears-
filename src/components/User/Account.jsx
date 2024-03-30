import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Layouts/Loader";
import MinCategory from "../Layouts/MinCategory";
import MetaData from "../Layouts/MetaData";
import Categories from "../Layouts/Categories";

const Account = () => {
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const getLastName = () => {
    const nameArray = user.name.split(" ");
    return nameArray[nameArray.length - 1];
  };

  return (
    <>
      <MetaData title="My Profile" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <Categories/>
          <main className="mx-2  mt-20  sm:mt-0">
            {/* <!-- row --> */}
            <div className="flex flex-row gap-3.5 sm:w-10/12 sm:mt-4 m-auto mb-7">
              <Sidebar activeTab={"profile"} />

              {/* <!-- details column --> */}
              <div className="shadow-lg rounded-md flex-1 overflow-hidden  bg-white">
                {/* <!-- edit info container --> */}
                <div className="flex flex-col gap-10 m-4 sm:mx-8 sm:my-6">
                  {/* <!-- personal info --> */}
                  <div className="flex flex-col gap-5 items-start ">
                    <span className="font-medium text-lg">
                      Personal Information{" "}
                      <Link
                        to="/account/update"
                        className="text-sm text-primary-blue font-medium ml-8 cursor-pointer"
                      >
                        Edit
                      </Link>
                    </span>

                    <div
                      className="flex flex-col md:flex-row items-center gap-10"
                      id="personalInputs"
                    >
                      <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                        <label className="text-xs text-gray-500">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={user.name.split(" ", 1)}
                          className="text-sm outline-none border-none cursor-not-allowed text-gray-500"
                          disabled
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                        <label className="text-xs text-gray-500">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={getLastName()}
                          className="text-sm outline-none border-none cursor-not-allowed text-gray-500"
                          disabled
                        />
                      </div>
                    </div>

                    {/* <!-- gender --> */}
                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm">Your Gender</h2>
                      <div className="flex items-center gap-8" id="radioInput">
                        <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                          <input
                            type="radio"
                            name="gender"
                            checked={user.gender === "male"}
                            id="male"
                            className="h-4 w-4 cursor-not-allowed"
                            disabled
                          />
                          <label htmlFor="male" className="cursor-not-allowed">
                            Male
                          </label>
                        </div>
                        <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                          <input
                            type="radio"
                            name="gender"
                            checked={user.gender === "female"}
                            id="female"
                            className="h-4 w-4 cursor-not-allowed"
                            disabled
                          />
                          <label
                            htmlFor="female"
                            className="cursor-not-allowed"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* <!-- gender --> */}
                  </div>
                  {/* <!-- personal info --> */}

                  {/* <!-- email address info --> */}
                  <div className="flex flex-col gap-5 items-start">
                    <span className="font-medium text-lg">
                      Email Address
                      <Link
                        to="/account/update"
                        className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer"
                      >
                        Edit
                      </Link>
                      <Link
                        to="/password/update"
                        className="text-sm text-primary-blue font-medium ml-3 sm:ml-8"
                      >
                        Change Password
                      </Link>
                    </span>

                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                        <label className="text-xs text-gray-500">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          className="text-sm outline-none border-none cursor-not-allowed text-gray-500"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- email address info --> */}


                </div>
                {/* <!-- edit info container --> */}

               
              </div>
              {/* <!-- details column --> */}
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Account;
