import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from '../redux/userSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.confirmPassword ||
        !formData.email ||
        !formData.password
      ) {
        toast('All fields must be filled');
        return;
      }
      dispatch(registerStart());
      const response = await fetch('http://localhost:2121/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!data.success) {
        dispatch(registerFailure(data));
        toast(data.message);
        return;
      }

      dispatch(registerSuccess(data));
      toast(data.message);
      navigate('/login');
      return;
    } catch (error) {
      dispatch(registerFailure());
      toast(error.message);
      console.error(error.message);
      return;
    }
  };
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 md:max-w-[50vw] md:m-auto md:flex md:flex-col">
      <h1 className="uppercase font-bold text-3xl pb-2">Register</h1>
      <div>
        <form
          method="POST"
          className="space-y-4 md:space-y-6"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-justify">
              First Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-justify">
              Last Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-justify">
              Email
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-justify">
              Password
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-justify">
              Confirm Password
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleChange}
            />
          </div>

          <button
            className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="submit"
          >
            {loading ? 'loading' : 'REGISTER'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
