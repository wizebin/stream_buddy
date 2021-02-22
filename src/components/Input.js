import { isString } from 'lodash';
import React from 'react';
import { Text, TextInput } from 'react-native';

const defaultStyle = {
  padding: 12,
  borderRadius: 8,
  borderColor: '#777',
  borderWidth: 1,
  marginBottom: 5,
};

export default function Input(props) {
  return (
    <TextInput {...props} style={[defaultStyle, props.style]}></TextInput>
  );
}
