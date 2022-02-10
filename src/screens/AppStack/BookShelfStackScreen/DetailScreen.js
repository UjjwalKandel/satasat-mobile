import React, {useState} from 'react';
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
import RecommendationsList from '../../../components/RecommendationsList/RecommendationsList';

const DetailScreen = () => {
  const route = useRoute();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  if (!route.params.bookData) {
    return null;
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={{paddingTop: '1.25%'}}>
        <BookImage book={route.params.bookData} />
        {!route.params.lengFlag && (
          <Requests requests={route.params.requests} />
        )}
        <LentToDetails lent={route.params.lent} />
        <RecommendationsList book={route.params.bookData} />
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
          // height: '50%',
          aspectRatio: 0.75,
        }}>
        <TouchableOpacity style={{alignItems: 'center'}}>
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
