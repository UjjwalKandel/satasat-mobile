import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Icon, Text} from '@ui-kitten/components';

import {HomeStackScreen} from '../screens/AppStack/HomeStackScreen';
import SettingsScreen from '../screens/AppStack/SettingsScreen';
import {BookShelfStackScreen} from '../screens/AppStack/BookShelfStackScreen';
import {BorrowStackScreen} from '../screens/AppStack/BorrowStackScreen';
// import BookShelfScreen from '../screens/AppStack/BookShelfStackScreen/BookShelfScreen';
// import ExploreScreen from '../screens/AppStack/ExploreScreen';
// import SettingsScreen from '../screens/AppStack/SettingsScreen';
// import SearchScreen from '../screens/AppStack/SearchScreen';
// import FavoritesScreen from '../screens/AppStack/FavoritesScreen';

const BottomTabs = createBottomTabNavigator();

export const AppStack = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <BottomTabs.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                style={{height: 24, width: 24}}
                name={focused ? 'home' : 'home-outline'}
                fill={focused ? '#FFCD00' : '#000'}
              />
            );
          },
        })}
      />
      <BottomTabs.Screen
        name="BookShelfStackScreen"
        component={BookShelfStackScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                style={{height: 24, width: 24}}
                name={focused ? 'book' : 'book-outline'}
                fill={focused ? '#FFCD00' : '#000'}
              />
            );
          },
          headerShown: true,
          headerTitle: () => <Text category="h6">My Bookshelf</Text>,
        })}
      />
      <BottomTabs.Screen
        name="BorrowStackScreen"
        component={BorrowStackScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                style={{height: 24, width: 24}}
                name={focused ? 'grid' : 'grid-outline'}
                fill={focused ? '#FFCD00' : '#000'}
              />
            );
          },
        })}
      />
      <BottomTabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                style={{height: 24, width: 24}}
                name={focused ? 'person' : 'person-outline'}
                fill={focused ? '#FFCD00' : '#000'}
              />
            );
          },
        })}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({});
