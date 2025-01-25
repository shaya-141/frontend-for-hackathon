import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';

function DepartmentManager() {
  const [token, setToken] = useState('');
  const [tokenDetails, setTokenDetails] = useState(null);
  const [error, setError] = useState('');

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };
  

  const fetchTokenDetails = async () => {
    try {
      // Assuming token is stored in localStorage
      if (!token) {
        console.error('No token found');
        return;
      }
      console.log("tpoken", token);


      const response = await axiosInstance.get(`/auth/detailtoken?token=${token}`);


      setTokenDetails(response.data);
      console.log("response", tokenDetails);



      // Store response data in state
    } catch (err) {
      setError(err.message);  // Handle errors and store them in state
      console.error('Error fetching token:', err);
    }
  };

  return (
    <div className="w-full h-screen ">
      <div className='w-full flex justify-center'>
        <h1 className='mx-auto mt-6 text-[22px] font-medium text-gray-700'>Department Manager</h1>
      </div>
      <div className='w-[80%] mt-6 mx-auto h-12 flex items-center justify-between'>
        <input
          type="text"
          className='w-[70%] border h-full rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder="Enter token"
          value={token}
          onChange={handleTokenChange}
        />
        <button
          className='w-[300px] font-medium bg-blue-500 text-white rounded-lg h-full hover:bg-blue-600 transition duration-300'
          onClick={fetchTokenDetails}
        >
          Get Token Details
        </button>
      </div>

      <div className='w-[700px] mx-auto mt-5 p-7 bg-white shadow-lg rounded-lg'>

        <div className='mb-6'>
          <div className='text-[18px] font-medium flex items-center mb-3'>
            <h1 className='mr-2 text-gray-600'>Name:</h1>
            <h1 className='text-gray-800'>{tokenDetails?.data?.name}</h1>
          </div>

          <div className='text-[18px] font-medium flex items-center mb-3'>
            <h1 className='mr-2 text-gray-600'>Department:</h1>
            <h1 className='text-gray-800'>{tokenDetails?.data?.department}</h1>
          </div>

          <div className='text-[18px] font-medium flex items-center mb-3'>
            <h1 className='mr-2 text-gray-600'>Purpose:</h1>
            <h1 className='text-gray-800'>{tokenDetails?.data?.purpose}</h1>
          </div>

          <div className='text-[18px] font-medium flex items-center mb-6'>
            <h1 className='mr-2 text-gray-600'>Status:</h1>
            <h1 className='text-gray-800'>{tokenDetails?.data?.status}</h1>
          </div>
        </div>


        <div className='flex gap-4'>
          <button
            className='w-[140px] py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Accept
          </button>
          <button
            className='w-[140px] py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300'
          >
            Reject
          </button>
        </div>
      </div>

      {error && (
        <div className='mt-4 text-center text-red-600'>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default DepartmentManager;
