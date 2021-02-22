import React, { useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native'; // eslint-disable-line

export default function Measure(props) {
  const [dimensions, setDimensions] = useState(null);
  const { ...rest } = props;

  /**
   * @param {LayoutChangeEvent} input
   */
  const layout = (input) => {
    const width = input?.nativeEvent?.layout?.width;
    const height = input?.nativeEvent?.layout?.height;

    if (width !== dimensions?.width || height !== dimensions?.height) {
      setDimensions({ width, height });
    }
  };

  return (
    <View onLayout={layout} {...rest}>
      {props.children(dimensions)}
    </View>
  );
}
