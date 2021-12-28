import React from 'react';
import {View, Text} from 'react-native';

export const CustomDivider = () => (
  <View
    style={{
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View style={{width: '44%', borderColor: '#111', borderTopWidth: 0.25}} />
    <Text style={{marginHorizontal: 5, color: '#111', fontSize: 13}}>OR</Text>
    <View style={{width: '44%', borderColor: '#111', borderTopWidth: 0.25}} />
  </View>
);
