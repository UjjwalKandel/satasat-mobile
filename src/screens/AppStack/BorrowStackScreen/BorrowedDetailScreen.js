import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import axios from 'axios';

import {baseUrl} from '../../../services/AuthService';
import {Loading} from '../../../components/Loading';

import BookImage from '../../../components/BookDetailScreen/BookImage';
import {useAuth} from '../../../contexts/Auth';

const BorrowedDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const auth = useAuth();
  const book = route.params.book;
  const data = route.params.data;

  const [requestSuccess, setRequestSuccess] = useState();
  const [disableRequest, setDisableRequest] = useState();

  useEffect(() => {
    if(data.pending_return_confirmation == true)
      setDisableRequest(true)
  }, []);

  const claimReturn = () =>{
    console.log(data)
    axios
      .patch(
        `${baseUrl}/borrow/return-confirm/${data.id}`,{},
        {
          headers: {
            Authorization: `Bearer ${auth.authData.token}`,
          },
        }
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
  }
  if (!book) {
    return <Loading />;
  }

  const ReturnRequest = ({disableRequest, onPress}) => {
    return (
      <View style={{alignItems: 'center', width: '100%', padding: 20}}>
        <Button
          disabled={disableRequest}
          onPress={onPress}
          style={{width: '90%'}}>
          {disableRequest ? (
            <Text status="success">Book Return Claimed</Text>
          ) : (
            <Text>Claim Book Return</Text>
          )}
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <BookImage book={book} />
        {/* <MoreFromAuthor author={book.authors} /> */}

        {/* <BorrowAvailability book={book} /> */}
        <ReturnRequest
          disableRequest={disableRequest}
          onPress={claimReturn}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BorrowedDetailScreen;

const styles = StyleSheet.create({});
