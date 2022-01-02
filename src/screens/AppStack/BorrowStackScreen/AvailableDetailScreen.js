import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  DatePickerIOSBase,
} from 'react-native';
import {Text,Button} from '@ui-kitten/components';
import axios from 'axios';

import {baseUrl} from '../../../services/AuthService';
import {Loading} from '../../../components/Loading';
import BookCard from '../../../components/BookCard';

import BookImage from '../../../components/BookDetailScreen/BookImage';
import AddToBookShelf from '../../../components/BookDetailScreen/AddToBookShelf';
import MoreFromAuthor from '../../../components/BookDetailScreen/MoreFromAuthor';
import {useAuth} from '../../../contexts/Auth';
import BorrowAvailability from '../../../components/BookDetailScreen/BorrowAvailability';

const {width, height} = Dimensions.get('window');

const AvailableDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const auth = useAuth();
  const book = route.params.book;
  const data = route.params.data;
  
  const [requestSuccess, setRequestSuccess] = useState();
  const [disableRequest, setDisableRequest] = useState();

//   const [userShelf, setUserShelf] = useState([]);
//   const [disableAddToShelf, setDisableAddToShelf] = useState();
//   const [addToShelfVisible, setAddToShelfVisible] = useState(false);

//   useEffect(() => {
//     userShelf.forEach(item => {
//       if (item.id === book.id) {
//         setDisableAddToShelf(true);
//       }
//     });
//     if (disableAddToShelf === true) {
//       setDisableAddToShelf(false);
//     }
//   }, [userShelf]);

//   useEffect(() => {
//     console.log(auth.userId, 'userId');
//     axios
//       .get(`${baseUrl}/book-shelf?userId=${auth.userId}`, {
//         headers: {
//           Authorization: `Bearer ${auth.authData.token}`,
//         },
//       })
//       .then(response => {
//         if (response.data.message.length > 0) {
//           // console.log(response.data.message, 'book');
//           setUserShelf(response.data.message);
//         } else {
//           setDisableAddToShelf(false);
//         }
//       })
//       .catch(error => {
//         console.log(error, 'error');
//       });
//   }, []);




  const requestBook = () => {
    axios
      .post(
        `${baseUrl}/borrow/request`,
        {
          shelf_id: data.id,
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
        // onPress={onPress}
        // style={{width: '90%'}}>
        //   <Text>Request Book</Text>
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
