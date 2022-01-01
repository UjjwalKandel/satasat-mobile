import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {authService} from '../services/AuthService';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadStorageData();
  }, []);

  const parseJwt = token => {
    var Buffer = require('buffer/').Buffer;
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  };

  loadStorageData = async () => {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData = JSON.parse(authDataSerialized);
        const decodedJwt = await parseJwt(_authData.token);
        if (decodedJwt.exp * 1000 < Date.now()) {
          await signOut();
        } else {
          setAuthData(_authData);
          setUserId(decodedJwt.userId);
          //print jwt to use in Swagger
          console.log(_authData);
        }
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username, password, cancelToken) => {
    try {
      const _authData = await authService.signIn(
        username,
        password,
        cancelToken,
      );
      if (_authData) {
        setAuthData(_authData);
        AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    setAuthData(undefined);
    await AsyncStorage.removeItem('@AuthData');
  };

  const signUp = async values => {
    try {
      const response = await authService.signUp(values);
      if (response) {
        setAuthData(response);
        AsyncStorage.setItem('@AuthData', JSON.stringify(response));
      }
    } catch (error) {
      console.log(error, 'auth.js');
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{authData, userId, loading, signIn, signOut, signUp}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export {AuthContext, AuthProvider, useAuth};
