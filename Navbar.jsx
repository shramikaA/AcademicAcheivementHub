import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Toaster,toast} from "sonner"


const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate()
  // Check for token on component mount

  const checkToken = async() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/checkAuth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.loggedIn);
        setIsAuthenticated(response.data.loggedIn);
        //navigate('/search')
      })
      .catch((error) => {
        console.error("Access denied", error);
      });
  };

  useEffect(() => {
    checkToken()
  }, []); // Empty array ensures this effect runs once when the component mounts

  // Logout function to remove token and update navbar
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false); // Update authentication state
    setTimeout(()=>{
      navigate('/search')
    },1000)
    toast.success("Logged out successfully")
  };

  return (
    <>
      <Toaster richColors position="top-center" />
        <div className="flex justify-between m-5 mt-0 pt-10 align-middle text-sm md:mx-10 font-nunito">
      <Link to={"/"}>
      <img src="/mrcet_logo.png" alt="MRCET logo" className="w-[60px] mr-5" />
      </Link>
      <div className="pt-5">
        <ul className="flex flex-between gap-2 md:gap-5 text-center text-[12px] md:text-[20px]">
          <li>
            <Link to="/">Search</Link>
          </li>
          <li>
            <Link to={isAuthenticated?("/upload"):("/login")}>Upload</Link>
          </li>
          <li>
            <Link to="/myCertifications">My Certificates</Link>
          </li>
          {/* Conditionally render Login or Logout based on isLoggedIn */}
          {!isAuthenticated ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
    </>

  );
};

export default Navbar;
