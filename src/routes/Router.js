import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text} from 'react-native';

// import {AuthStack} from './AuthStack';
// import {AppStack} from './AppStack';
import {useAuth} from '../contexts/Auth';

import {Loading} from '../components/Loading';
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';

const Router = () => {
  const {authData, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
