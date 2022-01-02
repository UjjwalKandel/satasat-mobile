import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import {Text} from '@ui-kitten/components';
import {useNavigation, useRoute} from '@react-navigation/native';

const BookShelfCard = ({book, lendFlag, requests, lent}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [status, setStatus] = useState();
  const [bookRequests, setBookRequests] = useState([]);
  const [lentDetails, setLentDetails] = useState([]);

  useEffect(() => {
    setBookRequests(requests);
    setLentDetails(lent);
  }, []);

  useEffect(() => {
    if (lendFlag) {
      setStatus('Lent');
    } else {
      if (bookRequests.length > 0) {
        setStatus('Requested');
      } else {
        setStatus('Available');
      }
    }
  }, [bookRequests]);

  const navigateToDetail = () => {
    navigation.navigate('DetailScreen', {
      bookData: book,
      requests: bookRequests,
      lendFlag: lendFlag,
      lent: lentDetails,
    });
  };
  if (!book) {
    return null;
  }
  if (!bookRequests) {
    return null;
  }
  return (
    <TouchableOpacity onPress={navigateToDetail}>
      <View
        style={{
          height: 150,
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#fff',
          marginHorizontal: 20,
          borderRadius: 15,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            flex: 5,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginLeft: 20,
            }}>
            <Image
              source={{
                uri: book.image_url,
              }}
              style={{
                width: 60,
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 2,
              }}
            />
          </View>
          <View
            style={{
              flex: 3,
              alignSelf: 'baseline',
              height: '100%',
            }}>
            <View style={{flex: 1, marginVertical: 20}}>
              <Text category="p1">{book.title}</Text>
              <Text category="label">{book.authors}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 5,
            alignSelf: 'baseline',
            marginHorizontal: 20,
            paddingLeft: 4,
          }}>
          <Text
            status={
              status === 'Available'
                ? 'success'
                : status === 'Lent'
                ? 'warning'
                : 'danger'
            }
            category="p1">
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookShelfCard;

const styles = StyleSheet.create({});
