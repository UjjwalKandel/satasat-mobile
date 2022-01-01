import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AvailableBooksList from '../../../components/BorrowStackScreen/AvailableBooksList';

import BorrowedBooksList from '../../../components/BorrowStackScreen/BorrowedBooksList';

const BorrowScreen = () => {
  return (
    <View style={{width: '100%', flex: 1, padding: '5%'}}>
      <BorrowedBooksList />
      <AvailableBooksList />
    </View>
  );
};

export default BorrowScreen;

const styles = StyleSheet.create({});
