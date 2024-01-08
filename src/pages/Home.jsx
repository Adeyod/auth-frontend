import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
  const fetchProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:2121/api/profile-details',
        {},
        {
          withCredentials: true, // Ensure credentials are included
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data); // Check the response from the server
      toast(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  // const fetchProfile = async () => {
  //   const token = document.cookie
  //     .split('; ')
  //     .find((row) => row.startsWith('access_token'))
  //     .split('=')[1];
  //   console.log(token);
  //   const res = await fetch('http://localhost:2121/api/profile-details', {
  //     method: 'GET',
  //     credentials: 'include',
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };

  useEffect(() => {
    fetchProfile();
  });
  return <div>Home</div>;
};

export default Home;
