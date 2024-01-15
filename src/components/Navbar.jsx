import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logoutSuccess } from '../redux/userSlice';
import axios from 'axios';

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://auth-backend-d9n5.onrender.com/api/logout',
        // 'http://localhost:2121/api/logout',
        {},
        {
          withCredentials: true, // Ensure credentials are included
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data); // Check the response from the server
      dispatch(logoutSuccess());
      toast(response.data.message);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-red-100">
      <div className="flex justify-between p-5 font-bold text-slate-700">
        <div className="">
          <Link to="/">LOGO</Link>
        </div>

        {currentUser && currentUser !== null ? (
          <div className="">
            <div className="flex justify-between gap-4 uppercase">
              <div className="gap-5 hidden md:flex">
                <button onClick={handleLogout}>Logout</button>
                <Link to="/payment">Payment</Link>
              </div>

              <div>
                <button className="md:hidden" onClick={handleToggle}>
                  {toggle ? (
                    <IoMdClose className="text-3xl" />
                  ) : (
                    <IoMdMenu className="text-3xl" />
                  )}
                </button>
                <div
                  className={
                    toggle
                      ? 'flex flex-col absolute bg-red-100 top-[70px] right-0 p-4'
                      : 'hidden'
                  }
                >
                  <button onClick={handleLogout}>Logout</button>
                  <Link to="/payment">Payment</Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="flex justify-between gap-4 uppercase">
              <div className="gap-5 hidden md:flex">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>

              <div>
                <button className="md:hidden" onClick={handleToggle}>
                  {toggle ? (
                    <IoMdClose className="text-3xl" />
                  ) : (
                    <IoMdMenu className="text-3xl" />
                  )}
                </button>
                <div
                  className={
                    toggle
                      ? 'flex flex-col absolute bg-red-100 top-[70px] right-0 p-4'
                      : 'hidden'
                  }
                >
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
