import React, {useState, useEffect} from 'react';
import {StyleSheet,  View, Alert} from 'react-native';
import {Button, Text, ListItem} from '@ui-kitten/components';

import {useAuth} from '../../contexts/Auth';
import { Loading } from '../../components/Loading';

const SettingsScreen = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [user,setUser] =useState();
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Log out failed', error.message);
    }
  };

  const parseJwt = token => {
    var Buffer = require('buffer/').Buffer;
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  };


  const getUserData = async () =>{
    setLoading(true);
    const decodedJwt = await parseJwt(auth.authData.token);
    console.log(decodedJwt.user)
    setUser(decodedJwt.user)
  }

  useEffect(() => {
    getUserData()
  }, [])


  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [user])

  

  if(!user)
    return null
  console.log('rendered')
  return (
    <View style={styles.container}>
      <View style={styles.userbox}>
        {Object.keys(user).map((key,i)=>(
          <View style={{flexDirection: 'row'}} key={key}>
            <View style={{flex: 1}}>
              <Text appearance="hint" style={{fontSize: 15}}>{key}</Text>
            </View>
            <View style={{flex: 4}}>
              <Text category="s1"  style={{fontSize: 15}}>: {user[key]}</Text>
            </View>
          </View>
        ))}
      </View>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '30%'
  },
  userbox:{
    width: '100%',
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20
  }
});
