import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';

import {baseUrl} from '../../services/AuthService';
import {useAuth} from '../../contexts/Auth';
import BookCard from '../BookCard';

const MoreFromAuthor = ({author}) => {
  const auth = useAuth();
  const [moreBooks, setMoreBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/books/author/${author}`, {
        headers: {
          Authorization: `Bearer ${auth.authData.token}`,
        },
      })
      .then(response => {
        console.log(response.data.message);
        setMoreBooks(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  if (!author) {
    return null;
  }

  const renderItem = ({item}) => <BookCard book={item} />;
  return (
    <FlatList
      data={moreBooks}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={({highlighted}) => <View style={{height: 10}} />}
      // horizontal
    />
  );
};

export default MoreFromAuthor;

const styles = StyleSheet.create({});
