import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import TypeWriter from 'react-native-typewriter';

import Colors from '../constants/Colors';

const isIphone = Platform.OS === 'ios';

function CharacterDialog({ children, hasName, style, typing, onFinish }) {
  return (
    <View
      style={[
        style,
        styles.container,
        { paddingTop: isIphone || !hasName ? 32 : 48 },
      ]}
    >
      <TypeWriter
        maxDelay={60}
        typing={typing}
        onTypingEnd={onFinish}
        style={styles.text}
      >
        {children}
      </TypeWriter>
    </View>
  );
}

export default CharacterDialog;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    minWidth: 264,
    paddingBottom: 24,
    borderWidth: 3,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: Colors.border,
    backgroundColor: Colors.flat,
  },
  text: {
    fontFamily: 'Retro-Italic',
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
