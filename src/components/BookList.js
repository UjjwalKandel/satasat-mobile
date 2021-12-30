import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import {Input, Spinner, Icon} from '@ui-kitten/components';
import SwitchSelector from 'react-native-switch-selector';

import {baseUrl} from '../services/AuthService';
import {useAuth} from '../contexts/Auth';
import BookCard from './BookCard';
import {Loading} from '../components/Loading';
import SearchBar from './SearchBar';

const BookList = ({searchItem}) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [listValue, setListValue] = useState('en');
  const [reset, setReset] = useState(false);

  const [search, setSearch] = useState(null);

  useEffect(() => {
    getBooks();
  }, [search]);

  const resetSearch = () => {
    setBooks([]);
    setPageEnd(false);
    setPage(1);
    axios
      .get(`${baseUrl}/books?page=${page}&limit=15`, {
        headers: {
          Authorization: `Bearer ${auth.authData.token}`,
        },
      })
      .then(response => {
        if (response.data.message.rows.length > 0) {
          setLoadingMore(false);
          setPage(page => page + 1);
          setBooks(response.data.message.rows);
          setLoading(false);
        } else {
          setTimeout(() => {
            setPageEnd(true);
          }, 1000);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingMore(false);
        }, 2000);
        setLoading(false);
      });
  };

  useEffect(() => {
    resetSearch();
  }, [reset]);

  const getBooks = () => {
    if (!loading && !pageEnd) {
      const url = search
        ? `${baseUrl}/books?page=${page}&limit=15&search=${search}`
        : `${baseUrl}/books?page=${page}&limit=15`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${auth.authData.token}`,
          },
        })
        .then(response => {
          if (response.data.message.rows.length > 0) {
            setLoadingMore(false);
            setPage(page => page + 1);
            setBooks(prevBooks => [
              ...prevBooks,
              ...response.data.message.rows,
            ]);
            setLoading(false);
          } else {
            setTimeout(() => {
              setPageEnd(true);
            }, 2000);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error.message);
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingMore(false);
          }, 2000);
          setLoading(false);
          setRefreshing(false);
        });
    }
  };

  const handleSearch = async search => {
    console.log(search);
    if (search !== '') {
      setPage(1);
      setBooks([]);
      setPageEnd(false);
      setSearch(search);
    } else {
      setPage(1);
      setBooks([]);
      setPageEnd(false);
      setReset(!reset);
    }
  };

  const onRefresh = () => {
    setPage(1);
    setBooks([]);
    setRefreshing(true);
    setSearch('');
    setPageEnd(false);
  };

  const renderItem = ({item}) => <BookCard book={item} />;

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        {loadingMore && <Loading />}
        {pageEnd && <Text>No more books available</Text>}
      </View>
    );
  };

  if (loading) {
    return <Spinner size="giant" />;
  }

  return (
    <View style={{width: '100%'}}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={getBooks}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
        ItemSeparatorComponent={({highlighted}) => (
          <View style={{height: 10}} />
        )}
        ListFooterComponent={renderFooter}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />
    </View>
  );
};

export default BookList;

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
});
