import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@ui-kitten/components';

import {ReturnRequestCard} from './ReturnRequestCard';

const ReturnRequests = ({returnRequests}) => {
  const [handlingRequest, setHandlingRequest] = useState(false);
  const [requestHandled, setRequestHandled] = useState(false);

  useEffect(() => {
    if (returnRequests.length > 0) {
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

  if (!returnRequests) {
    return null;
  }

  return !requestHandled ? (
    <View style={{backgroundColor: '#fff', marginVertical: 10, padding: '5%'}}>
      <>
        <Text category="h6">Book Return Requests</Text>
        {returnRequests.map((item, index) => (
          <ReturnRequestCard
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

export default ReturnRequests;

const styles = StyleSheet.create({});
