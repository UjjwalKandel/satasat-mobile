import {useAsyncStorage} from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {StyleSheet,FlatList, Text, View} from 'react-native';
import {useAuth} from '../../contexts/Auth';
import {baseUrl} from '../../services/AuthService';
import AvailableBookCard from './AvailableBookCard';
const AvailableBooksList = () => {
  const auth = useAuth();
  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {
    getAvailableBooks();
  }, []);

  const getAvailableBooks = () => {
    axios
      .get(`${baseUrl}/borrow/available-books`, {
        headers: {
          Authorization: `Bearer ${auth.authData.token}`,
        },
      })
      .then(response => {
        if (response.data.message.length > 0) {
          setAvailableBooks(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const renderItem = ({item}) => <AvailableBookCard book={item.Book} data={item}/>;

  const renderHeader = () => <View><Text style={{fontWeight: 'bold'}}>Available Books</Text></View>
  return (
    <View style={{paddingVertical: '5%'}}>
      {availableBooks.length != 0 ? (
            <FlatList
              data={availableBooks}
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

export default AvailableBooksList;

const styles = StyleSheet.create({});
