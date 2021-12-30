import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import {Text, TabView, Tab} from '@ui-kitten/components';
import BookCard from '../../../components/BookCard';
import BookList from '../../../components/BookList';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BookList />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
