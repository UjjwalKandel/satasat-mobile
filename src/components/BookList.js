import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import SwitchSelector from 'react-native-switch-selector';

import {baseUrl} from '../services/AuthService';
import {useAuth} from '../contexts/Auth';
import BookCard from './BookCard';
import {Loading} from '../components/Loading';
import {Input, Spinner} from '@ui-kitten/components';

const BookList = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(false);

  const [noOfPages, setNoOfPages] = useState();
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [listValue, setListValue] = useState('en');

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    if (!loading && !pageEnd) {
      const url = `${baseUrl}/books?page=${page}&limit=15&search=${search}`;
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
        });
    }
  };

  const renderItem = ({item}) => <BookCard book={item} />;
  const searchBook = () => {
    console.log('searchbookpressed');
  };

  const clearSearch = () => {
    setSearch('');
  };

  const renderSearchIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name='search-outline' />
    </TouchableWithoutFeedback>
  );

  const renderHeader = () => (
    // <SwitchSelector
    //   style={{width: '30%'}}
    //   textColor="blue"
    //   selectedColor="green"
    //   buttonColor="#ddd"
    //   hasPadding
    //   options={[
    //     {label: 'Nepali', value: 'np'},
    //     {label: 'English', value: 'en'},
    //   ]}
    //   initial={1}
    //   onPress={value => setListValue(value)}
    // />
    <Input
    value={search}
    placeholder='Search book name'
    accessoryRight={renderIcon}
    secureTextEntry={secureTextEntry}
    onChangeText={nextValue => setValue(nextValue)}
  />
  );

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
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={getBooks}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
        ItemSeparatorComponent={({highlighted}) => (
          <View style={{height: 10}} />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
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
