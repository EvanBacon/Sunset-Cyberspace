import React from 'react';
import { Text } from 'react-native';

const family = 'Retro-';
const weights = ['Italic', 'Regular'];

const font = fontFamily => ({ style, ...props }) => (
  <Text {...props} style={[style, { fontFamily }]} />
);

let components = {};
for (const weight of weights) {
  components[weight] = font(`${family}${weight}`);
}
export default components;
