import {Spinner} from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import axios from '../../../services/httpService';

import BookShelfCard from './BookShelfCard';
import {useAuth} from '../../../contexts/Auth';
import {baseUrl} from '../../../services/AuthService';

const BookShelfScreen = () => {
  const route = useRoute();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [page, setPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getBooks();
    }, [route.params]),
  );

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
            setBooks(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    }
  };

  const renderItem = ({item}) => {
    return (
      <BookShelfCard
        book={item.Book}
        lendFlag={item.lend_flag}
        available={item.available}
        requests={item.Requests}
        lent={item.Lent}
        accepted={item.Accepted}
        returnRequests={item.ReturnRequests}
      />
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner size="giant" />
      </View>
    );
  }
  return (
    <View style={{width: '100%', paddingVertical: '5%'}}>
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
