import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

export default ({ children, style }) => (
  <View style={[style, styles.container]}>
    <Text style={styles.text}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: 'Retro-Regular',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 3,
    borderRadius: 4,
    borderColor: Colors.border,
    backgroundColor: Colors.flat,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
