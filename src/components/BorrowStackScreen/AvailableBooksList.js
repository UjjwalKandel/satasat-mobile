import {useAsyncStorage} from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAuth} from '../../contexts/Auth';
import {baseUrl} from '../../services/AuthService';

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
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {availableBooks.length != 0 ? (
        availableBooks.map((item, index) => (
          <View key={index.toString()}>
            <Text>{item.Book.title}</Text>
          </View>
        ))
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
