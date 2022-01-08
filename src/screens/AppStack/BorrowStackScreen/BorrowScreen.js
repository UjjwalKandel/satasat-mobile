import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AvailableBooksList from '../../../components/BorrowStackScreen/AvailableBooksList';

import BorrowedBooksList from '../../../components/BorrowStackScreen/BorrowedBooksList';

const BorrowScreen = () => {
  const [activeTab, setActiveTab] = useState("Available")
  return (
    <View style={{width: '100%', flex: 1, paddingTop: '5%'}}>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <HeaderButton text="Available" btnColor='black' textColor='white' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <HeaderButton text="Borrowed" btnColor='white' textColor='black' activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>
      <View style={{width: '100%', flex: 1}}>
        <BooksList activeTab={activeTab}  />
      </View>
    </View>
  );
};

const HeaderButton = (props) => (
  <TouchableOpacity 
    style= {{
      backgroundColor: props.activeTab == props.text ? "black": "white",
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 30
    }}
    onPress={() => props.setActiveTab(props.text)}
  >
    <Text style={{ color: props.activeTab == props.text ? "white" : "black", fontSize: 15, fontWeight: "900"}}>{props.text}</Text>
  </TouchableOpacity>
)


const BooksList = (props) =>{
  if(props.activeTab=='Available')
    return <AvailableBooksList />
  else 
    return <BorrowedBooksList />
}
export default BorrowScreen;

const styles = StyleSheet.create({});
