import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Text} from '@ui-kitten/components';

import axios from '../../services/httpService';
import PendingBookCard from './PendingBookCard';
import { useFocusEffect, useRoute } from '@react-navigation/native';

const PendingBooksList = () => {
  const [pendingBooks, setPendingBooks] = useState([]);

  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      getPendingBooksList();
    }, [route.params]),
  );
  useEffect(() => {
    getPendingBooksList();
  }, []);

  const getPendingBooksList = () => {
    axios
      .get(`/borrow/lend-confirm-requests`)
      .then(response => {
        if (response.data.message.length > 0) {
          setPendingBooks(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const renderItem = ({item}) => (
    <PendingBookCard book={item.BookShelf.Book} data={item} />
  );

  const renderHeader = () =>
    pendingBooks.length > 0 && (
      <View style={{paddingLeft: '5%'}}>
        <Text style={{fontWeight: 'bold'}}>Pending Books</Text>
      </View>
    );
  return (
    <View style={{paddingVertical: '5%'}}>
      <FlatList
        data={pendingBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={({highlighted}) => (
          <View style={{height: 10}} />
        )}
        ListEmptyComponent={() => (
          <View>
            <Text>You don't have any pending requests to confirm yet.</Text>
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

export default PendingBooksList;

const styles = StyleSheet.create({});
