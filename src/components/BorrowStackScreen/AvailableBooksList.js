import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Text} from '@ui-kitten/components';

import axios from '../../services/httpService';
import AvailableBookCard from './AvailableBookCard';
const AvailableBooksList = () => {
  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {
    getAvailableBooks();
  }, []);

  const getAvailableBooks = () => {
    axios
      .get(`/borrow/available-books`)
      .then(response => {
        if (response.data.message.length > 0) {
          setAvailableBooks(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const renderItem = ({item}) => <AvailableBookCard book={item} />;

  const renderHeader = () =>
    availableBooks.length > 0 && (
      <View style={{paddingLeft: '5%'}}>
        <Text style={{fontWeight: 'bold'}}>Available Books</Text>
      </View>
    );
  return (
    <View style={{paddingVertical: '5%'}}>
      <FlatList
        data={availableBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={({highlighted}) => (
          <View style={{height: 10}} />
        )}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={() => (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text>No books available to borrow</Text>
          </View>
        )}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />
    </View>
  );
};

export default AvailableBooksList;

const styles = StyleSheet.create({});
