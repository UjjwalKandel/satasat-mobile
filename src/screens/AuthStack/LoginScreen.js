import {Formik} from 'formik';
import React, {createRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import * as yup from 'yup';
import {Input, Text, Icon, Button, Spinner} from '@ui-kitten/components';

import {CustomDivider} from '../../components/CustomDivider';
import {useAuth} from '../../contexts/Auth';

const LoginScreen = ({route}) => {
  const navigation = useNavigation();
  const resetRef = createRef();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const auth = useAuth();

  const loginSubmitFormHandler = async (username, password) => {
    try {
      await auth.signIn(username, password);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
      throw new Error(error.message);
      //   resetRef.current?.isSubmitting=false;
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const loginValidationSchema = yup.object().shape({
    username: yup.string().required('Username is Required'),
    password: yup.string().min(6).required('Password is required'),
  });

  useFocusEffect(
    React.useCallback(() => {
      if (resetRef.current) {
        resetRef.current?.resetForm();
      }
    }, [route.params]),
  );

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          pointerEvents="auto"
          style={[styles.container, {width: '100%'}]}>
          <Formik
            validateOnMount={true}
            innerRef={resetRef}
            initialValues={{username: '', password: ''}}
            validationSchema={loginValidationSchema}
            onSubmit={async (values, actions) => {
              Keyboard.dismiss();
              try {
                await loginSubmitFormHandler(values.username, values.password);
                actions.resetForm();
              } catch (error) {
                actions.setSubmitting(false);
              } finally {
                actions.validateForm();
              }
            }}>
            {({
              handleSubmit,
              handleChange,
              isSubmitting,
              handleBlur,
              values,
              isValid,
            }) => (
              <>
                <Input
                  style={styles.inputField}
                  value={values.username}
                  onChangeText={handleChange('username')}
                  handleBlur={handleBlur('username')}
                  size="large"
                  placeholder="Username"
                />
                <Input
                  style={styles.inputField}
                  status={
                    1 > values.password.length || values.password.length >= 5
                      ? 'basic'
                      : 'danger'
                  }
                  value={values.password}
                  onChangeText={handleChange('password')}
                  handleBlur={handleBlur('password')}
                  size="large"
                  placeholder="Password"
                  accessoryRight={renderIcon}
                  secureTextEntry={secureTextEntry}
                />
                <TouchableOpacity
                  style={{marginVertical: 10}}
                  onPress={() => console.log('Forgot-password-test')}
                  disabled={isSubmitting}>
                  <Text style={[styles.titleText, {color: '#d00'}]}>
                    Forgot Password
                  </Text>
                </TouchableOpacity>
                <Button
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={isSubmitting ? true : !isValid}>
                  {isSubmitting ? (
                    <View>
                      <Spinner status="primary" size="small" />
                    </View>
                  ) : (
                    <Text>Sign In</Text>
                  )}
                </Button>
                <CustomDivider />
                <Button
                  style={styles.button}
                  disabled={isSubmitting}
                  onPress={() => {
                    navigation.navigate('SignUpScreen');
                  }}>
                  <Text>Sign Up with Email</Text>
                </Button>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: '95%',
  },
  inputField: {
    color: '#000',
    marginVertical: 5,
    maxWidth: '95%',
    borderWidth: 1,
    borderRadius: 2,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF66',
  },
  titleText: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#111',
    textAlignVertical: 'center',
  },
});
