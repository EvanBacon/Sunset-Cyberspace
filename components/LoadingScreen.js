import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Images from '../constants/Images';
import { Retro } from './Text';

const AnimatableImageBackground = Animatable.createAnimatableComponent(ImageBackground);
const LoadingScreen = () => (
  <AnimatableImageBackground
    pointerEvents="none"
    useNativeDriver
    animation={'fadeIn'}
    style={styles.loadingImage}
    source={Images['loading']}>
    <Retro.Regular style={styles.loadingText}>LOADING...</Retro.Regular>
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
    color: 'white',
    textAlign: 'center',
  },
});

export default LoadingScreen;
