import { useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {Text,Button} from '@ui-kitten/components';
import axios from 'axios';

import {baseUrl} from '../../../services/AuthService';
import {Loading} from '../../../components/Loading';

import BookImage from '../../../components/BookDetailScreen/BookImage';
import {useAuth} from '../../../contexts/Auth';

const AvailableDetailScreen = () => {
  const route = useRoute();
  const auth = useAuth();
  const book = route.params.book;
  
  const [requestSuccess, setRequestSuccess] = useState();
  const [disableRequest, setDisableRequest] = useState(false);

  useEffect(() => {
    if(book.requested== true)
      setDisableRequest(true)
  }, [])

  const requestBook = () => {
    axios
      .post(
        `${baseUrl}/borrow/request`,
        {
          shelf_id: book.BookShelves[0].id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.authData.token}`,
          },
        },
      )
      .then(response => {
        if (response.data.success === true) {
          setRequestSuccess(true);
          setDisableRequest(true)
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  
  if (!book) {
    return <Loading />;
  }

  const BookRequest = ({disableRequest, onPress}) => {
  return (
    <View style={{alignItems: 'center', width: '100%', padding: 20}}>
      <Button
        disabled={disableRequest}
        onPress={onPress}
        style={{width: '90%'}}>
        {disableRequest ? (
          <Text status="success">Book Requested</Text>
        ) : (
          <Text>Request Book</Text>
        )}
      </Button>
    </View>
  );
};

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <BookImage book={book} />
        {/* <MoreFromAuthor author={book.authors} /> */}
        <BookRequest
          disableRequest={disableRequest}
          onPress={requestBook}
        />

        {/* <BorrowAvailability book={book} /> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AvailableDetailScreen;

const styles = StyleSheet.create({});
