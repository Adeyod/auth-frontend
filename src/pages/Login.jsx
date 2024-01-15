import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';

axios.defaults.withCredentials = true;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState('');
  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        toast('All fields must be filled');
        return;
      }
      console.log(formData);
      dispatch(loginStart());
      await axios
        .post('https://auth-backend-d9n5.onrender.com/api/login', formData)
        // .post('http://localhost:2121/api/login', formData)
        .then((result) => {
          console.log('result.data:', result.data);
          const { user, message, success } = result.data;

          if (success === true) {
            dispatch(loginSuccess(user));
            toast(message);
            navigate('/');
            return;
          }

          dispatch(loginFailure());
          toast(message);
          return;
        })
        .catch((err) => {
          console.log(err);
          dispatch(loginFailure(err));
          toast(err.message);
          return;
        });
    } catch (error) {
      dispatch(loginFailure());
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 md:max-w-[50vw] md:m-auto md:flex md:flex-col">
      <h1 className="uppercase font-bold text-3xl pb-2">login</h1>
      <div>
        <form
          method="POST"
          className="space-y-4 md:space-y-6"
          action=""
          onSubmit={handleSubmit}
        >
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

          <button
            className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="submit"
          >
            {loading ? 'LOADING...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
