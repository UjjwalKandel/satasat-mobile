import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {Text} from '@ui-kitten/components';
import axios from 'axios';
import {baseUrl} from '../../services/AuthService';
import {useAuth} from '../../contexts/Auth';
const Requests = ({requests}) => {
  const auth = useAuth();
  if (!requests) {
    return null;
  }

  useEffect(() => {
    console.log(requests, 'requests');
  }, []);

  const handleRequests = (lendDetailsId, flag) => {
    axios
      .post(
        `${baseUrl}/lend/respond/${lendDetailsId}`,
        {
          accept_request: flag,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.authData.token}`,
          },
        },
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const RenderRequestCard = ({item, index}) => {
    if (!item) {
      return null;
    }
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: '#fff',
          marginTop: '5%',
          padding: '5%',
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
              <Text>: {item.User.full_name}</Text>
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
              <Text>: {item.User.email}</Text>
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
              <Text>: {item.User.gender}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={handleRequests(item.id, true)}>
            <Text status="success">Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRequests(item.id, false)}>
            <Text status="danger">Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View>
      {requests.map((item, index) => (
        <RenderRequestCard item={item} key={index.toString()} />
      ))}
    </View>
  );
};

export default Requests;

const styles = StyleSheet.create({});
