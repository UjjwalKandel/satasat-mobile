import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {StyleSheet,FlatList, Text, View} from 'react-native';
import {useAuth} from '../../contexts/Auth';
import {baseUrl} from '../../services/AuthService';
import BorrowedBookCard from './BorrowedBookCard';

const BorrowedBooksList = () => {
  const auth = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    getBorrowedBooksList();
  }, []);

  const getBorrowedBooksList = () => {
    axios
      .get(`${baseUrl}/borrow/borrowed`, {
        headers: {
          Authorization: `Bearer ${auth.authData.token}`,
        },
      })
      .then(response => {
        if (response.data.message.length > 0) {
          setBorrowedBooks(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const renderItem = ({item}) => <BorrowedBookCard book={item.BookShelf.Book} data={item}/>;

  const renderHeader = () => <View style={{paddingLeft: '5%'}}><Text style={{fontWeight: 'bold'}}>Borrowed Books</Text></View>
  return (
    <View style={{paddingVertical: '5%'}}>
      {borrowedBooks.length != 0 ? (
            <FlatList
              data={borrowedBooks}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              ListHeaderComponent={renderHeader}
              ItemSeparatorComponent={({highlighted}) => (
                <View style={{height: 10}} />
              )}
              // refreshControl={
              //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              // }
            />
        
      ) : (
        <View>
          <Text>No books available</Text>
        </View>
      )}
    </View>
  );
};

export default BorrowedBooksList;

const styles = StyleSheet.create({});
