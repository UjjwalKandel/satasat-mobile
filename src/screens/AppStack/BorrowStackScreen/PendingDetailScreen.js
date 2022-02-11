import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import axios from 'axios';

import {Loading} from '../../../components/Loading';

import BookImage from '../../../components/BookDetailScreen/BookImage';
import LentToDetails from '../../../components/BookShelfScreen/LentToDetails';
import ConfirmRequests from '../../../components/BorrowStackScreen/ConfirmRequest';
import {useAuth} from '../../../contexts/Auth';


const PendingDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const auth = useAuth();
  const book = route.params.book;
  const data = route.params.data;


  useEffect(() => {
    console.log('eta pugyooo', data)
    console.log(auth.userId, 'userId');
  }, []);

  if (!book) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <BookImage book={book} />
        {/* <MoreFromAuthor author={book.authors} /> */}

        {/* <BorrowAvailability book={book} /> */}
        <ConfirmRequests requests={[data]} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PendingDetailScreen;

const styles = StyleSheet.create({});
