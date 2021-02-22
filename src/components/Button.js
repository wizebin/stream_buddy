import { isString } from 'lodash';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const defaultStyle = {
  padding: 12,
  borderRadius: 8,
  elevation: 3,
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.4,
  shadowColor: '#444',
};

const defaultTextStyle = {
  color: '#fff',
};

export default function Button(props) {
  const { textStyle, ...rest } = props;
  return (
    <TouchableOpacity {...rest} style={[defaultStyle, props.style]}>
      {isString(props.children) ? <Text style={[defaultTextStyle, textStyle]}>{props.children}</Text> : props.children}
    </TouchableOpacity>
  );
}
