import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import { createAnimatableComponent } from 'react-native-animatable';

import Assets from '../Assets';

const AnimatableImageBackground = createAnimatableComponent(ImageBackground);

const LoadingScreen = () => (
  <AnimatableImageBackground
    pointerEvents="none"
    useNativeDriver
    animation="fadeIn"
    style={styles.loadingImage}
    source={Assets.images['loading.gif']}
  >
    <Text style={styles.loadingText}>LOADING...</Text>
  </AnimatableImageBackground>
);

const styles = StyleSheet.create({
  loadingImage: {
    // resizeMode: "cover",
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  loadingText: {
    fontSize: 64,
    // fontFamily: 'Retro-Regular',
    color: 'white',
    textAlign: 'center',
  },
});

export default LoadingScreen;
