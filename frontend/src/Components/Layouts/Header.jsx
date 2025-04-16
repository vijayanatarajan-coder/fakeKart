import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const access_token = sessionStorage.getItem("googleToken");

      try {
        const googleResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );

        const googleUser = googleResponse.data;

        if (googleUser) {
          setUser(googleUser);
          const email = googleUser.email;

          const backendResponse = await axios.get(
            `http://localhost:8000/api/user/${email}`
          );

          if (backendResponse.data) {
            setRole(backendResponse.data.user.role);
          }
        }
      } catch (error) {
        console.error("Error fetching or sending user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      sessionStorage.setItem("googleToken", response.access_token);

      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.access_token}`
        );

        setUser(data);

        const responseFromBackend = await axios.post(
          "http://localhost:8000/api/users",
          data
        );
        setRole(responseFromBackend.data.user.role);
        if (responseFromBackend.data.user.role === "Admin") {
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error fetching or sending user data:", error);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  const logout = () => {
    googleLogout();
    sessionStorage.removeItem("googleToken");
    sessionStorage.removeItem("userProfile");
    sessionStorage.removeItem("userRole");
    setUser(null);
    setRole("user");
    navigate("/");
  };

  return (
    <nav className="navbar row" role="navigation" aria-label="Main Navigation">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/" aria-label="Go to home page">
            <img width="150px" src="/Images/logo.png" alt="FakeKart Logo" />
          </Link>
        </div>
      </div>

      {/* <div className="col-12 col-md-6 mt-2 mt-md-0">
        <div className="input-group">
          <label htmlFor="search_field" className="visually-hidden">
            Search for products
          </label>
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
            aria-label="Search products"
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn" aria-label="Search">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div> */}

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {user ? (
          <>
            <img
              src={user.picture}
              alt={`Profile of ${user.name}`}
              width="40"
              style={{ borderRadius: "50%" }}
            />
            <span id="cart">{user.name}</span>

            {role === "Admin" && (
              <button className="btn dashboard-btn" id="login_btn">
                <Link to="/Admin/Dashboard" aria-label="Go to admin dashboard">
                  Dashboard
                </Link>
              </button>
            )}

            <button
              className="btn"
              id="login_btn"
              onClick={logout}
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="btn"
            id="login_btn"
            onClick={login}
            aria-label="Login"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
