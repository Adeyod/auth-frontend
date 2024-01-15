import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SendEmailVerificationLink = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // const handleLoading = () => {
  //   setLoading(true);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('http://localhost:2121/api/resend-email', formData)
      .then((result) => {
        setLoading(false);
        if (result.data.success === true) {
          toast.success(result.data.message);
          navigate('/');
          return;
        }

        toast.error(result.data.message);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
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

          <button
            className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="submit"
          >
            {loading ? 'LOADING...' : 'GET VERIFICATION MAIL'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendEmailVerificationLink;
