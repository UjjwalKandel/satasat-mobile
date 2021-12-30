import React, {useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';

import {Input, Icon, Button, Text} from '@ui-kitten/components';

const SearchBar = ({onSearch}) => {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };

  const clearSearch = () => {
    setSearch('');
  };

  const renderClearIcon = props => (
    <TouchableWithoutFeedback
      onPress={() => {
        clearSearch();
      }}>
      <Icon {...props} name="close-outline" />
    </TouchableWithoutFeedback>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 10,
        alignSelf: 'center',
      }}>
      <View>
        <Button
          size="small"
          style={{borderRadius: 20}}
          onPress={() => {
            onSearch(search);
          }}>
          {() => (
            <Icon
              fill="#ccc"
              style={{width: 20, height: 20}}
              name="search-outline"
            />
          )}
        </Button>
      </View>
      <View style={{flex: 1, marginLeft: 5}}>
        <Input
          value={search}
          style={{borderRadius: 20}}
          placeholder="Search book name"
          accessoryRight={renderClearIcon}
          onChangeText={value => updateSearch(value)}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
