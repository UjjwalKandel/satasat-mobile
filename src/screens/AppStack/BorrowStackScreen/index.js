import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BorrowScreen from './BorrowScreen';
import AvailableDetailScreen from './AvailableDetailScreen';
import BorrowedDetailScreen from './BorrowedDetailScreen';
import PendingDetailScreen from './PendingDetailScreen';

const Stack = createNativeStackNavigator();

export const BorrowStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={BorrowScreen}
        name="BorrowScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={AvailableDetailScreen}
        name="AvailableDetailScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={BorrowedDetailScreen}
        name="BorrowedDetailScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={PendingDetailScreen}
        name="PendingDetailScreen"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
