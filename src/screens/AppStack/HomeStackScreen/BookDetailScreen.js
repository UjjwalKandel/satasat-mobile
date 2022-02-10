import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {Text} from '@ui-kitten/components';

import {baseUrl} from '../../../services/AuthService';
import {Loading} from '../../../components/Loading';

import axios from '../../../services/httpService';
import useAxios from '../../../hooks/useAxios';
import BookImage from '../../../components/BookDetailScreen/BookImage';
import AddToBookShelf from '../../../components/BookDetailScreen/AddToBookShelf';
import RecommendationsList from '../../../components/RecommendationsList/RecommendationsList';
import {useAuth} from '../../../contexts/Auth';

const {width, height} = Dimensions.get('window');

const BookDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const auth = useAuth();
  const book = route.params.book;

  const {response, error, loading} = useAxios({
    method: 'GET',
    url: '/book-shelf',
  });

  const [disableAddToShelf, setDisableAddToShelf] = useState();

  useEffect(() => {
    if (response) {
      if (response.message.some(item => item.Book.id === book.id)) {
        setDisableAddToShelf(true);
      } else {
        setDisableAddToShelf(false);
      }
    }
  }, [response]);

  const addToShelf = () => {
    axios
      .post('/book-shelf', {
        user_id: auth.userId,
        book_id: book.id,
      })
      .then(response => {
        if (response.data.success === true) {
          setDisableAddToShelf(true);
        }
      });
  };

  if (!book) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <BookImage book={book} />
        <AddToBookShelf
          disableAddToShelf={disableAddToShelf}
          onPress={addToShelf}
        />
        <RecommendationsList book={book} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({});
