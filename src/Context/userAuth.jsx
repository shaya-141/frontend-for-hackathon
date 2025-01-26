import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../../axiosInstance";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);
  const [islogin, setislogin] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setemail] = useState(null);
  
  useEffect(() => {
    const getToken = Cookies.get('token');
    const getemail = Cookies.get('email');
    if (getToken) {
      setislogin(true);
    }
    setToken(getToken);
    setemail(getemail)
    console.log(getToken);
    
  }, []);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/auth/userDetail?email=${email}`);
          console.log("response>>>",response);
          
          setLoginUser(response.data.data);
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      };

      fetchData();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ loginUser, setLoginUser, token }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

export { UserContextProvider, useUserContext };
