import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {Text} from '@ui-kitten/components';

const BookImage = ({book}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          width: '40%',
          height: 250,
          paddingLeft: 10,
        }}>
        <Image
          source={{uri: book.image_url}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{flex: 1, height: '100%'}}>
        <View style={{margin: 20}}>
          <Text category="h6">{book.title}</Text>
          <View style={{marginVertical: 10}}>
            <Text category="c1">{book.authors}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookImage;

const styles = StyleSheet.create({});
