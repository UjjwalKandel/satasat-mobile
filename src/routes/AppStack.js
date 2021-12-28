import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Icon} from '@ui-kitten/components';

import {HomeStackScreen} from '../screens/AppStack/HomeStackScreen';
import SettingsScreen from '../screens/AppStack/SettingsScreen';
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
      {/* <BottomTabs.Screen
        name="Search"
        component={SearchScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                style={{height: 24, width: 24}}
                name={focused ? 'search' : 'search-outline'}
                fill={focused ? '#FFCD00' : '#000'}
              />
            );
          },
        })}
      />
      <BottomTabs.Screen
        name="Explore"
        component={ExploreScreen}
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
        name="Favorites"
        component={FavoritesScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                style={{height: 24, width: 24}}
                name={focused ? 'heart' : 'heart-outline'}
                fill={focused ? '#FFCD00' : '#000'}
              />
            );
          },
        })}
      /> */}
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
