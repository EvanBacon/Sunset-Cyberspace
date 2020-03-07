import React from 'react';
import { View } from 'react-native';

export default ({ style, ...props }) => <View {...props} style={[{flex: 1}, style]} />
