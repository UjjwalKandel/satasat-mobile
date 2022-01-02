import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import BookImage from '../../../components/BookDetailScreen/BookImage';
import Requests from '../../../components/BookShelfScreen/Requests';
import LentToDetails from '../../../components/BookShelfScreen/LentToDetails';

const DetailScreen = () => {
  const route = useRoute();

  useEffect(() => {
    console.log(route.params.requests, 'requests');
  }, []);

  if (!route.params.bookData) {
    return null;
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <BookImage book={route.params.bookData} />
        <Requests requests={route.params.requests} />
        <LentToDetails lent={route.params.lent} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
