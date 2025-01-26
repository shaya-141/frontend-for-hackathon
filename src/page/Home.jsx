import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../Context/userAuth';
import Cookies from 'js-cookie';

function Home() {
  const { loginUser, setLoginUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('email');
    setLoginUser(null);
    navigate('/login');
  };

  return (
    <div className='w-full h-screen'>
      <div className='bg-blue-500 p-4 rounded'>
        <div className='flex items-center justify-between'>
          <h1 className='text-white text-2xl font-semibold'>Saylani</h1>
          <div className='flex items-center space-x-6'>
            {loginUser?.role === 'admin' && (
              <>
                <Link to='/signup' className='text-white hover:text-gray-300'>Register User</Link>
                <Link to='/department-manager' className='text-white hover:text-gray-300'>Department Manager</Link>
                <Link to='/adminpanel' className='text-white hover:text-gray-300'>Admin Panel</Link>
              </>
            )}
            {loginUser?.role === 'manager' && (
              <>
                <Link to='/department-manager' className='text-white hover:text-gray-300'>Department Manager</Link>
              </>
            )}
            {loginUser?.role === 'receptionist' && (
              <>
                <Link to='/signup' className='text-white hover:text-gray-300'>Register User</Link>
              </>
            )}
            {!loginUser && (
              <Link to='/login' className=' flex items-center justify-center text-black rounded-md bg-white w-[100px] h-12'>Login</Link>
            )}
            {loginUser && (
              <button
                onClick={handleLogout}
                className='text-black rounded-md bg-white w-[100px] h-12'
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      <div className='w-full bg-blue-100 flex items-center justify-center rounded-xl h-[400px] mt-2'>
        <h1 className='text-[22px] font-semibold text-black'>Saylani Beneficer</h1>
      </div>
    </div>
  );
}

export default Home;
