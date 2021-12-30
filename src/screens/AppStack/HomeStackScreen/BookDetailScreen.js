import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {Loading} from '../../../components/Loading';
import BookCard from '../../../components/BookCard';

import {Text} from '@ui-kitten/components';
import BookImage from '../../../components/BookDetailScreen/BookImage';
import AddToBookShelf from '../../../components/BookDetailScreen/AddToBookShelf';
import MoreFromAuthor from '../../../components/BookDetailScreen/MoreFromAuthor';

const {width, height} = Dimensions.get('window');

const BookDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const book = route.params.book;

  if (!book) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <BookImage book={book} />
        {/* <MoreFromAuthor author={book.authors} /> */}
        <AddToBookShelf />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({});
