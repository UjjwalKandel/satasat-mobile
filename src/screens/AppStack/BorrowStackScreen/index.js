import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BorrowScreen from './BorrowScreen';

const Stack = createNativeStackNavigator();

export const BorrowStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={BorrowScreen}
        name="BorrowScreen"
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        component={BookDetailScreen}
        name="BookDetailScreen"
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
