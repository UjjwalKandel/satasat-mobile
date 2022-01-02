import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LentToDetails = ({lent}) => {
  if (!lent) {
    return null;
  }
  return (
    <View>
      <Text>{JSON.stringify(lent)}</Text>
    </View>
  );
};

export default LentToDetails;

const styles = StyleSheet.create({});
