import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import {Text} from '@ui-kitten/components';

const LentToDetails = ({lent}) => {
  if (!lent) {
    return null;
  }

  return lent[0] ? (
    <View
      style={{
        marginTop: '1.25%',
        padding: '2.5%',
        backgroundColor: '#fff',
      }}>
      <Text category="h6">Book Being Lent To:</Text>
      <Text>Name: {lent[0].User.full_name}</Text>
      <Text>Address: {lent[0].User.address}</Text>
      <Text>Phone No.: {lent[0].User.phone}</Text>
    </View>
  ) : null;
};

export default LentToDetails;

const styles = StyleSheet.create({});
