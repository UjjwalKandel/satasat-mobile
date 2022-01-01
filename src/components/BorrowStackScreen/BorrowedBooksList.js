import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAuth} from '../../contexts/Auth';
import {baseUrl} from '../../services/AuthService';

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
        console.log(response.data);
        if (response.data.message.length > 0) {
          setBorrowedBooks(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ccc',
      }}>
      {borrowedBooks.length != 0 ? (
        borrowedBooks.map((item, index) => (
          <View key={index.toString()}>
            <Text>{item.Books.title}</Text>
          </View>
        ))
      ) : (
        <View style={{paddingVertical: '5%'}}>
          <Text>No books Borrowed</Text>
        </View>
      )}
    </View>
  );
};

export default BorrowedBooksList;

const styles = StyleSheet.create({});
