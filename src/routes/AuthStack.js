import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/AuthStack/LoginScreen';
import SignUpScreen from '../screens/AuthStack/SignUpScreen';
import SplashScreen from '../screens/AuthStack/SplashScreen';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: '#fff'},
      }}
      initialRouteName="Login">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerTitle: 'Welcome'}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{headerTitle: 'Sign Up'}}
      />
    </Stack.Navigator>
  );
};
