import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className="min-w-screen">
        <div className="max-w-6xl w-full flex gap-4 mx-auto">
          <div className="logo text-xl">
            <span className="text-3xl font-bold text-teal-700 ">Medi-Care</span>
          </div>
          <div className={show ? "navLinks showmenu" : "navLinks"}>
            <div className="links">
              <Link to={"/"} onClick={() => setShow(!show)}>
                Home
              </Link>
              <Link to={"/appointment"} onClick={() => setShow(!show)}>
                Appointment
              </Link>
              <Link to={"/about"} onClick={() => setShow(!show)}>
                About Us
              </Link>
              <Link to={"/chatbot"} onClick={() => setShow(!show)}>
                {" "}
                {/* Add this link */}
                Chatbot
              </Link>
              <Link to={"/upload"} onClick={() => setShow(!show)}>
                Upload
              </Link>
            </div>
            {isAuthenticated ? (
              <button className="logoutBtn btn" onClick={handleLogout}>
                LOGOUT
              </button>
            ) : (
              <button className="loginBtn btn" onClick={goToLogin}>
                LOGIN
              </button>
            )}
          </div>
          <div className="hamburger" onClick={() => setShow(!show)}>
            <GiHamburgerMenu />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
