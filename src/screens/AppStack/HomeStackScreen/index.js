import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import BookDetailScreen from './BookDetailScreen';
const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        component={BookDetailScreen}
        name="BookDetailScreen"
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({});
