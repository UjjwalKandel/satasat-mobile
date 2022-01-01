import {Spinner} from '@ui-kitten/components';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import BookCard from '../../components/BookCard';
import {useAuth} from '../../contexts/Auth';
import {baseUrl} from '../../services/AuthService';

const BookShelfScreen = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(false);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    if (!loading) {
      setLoading(true);
      axios
        .get(`${baseUrl}/book-shelf`, {
          headers: {
            Authorization: `Bearer ${auth.authData.token}`,
          },
        })
        .then(response => {
          if (response.data.message.length > 0) {
            // console.log(response.data.message);
            setBooks(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log(books, 'books');
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    }
  };

  const renderItem = ({item}) => <BookCard book={item} />;

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner size="giant" />
      </View>
    );
  }
  return (
    <View style={{width: '100%'}}>
      <FlatList
        data={books}
        renderItem={renderItem}
        ItemSeparatorComponent={({highlighted}) => (
          <View style={{height: 10}} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default BookShelfScreen;

const styles = StyleSheet.create({});
