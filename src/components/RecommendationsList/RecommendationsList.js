import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {Spinner, Text} from '@ui-kitten/components';

import {useRoute, useNavigation} from '@react-navigation/native';

import {baseUrl} from '../../services/AuthService';
import axios from 'axios';
import {useAuth} from '../../contexts/Auth';

const RecommendationsList = ({book}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const auth = useAuth();

  const controller = new AbortController();

  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const {data} = await axios.get(
          `${baseUrl}/book-recommendations/${book.isbn}`,
          {
            headers: {
              Authorization: `Bearer ${auth.authData.token}`,
            },
            signal: controller.signal,
          },
        );
        setRecommendations(data.message);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();

    return () => {
      controller.abort();
      setLoading(false);
      setRecommendations([]);
    };
  }, []);

  const renderItem = ({item}) => {
    return <BookRecommendationCard book={item} />;
  };

  const BookRecommendationCard = ({book}) => {
    return (
      <TouchableOpacity
        style={{
          maxWidth: 180,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
        onPress={() => {
          navigation.push('BookDetailScreen', {
            book: book,
          });
        }}>
        <Image
          source={{uri: book.image_url}}
          style={{
            width: 120,
            height: 200,
            resizeMode: 'contain',
          }}
        />
        <View style={{alignSelf: 'flex-start'}}>
          <Text category="s1" numberOfLines={2}>
            {book.title}
          </Text>
        </View>
        <View style={{alignSelf: 'flex-start'}}>
          <Text category="c1" numberOfLines={2}>
            Authors: {book.authors}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#fff',
        padding: '5%',
        marginTop: '1.25%',
      }}>
      <View>
        <Text style={{fontWeight: 'bold'}}>Book Recommendations</Text>
      </View>
      {loading ? (
        <View
          style={{
            padding: '5%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Generating...</Text>
          <Spinner />
        </View>
      ) : null}
      <FlatList
        horizontal={true}
        data={recommendations}
        renderItem={renderItem}
        ItemSeparatorComponent={({highlighted}) => <View style={{width: 5}} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() =>
          !loading && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Text>No recommendations available at the moment</Text>
            </View>
          )
        }
      />
    </View>
  );
};

export default RecommendationsList;

const styles = StyleSheet.create({});
