import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../../axiosInstance";

// Create the UserContext
const UserContext = createContext();

// Create the provider component
const UserContextProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null); // State to hold user data
  const [islogin, setislogin] = useState(false); // State to hold user data

  const [token, setToken] = useState(null); // Token state

  // Get the token from cookies when the component mounts
  useEffect(() => {
    const getToken = Cookies.get('token');
    if (token) {
        setislogin(true)
    }
    setToken(getToken); // Set the token state
  }, []);

  useEffect(() => {
    // Only fetch user data if token exists
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/user/detail`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setLoginUser(response.data.data); // Set user data if the request is successful
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      };

      fetchData();
    }
  }, [token]); // This effect will run again if the token changes

  return (
    <UserContext.Provider value={{ loginUser, setLoginUser, token }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

export { UserContextProvider, useUserContext };
