import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import {Text} from '@ui-kitten/components';
import {useNavigation, useRoute} from '@react-navigation/native';

const AvailableBookCard = ({book, getAvailableBooks}) => {
  const [status, setStatus] = useState();

  const navigation = useNavigation();

  const navigateToDetail = () => {
    navigation.navigate('AvailableDetailScreen', {
      book: book
    });
  };

  useEffect(()=>{
    if(book?.requested == true)
      setStatus('Requested')
  }, [])

  if (!book) {
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
              <Text category="s1"><Text category="label">Owner:</Text> {book.BookShelves[0].User.full_name}</Text>
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
            status='success'
            category="p1">
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AvailableBookCard;

const styles = StyleSheet.create({});
