import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../Context/userAuth';

function Home() {
  const {loginUser,token} = useUserContext()
  console.log("isloggedin",loginUser);
  
  return (
    <div className='w-full h-screen'>
      <div className='bg-blue-500 p-4 rounded'>
        <div className='flex items-center justify-between'>
          <h1 className='text-white text-2xl font-semibold'>Saylani</h1>
          <div className='flex items-center space-x-6'>
            <Link to='/signup' className='text-white hover:text-gray-300'>register user</Link>
            <Link to='/department-manger' className='text-white hover:text-gray-300'>Department Manager</Link>
            <Link to='/adminpanel' className='text-white hover:text-gray-300'>Admin Panel</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
