import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

import BookImage from '../../../components/BookDetailScreen/BookImage';
import Requests from '../../../components/BookShelfScreen/Requests';
import LentToDetails from '../../../components/BookShelfScreen/LentToDetails';
import {useAuth} from '../../../contexts/Auth';
import {baseUrl} from '../../../services/AuthService';
import {Spinner, Text} from '@ui-kitten/components';

const DetailScreen = () => {
  const route = useRoute();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([
    {
      id: 2,
      isbn: '439554934',
      isbn13: '9780439554930.0',
      authors: 'J.K. Rowling, Mary GrandPré',
      original_title: "Harry Potter and the Philosopher's Stone",
      title: "Harry Potter and the Sorcerer's Stone (Harry Potter, #1)",
      year_of_publication: '1997.0',
      image_url: 'https://images.gr-assets.com/books/1474154022m/3.jpg',
      createdAt: '2021-12-18T15:51:16.152Z',
      updatedAt: '2021-12-18T15:51:16.152Z',
    },
    {
      id: 5,
      isbn: '743273567',
      isbn13: '9780743273560.0',
      authors: 'F. Scott Fitzgerald',
      original_title: 'The Great Gatsby',
      title: 'The Great Gatsby',
      year_of_publication: '1925.0',
      image_url: 'https://images.gr-assets.com/books/1490528560m/4671.jpg',
      createdAt: '2021-12-18T15:51:16.152Z',
      updatedAt: '2021-12-18T15:51:16.152Z',
    },
    {
      id: 8,
      isbn: '316769177',
      isbn13: '9780316769170.0',
      authors: 'J.D. Salinger',
      original_title: 'The Catcher in the Rye',
      title: 'The Catcher in the Rye',
      year_of_publication: '1951.0',
      image_url: 'https://images.gr-assets.com/books/1398034300m/5107.jpg',
      createdAt: '2021-12-18T15:51:16.152Z',
      updatedAt: '2021-12-18T15:51:16.152Z',
    },
    {
      id: 10,
      isbn: '679783261',
      isbn13: '9780679783270.0',
      authors: 'Jane Austen',
      original_title: 'Pride and Prejudice',
      title: 'Pride and Prejudice',
      year_of_publication: '1813.0',
      image_url: 'https://images.gr-assets.com/books/1320399351m/1885.jpg',
      createdAt: '2021-12-18T15:51:16.152Z',
      updatedAt: '2021-12-18T15:51:16.152Z',
    },
    {
      id: 14,
      isbn: '452284244',
      isbn13: '9780452284240.0',
      authors: 'George Orwell',
      original_title: 'Animal Farm: A Fairy Story',
      title: 'Animal Farm',
      year_of_publication: '1945.0',
      image_url: 'https://images.gr-assets.com/books/1424037542m/7613.jpg',
      createdAt: '2021-12-18T15:51:16.152Z',
      updatedAt: '2021-12-18T15:51:16.152Z',
    },
    {
      id: 103,
      isbn: '',
      isbn13: '',
      authors: 'Tina Fey',
      original_title: 'Bossypants',
      title: 'Bossypants',
      year_of_publication: '2011.0',
      image_url: 'https://images.gr-assets.com/books/1481509554m/9418327.jpg',
      createdAt: '2021-12-18T15:51:16.152Z',
      updatedAt: '2021-12-18T15:51:16.152Z',
    },
  ]);

  // useEffect(() => {
  //   console.log(route.params.requests, 'requests');
  //   getRecommendations();
  // }, []);

  const getRecommendations = () => {
    if (!loading) {
      setLoading(true);
      axios
        .get(`${baseUrl}/book-shelf/recommendations`, {
          headers: {
            Authorization: `Bearer ${auth.authData.token}`,
          },
        })
        .then(response => {
          if (response.data.message.length > 0) {
            console.log('recommendationsssssssss', response.data.message);
            setRecommendations(response.data.message);
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

  if (!route.params.bookData) {
    return null;
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <BookImage book={route.params.bookData} />
        <Requests requests={route.params.requests} />
        <LentToDetails lent={route.params.lent} />
        <BookRecommendation
          loading={loading}
          recommendations={recommendations}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const BookRecommendation = ({loading, recommendations}) => {
  const renderItem = ({item}) => {
    return <BookRecommendationCard book={item} />;
  };

  const BookRecommendationCard = ({book}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          height: '50%',
          aspectRatio: 0.75,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center', backgroundColor: '#0f0'}}>
          <Image
            source={{uri: book.image_url}}
            style={{
              width: 100,
              height: '100%',
              resizeMode: 'contain',
            }}
          />
          <Text category="s1" numberOfLines={2}>
            {book.title}
          </Text>
        </TouchableOpacity>
      </View>
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
    <View style={{width: '100%', padding: '5%', backgroundColor: '#fff'}}>
      <View>
        <Text style={{fontWeight: 'bold'}}>Book Recommendations</Text>
      </View>
      <FlatList
        horizontal={true}
        data={recommendations}
        renderItem={renderItem}
        ItemSeparatorComponent={({highlighted}) => <View style={{width: 10}} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
