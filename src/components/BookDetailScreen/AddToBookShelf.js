import {Button} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@ui-kitten/components';

const AddToBookShelf = ({disableAddToShelf, onPress}) => {
  return (
    <View style={{alignItems: 'center', width: '100%', padding: 20}}>
      <Button
        disabled={disableAddToShelf}
        onPress={onPress}
        style={{width: '90%'}}>
        {disableAddToShelf ? (
          <Text status="success">Book available in shelf</Text>
        ) : (
          <Text>Add to bookshelf</Text>
        )}
      </Button>
    </View>
  );
};

export default AddToBookShelf;

const styles = StyleSheet.create({});
