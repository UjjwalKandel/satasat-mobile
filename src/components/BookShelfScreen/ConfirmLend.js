import {StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Button, Text} from '@ui-kitten/components';

import axios from '../../services/httpService';

const ConfirmLend = ({accepted}) => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (accepted.length > 0) {
      setUser(accepted[0].User);
    }
  }, [accepted]);

  const sendConfirmRequest = async () => {
    try {
      const {data} = await axios.patch(
        `lend/request-lend-confirmation/${accepted[0].id}`,
      );
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
    }
  };

  if (!user) {
    return null;
  }
  return (
    <View
      style={{
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: '2.5%',
      }}>
      <Text category="h6">Confirm Request</Text>
      <View style={{paddingVertical: 5}} />
      <Text>You've accepted a book request for this book from: </Text>
      <View
        style={{
          width: '100%',
          borderRadius: 20,
          paddingVertical: 10,
        }}>
        {Object.keys(user)
          .filter(key =>
            ['full_name', 'phone', 'email', 'user_name', 'address'].includes(
              key,
            ),
          )
          .filter(key => user[key])
          .map((key, i) => (
            <View style={{flexDirection: 'row'}} key={key}>
              <View style={{flex: 1}}>
                <Text appearance="hint" style={{fontSize: 15}}>
                  {key}
                </Text>
              </View>
              <View style={{flex: 4}}>
                <Text category="s1" style={{fontSize: 15}}>
                  : {user[key]}
                </Text>
              </View>
            </View>
          ))}
      </View>
      <View>
        <Text style={{textAlign: 'center'}}>
          Please send this confirm request when lending the book. Borrower must
          then accept this request to record the transaction.
        </Text>
        <View style={{paddingVertical: 10}} />
        <Button onPress={sendConfirmRequest}>
          <Text>Send Request</Text>
        </Button>
      </View>
    </View>
  );
};

export default ConfirmLend;

const styles = StyleSheet.create({});
