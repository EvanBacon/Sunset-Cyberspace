import React from 'react';
import { View } from 'react-native';

export default (props) => <View {...props} style={[{flex: 1}, props.style]} />