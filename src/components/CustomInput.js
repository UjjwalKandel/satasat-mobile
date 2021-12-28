import React from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';

import {Input} from '@ui-kitten/components';

export const CustomInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <Input
        style={[styles.textInput]}
        status={hasError ? 'danger' : 'basic'}
        value={value}
        size="large"
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: '#000',
    marginVertical: 5,
    maxWidth: '95%',
    borderWidth: 1,
    borderRadius: 2,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    alignSelf: 'baseline',
  },
});
