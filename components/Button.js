import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

class Button extends React.Component {
  render() {
    const { onPress, title, style } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[style, styles.container]}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Retro-Regular',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});
