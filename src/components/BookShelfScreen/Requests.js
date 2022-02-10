import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@ui-kitten/components';

import {RequestCard} from './RequestCard';

const Requests = ({requests}) => {
  const [handlingRequest, setHandlingRequest] = useState(false);
  const [requestHandled, setRequestHandled] = useState(false);

  useEffect(() => {
    if (requests.length > 0) {
      setRequestHandled(false);
    } else {
      setRequestHandled(true);
    }
  }, []);
  const changeHandlingRequest = val => {
    setHandlingRequest(val);
  };

  const setRequestHandledTrue = () => {
    setRequestHandled(true);
  };

  if (!requests) {
    return null;
  }

  return !requestHandled ? (
    <View style={{backgroundColor: '#fff', marginVertical: 10, padding: '5%'}}>
      <>
        <Text category="h6">Book Requests</Text>
        {requests.map((item, index) => (
          <RequestCard
            item={item}
            key={index.toString()}
            setHandlingRequest={changeHandlingRequest}
            handlingRequest={handlingRequest}
            setRequestHandledTrue={setRequestHandledTrue}
          />
        ))}
      </>
    </View>
  ) : null;
};

export default Requests;

const styles = StyleSheet.create({});
