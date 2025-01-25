import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';  
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas'; 

function Slip() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setloading ] = useState(false);

  const { token } = useParams();
  
  const fetchToken = async () => {
    try {
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axiosInstance.get(`/auth/detailtoken?token=${token}`);
      setResponseData(response.data); 

    } catch (err) {
      setError(err.message);  
      console.error('Error fetching token:', err);
    }
  };

  useEffect(() => {
    fetchToken();  
  }, [token]);

  const downloadTokenAsImage = () => {
    const slipElement = document.getElementById('slip'); 
    setloading(true)
    
    html2canvas(slipElement).then((canvas) => {
      const imageUrl = canvas.toDataURL('image/png'); 
      const link = document.createElement('a'); 
      link.href = imageUrl;
      link.download = 'token-slip.png'; 
      link.click(); 
    });
    setloading(false)
  };

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div>
      <div id="slip">

     
      <div 
         
        className='w-[500px] min-h-[400px] rounded-xl border p-8 flex flex-col items-center bg-white shadow-lg'>
        
        <div className='mb-8 flex flex-col items-center'>
          <h1 className='text-[48px] font-semibold text-teal-600'>{responseData?.data?.token}</h1>
          <h2 className='text-lg font-semibold text-gray-600 mt-2'>Token</h2>
        </div>
    
        <div className='mb-6 w-full flex justify-between'>
          <h2 className='text-xl font-semibold text-gray-800'>Name:</h2>
          <p className='text-lg font-semibold text-gray-700'>{responseData?.data?.name}</p>
        </div>
    
        <div className='space-y-4 w-full'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-700'>Purpose:</h3>
            <p className='text-lg font-semibold text-gray-800'>{responseData?.data?.purpose}</p>
          </div>
          
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-700'>Department:</h3>
            <p className='text-lg font-semibold text-gray-800'>{responseData?.data?.department}</p>
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-700'>Status:</h3>
            <p className='text-lg font-semibold text-gray-800'>{responseData?.data?.status}</p>
          </div>
        </div>

        </div>
        </div>

        <div className='mt-6 w-full'>

          <button
          className='w-full py-3 bg-blue-500 text-white font-semibold rounded-lg'
          onClick={downloadTokenAsImage} 
          >
            Download Token
          </button>
          
        </div>
        </div>
    </div>
  );
}

export default Slip;
