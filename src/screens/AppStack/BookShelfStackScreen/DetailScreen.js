import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

import BookImage from '../../../components/BookDetailScreen/BookImage';
import Requests from '../../../components/BookShelfScreen/Requests';
import ReturnRequests from '../../../components/BookShelfScreen/ReturnRequests';
import LentToDetails from '../../../components/BookShelfScreen/LentToDetails';
import {Spinner, Text} from '@ui-kitten/components';
import RecommendationsList from '../../../components/RecommendationsList/RecommendationsList';
import ConfirmLend from '../../../components/BookShelfScreen/ConfirmLend';

const DetailScreen = () => {
  const route = useRoute();
  const [bookAccepted, setBookAccepted] = useState(false);
  const [returnReq, setReturnReq] = useState(false);

  useEffect(() => {
    const checkBookAccepted = async () => {
      const acceptedArray = await route.params.accepted;
      const returnArray = await route.params.returnRequests;
      if (acceptedArray.length > 0) {
        setBookAccepted(true);
      } else if (route.params.lendFlag) {
        setBookAccepted(true);
      }
      if(returnArray.length > 0){
        setReturnReq(true)
      }
    };
    checkBookAccepted();
  }, [route.params]);

  if (!route.params.bookData) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{paddingTop: '1.25%', flex: 1}}>
        <ScrollView>
          <BookImage book={route.params.bookData} />
          {!bookAccepted ? (
            <Requests requests={route.params.requests} />
          ) : (
            <ConfirmLend accepted={route.params.accepted} />
          )}
          <LentToDetails lent={route.params.lent} />
          {returnReq ? (
            <ReturnRequests returnRequests = {route.params.returnRequests}/>
          ):null}
          {/* <RecommendationsList book={route.params.bookData} /> */}
        </ScrollView>
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
