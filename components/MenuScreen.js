import React from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Images from '../constants/Images';
import { Retro } from './Text';

const MenuScreen = ({ score, playing, onStory }) => (
  <View pointerEvents="box-none" style={styles.menu}>
    <Animatable.View useNativeDriver animation={'bounceInRight'} style={styles.scoreContainer}>
      <Retro.Regular style={styles.scoreText}>{score}</Retro.Regular>
    </Animatable.View>

    <View pointerEvents="none" style={styles.imageWrapper}>
      <Animatable.Image
        useNativeDriver
        animation={playing ? 'bounceOutRight' : 'bounceInLeft'}
        style={styles.image}
        source={Images.retro_subtitle}
      />
      <Animatable.View
        useNativeDriver
        animation={playing ? 'bounceOut' : 'zoomInDown'}
        style={{
          top: 0,
          left: 0,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        <Animatable.Image
          useNativeDriver
          delay={500}
          iterationCount="infinite"
          animation="pulse"
          easing="ease-out"
          style={styles.image}
          source={Images.retro_title}
        />
      </Animatable.View>

      <Animatable.Image
        useNativeDriver
        animation={playing ? 'bounceOutLeft' : 'bounceInRight'}
        delay={500}
        style={styles.image}
        source={Images.retro_last_title}
      />
    </View>

    <Animatable.View
      style={{ zIndex: 2, position: 'absolute', top: 8, left: 8, width: 128 }}
      animation={playing ? 'bounceOut' : 'pulse'}
      easing="ease-out"
      iterationCount={playing ? 1 : 'infinite'}>
      <Button title="VIEW STORY" onPress={onStory} />
    </Animatable.View>

    <Animatable.View
      style={{
        zIndex: 2,
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: 128,
      }}
      animation={playing ? 'bounceOut' : 'pulse'}
      easing="ease-out"
      iterationCount={playing ? 1 : 'infinite'}>
      <Button
        title={'SONG'}
        onPress={() => {
          Linking.openURL('https://www.newgrounds.com/audio/listen/726455');
        }}
      />
    </Animatable.View>
  </View>
);

const Button = ({ onPress, title, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[style, { padding: 12, justifyContent: 'center', alignItems: 'center' }]}>
    <Retro.Regular style={{ fontSize: 24, color: 'white', textAlign: 'center' }}>
      {title}
    </Retro.Regular>
  </TouchableOpacity>
);

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
  scoreText: {
    fontSize: 64,
    color: 'white',
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
export default MenuScreen;
