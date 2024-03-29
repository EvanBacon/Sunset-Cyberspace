import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Assets from '../Assets';

const SONG_URL = 'https://www.newgrounds.com/audio/listen/726455';

function MenuTitle({ playing }) {
  return (
    <View pointerEvents="none" style={styles.imageWrapper}>
      <Animatable.Image
        useNativeDriver
        animation={playing ? 'bounceOutRight' : 'bounceInLeft'}
        style={styles.image}
        source={Assets.images['retro_subtitle.png']}
      />
      <Animatable.View
        useNativeDriver
        animation={playing ? 'bounceOut' : 'zoomInDown'}
        style={styles.titleWrapper}
      >
        <Animatable.Image
          useNativeDriver
          delay={500}
          iterationCount="infinite"
          animation="pulse"
          easing="ease-out"
          style={styles.image}
          source={Assets.images['retro_title.png']}
        />
      </Animatable.View>

      <Animatable.Image
        useNativeDriver
        animation={playing ? 'bounceOutLeft' : 'bounceInRight'}
        delay={500}
        style={styles.image}
        source={Assets.images['retro_last_title.png']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    padding: 16,
  },
  titleWrapper: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  songButtonWrapper: {
    zIndex: 2,
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 128,
  },
  storyButtonWrapper: {
    zIndex: 2,
    position: 'absolute',
    top: 8,
    left: 8,
    width: 128,
  },
  animatableView: {
    zIndex: 2,
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 164,
  },
  scoreText: {
    fontSize: 64,
    color: 'white',
    fontFamily: 'Retro-Regular',
  },
  scoreContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  image: {
    resizeMode: 'contain',
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    width: '80%',
    height: '90%',
  },
});

export default MenuTitle;
