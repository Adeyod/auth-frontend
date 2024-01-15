import axios from 'axios';
import React, { useState } from 'react';

const PaymentPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post('http://localhost:2121/api/payment', formData)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <button
          className="mt-10 text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={() => setOpen(!open)}
        >
          credit wallet
        </button>
      </div>

      {open && (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 md:max-w-[50vw] md:m-auto md:flex md:flex-col">
          <h1 className="uppercase font-bold text-3xl pb-2">CREDIT WALLET</h1>
          <div>
            <form
              method="POST"
              className="space-y-4 md:space-y-6"
              action=""
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col">
                <label htmlFor="number" className="text-justify">
                  Amount
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  name="amount"
                  id="number"
                  onChange={handleChange}
                />
              </div>

              <button
                className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                type="submit"
              >
                {loading ? 'LOADING...' : 'DEDUCT'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
