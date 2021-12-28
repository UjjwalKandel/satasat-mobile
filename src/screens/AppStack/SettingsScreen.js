import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from '@ui-kitten/components';

import {useAuth} from '../../contexts/Auth';

const SettingsScreen = () => {
  const auth = useAuth();
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Log out failed', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
