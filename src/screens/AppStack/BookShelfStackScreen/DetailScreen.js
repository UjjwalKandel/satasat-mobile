import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
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
import { Spinner } from '@ui-kitten/components';

const DetailScreen = () => {
  const route = useRoute();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    console.log(route.params.requests, 'requests');
    getRecommendations();
  }, []);

  const getRecommendations = () => {
    if(!loading){
      setLoading(true);
      axios
        .get(`${baseUrl}/book-shelf/recommendations`, {
          headers: {
            Authorization: `Bearer ${auth.authData.token}`
          }
        })
        .then(response => {
          if(response.data.message.length > 0) {
            console.log('recommendationsssssssss', response.data.message)
            setRecommendations(response.data.message);
          }
        })
        .catch(error=>{
          console.log(error)
        })
        .finally(()=>{
          setTimeout(()=>{
            setLoading(false)
          }, 1000);
        })
    }
  }

  if (!route.params.bookData) {
    return null;
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <BookImage book={route.params.bookData} />
        <Requests requests={route.params.requests} />
        <LentToDetails lent={route.params.lent} />
      </KeyboardAvoidingView>
      <BookRecommendation loading={loading} recommendations={recommendations}/>
    </SafeAreaView>
  );
};

const BookRecommendation = ({loading, recommendations}) =>{
  const renderItem = ({item}) => {
    return (
      <BookRecommendationCard
        book={item}
      />
    );
  };

  const BookRecommendationCard = ({book}) =>{
    return (
      <TouchableOpacity>
        <View 
          style={{
            height: 150,
            marginHorizontal: 20,
            borderRadius: 15
        }}>
          <View 
            style={{
              alignItems: 'center'
            }}
          >
            <Image source={{uri: book.image_url}} style={{width: 90, height: '100%', resizeMode: 'contain'}}></Image>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  if(loading){
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner size="giant" />
      </View>
    );
  }
  return (
    <View style={{width: '100%', paddingVertical: '5%', backgroundColor: '#fff'}}>
      <View style={{paddingLeft: '5%', paddingBottom: '3%'}}><Text style={{fontWeight: 'bold'}}>Book Recommendations</Text></View>
      <FlatList
        horizontal={true}
        data={recommendations}
        renderItem={renderItem}
        ItemSeparatorComponent={({highlighted}) => (
          <View style={{height: 10, width: 10}} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default DetailScreen;

const styles = StyleSheet.create({});
