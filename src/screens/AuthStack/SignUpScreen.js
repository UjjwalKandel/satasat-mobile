import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';

import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {Text, Icon, Input, Button, Spinner} from '@ui-kitten/components';

import {CustomInput} from '../../components/CustomInput';
import {useAuth} from '../../contexts/Auth';

const SignUpScreen = ({navigation}) => {
  const [hidePasswordOne, setHidePasswordOne] = useState(true);
  const [hidePasswordTwo, setHidePasswordTwo] = useState(true);

  const auth = useAuth();

  const toggleHidePasswordOne = () => {
    setHidePasswordOne(!hidePasswordOne);
  };
  const toggleHidePasswordTwo = () => {
    setHidePasswordTwo(!hidePasswordTwo);
  };

  const renderIconOne = props => (
    <TouchableWithoutFeedback onPress={toggleHidePasswordOne}>
      <Icon {...props} name={!hidePasswordOne ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderIconTwo = props => (
    <TouchableWithoutFeedback onPress={toggleHidePasswordTwo}>
      <Icon {...props} name={!hidePasswordTwo ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const signUpValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('Full name is required'),
    user_name: yup.string().required('Username is required'),
    phoneNumber: yup
      .string()
      .matches(/(\d){10}\b/, 'Enter a valid phone number')
      .required('Phone number is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character',
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),
    gender: yup.string().required('Gender is required'),
    address: yup.string().required('Address is required'),
  });

  const signUpSubmitHandler = async values => {
    try {
      await auth.signUp(values);
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={{flexGrow: 1, alignItems: 'center'}}>
      <ScrollView bounces={false}>
        <Formik
          validateOnMount={true}
          initialValues={{
            fullName: '',
            user_name: '',
            email: '',
            phoneNo: '',
            password: '',
            confirmPassword: '',
            gender: '',
            address: '',
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={async (values, actions) => {
            Keyboard.dismiss();
            try {
              await signUpSubmitHandler(values);
            } catch (error) {
              actions.setSubmitting(false);
            } finally {
              actions.resetForm();
              actions.validateForm();
            }
          }}>
          {({handleSubmit, isValid, isSubmitting}) => (
            <View style={{alignItems: 'center'}}>
              <Field
                component={CustomInput}
                name="fullName"
                placeholder="Full Name"
              />
              <Field
                component={CustomInput}
                name="user_name"
                placeholder="Username"
              />
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />
              <Field
                component={CustomInput}
                name="phoneNumber"
                placeholder="Phone Number"
                keyboardType="numeric"
              />
              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                secureTextEntry={hidePasswordOne}
                accessoryRight={renderIconOne}
              />
              <Field
                component={CustomInput}
                name="confirmPassword"
                placeholder="Retype Password"
                secureTextEntry={hidePasswordTwo}
                accessoryRight={renderIconTwo}
              />
              <Field
                component={CustomInput}
                name="gender"
                placeholder="Gender"
              />
              <Field
                component={CustomInput}
                name="address"
                placeholder="Full Address"
              />
              <Button
                style={{minWidth: '95%'}}
                onPress={handleSubmit}
                disabled={isSubmitting ? true : !isValid}>
                {isSubmitting ? (
                  <View>
                    <Spinner status="primary" size="small" />
                  </View>
                ) : (
                  <Text>Register</Text>
                )}
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
