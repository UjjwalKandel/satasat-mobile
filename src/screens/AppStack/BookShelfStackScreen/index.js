import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BookShelfScreen from './BookShelfScreen';
import DetailScreen from './DetailScreen';
import BookDetailScreen from '../HomeStackScreen/BookDetailScreen';
const Stack = createNativeStackNavigator();

export const BookShelfStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={BookShelfScreen}
        name="HomeScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={DetailScreen}
        name="DetailScreen"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
