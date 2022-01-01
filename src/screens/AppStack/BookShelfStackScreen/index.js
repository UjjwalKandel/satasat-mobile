import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BookDetailScreen from '../HomeStackScreen/BookDetailScreen';
import BookShelfScreen from './BookShelfScreen';
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
        component={BookDetailScreen}
        name="BookDetailScreen"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
