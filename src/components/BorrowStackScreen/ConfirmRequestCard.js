import React, {useState, useEffect} from 'react';
import {View, ToastAndroid, TouchableOpacity} from 'react-native';

import {Text} from '@ui-kitten/components';

import axios from '../../services/httpService';

export const ConfirmRequestCard = ({
  item,
  index,
  setHandlingRequest,
  handlingRequest,
  setRequestHandledTrue,
}) => {
  const [lendDetailsId, setLendDetailsId] = useState();

  useEffect(() => {
    setLendDetailsId(item.id);
  }, []);

  const handleAccept = async () => {
    try {
      setHandlingRequest(true);
      const {data} = await axios.post(`/borrow/lend-confirm-requests/${lendDetailsId}`, {
        accept_request: true,
      });
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      setRequestHandledTrue();
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Failed to handle request', ToastAndroid.SHORT);
    } finally {
      setHandlingRequest(false);
    }
  };

  const handleReject = async () => {
    try {
      setHandlingRequest(true);
      const {data} = await axios.post(`/borrow/lend-confirm-requests/${lendDetailsId}`, {
        accept_request: false,
      });
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      setRequestHandledTrue();
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Failed to handle request', ToastAndroid.LONG);
    } finally {
      setHandlingRequest(false);
    }
  };

  if (!item) {
    return null;
  }
  return (
    <View
      style={{
        width: '100%',
        marginTop: '5%',
        flexDirection: 'row',
      }}>
      <View style={{flex: 3}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text appearance="hint">Name</Text>
          </View>
          <View style={{flex: 4}}>
            <Text>: {item.BookShelf.User.full_name}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text appearance="hint">Email</Text>
          </View>
          <View style={{flex: 4}}>
            <Text>: {item.BookShelf.User.email}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text appearance="hint">Gender</Text>
          </View>
          <View style={{flex: 4}}>
            <Text>: {item.BookShelf.User.gender}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          disabled={handlingRequest}
          onPress={() => {
            handleAccept(item.id);
          }}>
          <Text status="success">Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled
          onPress={() => {
            handleReject(item.id);
          }}>
          <Text status="danger">Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
