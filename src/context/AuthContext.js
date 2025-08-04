import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { api } from '../api/axiosConfig'; // Sẽ tạo ở bước 2

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let personalID;
      try {
        personalID = await AsyncStorage.getItem('personalID');
        // const { data } = await api.get('/user/profile');
        // setUser(data);
      } catch (e) {
        console.error('Restoring token failed', e);
      }
      setUserToken(personalID);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const signIn = async (personalID, userData) => {
    setUserToken(personalID);
    setUser(userData);
    await AsyncStorage.setItem('personalID', personalID);
  };

  const signOut = async () => { 
    setUserToken(null);
    setUser(null);
    await AsyncStorage.removeItem('personalID');
  };

  const value = {
    userToken,
    user,
    isLoading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};