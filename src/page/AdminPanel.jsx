import React, { useEffect, useState } from 'react';
import Visitors from '../components/Visitor';
import UserDetailCard from '../components/UserDetailCard';
import axiosInstance from '../../axiosInstance';

function AdminPanel() {
  // State for search input and results
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [Visitor, setVisitor] = useState(null)
  const fetchVistors= async()=>{
    try {
      const response = await axiosInstance.get('/admin/getvisitors')
      console.log("data>>>>",response.data);
      setVisitor(response.data)
      console.log("response");
      
      
      
    } catch (error) {
      console.log("error>>>",error.message);
      
    }
  }
  useEffect(()=>{
      fetchVistors()
  },[])
  // Handle search function
  const handleSearch = async () => {
    try {
      // Make API request with the search input
      const response = await axiosInstance.get(`/admin/get-admin-data?cnic=${searchInput}`);
      setSearchResults(response.data.data);
      console.log("Response>>>>",searchResults);
       // Assuming 'data' contains user data
    } catch (error) {
      console.log('error>>>>', error);
      setSearchResults([]); // Clear results in case of an error
    }
  };

  return (
    <div className="w-full h-screen p-2">
      <h1 className="text-[20px] font-semibold mt-3">Dashboard</h1>
      <Visitors visitor={Visitor} />

      {/* Search Bar */}
      <div className="w-full mt-12 h-[60px] flex items-center gap-10">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-[70%] h-11 border px-3 rounded"
          placeholder="Search by CNIC"
        />
        <button
          onClick={handleSearch}
          className="font-medium text-white w-[150px] h-11 rounded bg-blue-500"
        >
          Search
        </button>
      </div>

      {/* User Detail Card (Display Search Results) */}
      <div className="mt-5">
        {searchResults.length > 0 ? (
         
            <UserDetailCard
              
              data={searchResults}
            />
          )
         : (
          <p className="text-gray-500 mt-5 pl-3">No results found. Try searching with a different CNIC.</p>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
