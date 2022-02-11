import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Text} from '@ui-kitten/components';

import axios from '../../services/httpService';
import BorrowedBookCard from './BorrowedBookCard';
import { useFocusEffect, useRoute } from '@react-navigation/native';

const BorrowedBooksList = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      getBorrowedBooksList();
    }, [route.params]),
  );

  useEffect(() => {
    getBorrowedBooksList();
  }, []);

  const getBorrowedBooksList = () => {
    axios
      .get(`/borrow/borrowed`)
      .then(response => {
        if (response.data.message.length > 0) {
          setBorrowedBooks(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const renderItem = ({item}) => (
    <BorrowedBookCard book={item.BookShelf.Book} data={item} />
  );

  const renderHeader = () =>
    borrowedBooks.length > 0 && (
      <View style={{paddingLeft: '5%'}}>
        <Text style={{fontWeight: 'bold'}}>Borrowed Books</Text>
      </View>
    );
  return (
    <View style={{paddingVertical: '5%'}}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={({highlighted}) => (
          <View style={{height: 10}} />
        )}
        ListEmptyComponent={() => (
          <View>
            <Text>You haven't borrowed any books yet.</Text>
          </View>
        )}
        // contentContainerStyle={{
        //   flexGrow: 1,
        //   alignItems: 'center',
        //   justifyContent: 'center',
        // }}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />
    </View>
  );
};

export default BorrowedBooksList;

const styles = StyleSheet.create({});
