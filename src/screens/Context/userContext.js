import React, { createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const Getuserdata = async (navigateFunction) => {
    try {
      const TOKEN = await AsyncStorage.getItem('ACCESS_TOKEN');
      const ACCESS_TOKEN = JSON.parse(TOKEN);
      if (ACCESS_TOKEN) {
        navigateFunction('Tab');
      } else {
        navigateFunction('OnboardScreen');
      }
    } catch (error) {
      console.log('Error getting user data:', error);
    }
  };

  return (
    <UserContext.Provider value={{ Getuserdata }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export const translateText = async (text) => {
  console.log("ffffffffffffffffffuk",text);
  
  let targetLanguage = await AsyncStorage?.getItem('selectedLanguage') || 'en';
  if (targetLanguage === 'ma') {
    targetLanguage = 'ml';
  }

  if (!text?.trim()) return '';

  const response = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`
  );

  const result = await response?.json();
  return result[0][0][0];
};
