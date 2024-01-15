import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const Verify = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const handleVerification = async () => {
    const searchParams = new URLSearchParams(location.search);

    try {
      const userId = searchParams.get('userId');
      const token = searchParams.get('token');
      console.log(userId);
      console.log(token);

      const response = await fetch(
        // `http://localhost:2121/api/verify-email`,
        // `http://localhost:2121/api/verify-email/?user=${param.userId}&$token=${param.token}`
        // `https://auth-backend-d9n5.onrender.com/api/${param.userId}/verify-email/${param.token}`,
        `https://auth-backend-d9n5.onrender.com/api/verify-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            token,
          }),
        }
      );
      const data = await response.json();
      setLoading(false);

      if (data.success) {
        setVerifyEmail(true);
        toast.success(data.message);
        return;
      }
      toast(data.message);
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleVerification();
  }, [param]);
  return (
    <div className="">
      {loading ? (
        <div className="flex flex-col items-center justify-center m-auto mt-20">
          <p className="text-3xl mt-4">Loading...</p>
        </div>
      ) : (
        <div className="">
          {verifyEmail ? (
            <div className="flex flex-col items-center justify-center m-auto mt-20">
              <GoVerified className="text-8xl" />
              <p className="text-3xl mt-4 text-green-600 italic">
                Email Verification Successful. You can login...
              </p>
              <Link to="/login">
                <button className="text-2xl border p-2 rounded-2xl bg-zinc-300 text-blue-600 font-bold uppercase mt-5 italic">
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center m-auto mt-20">
              <h1>Verification failed</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;
