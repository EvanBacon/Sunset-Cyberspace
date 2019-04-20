import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Button from '../components/Button';
import MenuTitle from '../components/MenuTitle';

const SONG_URL = 'https://www.newgrounds.com/audio/listen/726455';
class AnimatedViewParent extends React.Component {
  render() {
    const { isPlaying, ...props } = this.props;

    return (
      <Animatable.View
        iterationCount={isPlaying ? 1 : 'infinite'}
        easing="ease-out"
        useNativeDriver
        {...props}
      />
    );
  }
}

class MenuScreen extends React.Component {
  render() {
    const { score, playing, onStory } = this.props;
    return (
      <View pointerEvents="box-none" style={styles.container}>
        <Animatable.View
          key={'score'}
          easing="ease-out"
          animation={'bounceInRight'}
          style={styles.scoreContainer}
        >
          <Text style={styles.scoreText}>{score}</Text>
        </Animatable.View>

        <MenuTitle playing={playing} />

        <AnimatedViewParent
          style={styles.storyButtonWrapper}
          animation={playing ? 'bounceOut' : 'pulse'}
          isPlaying={playing}
        >
          <Button title="VIEW STORY" onPress={onStory} />
        </AnimatedViewParent>

        <AnimatedViewParent
          style={styles.songButtonWrapper}
          animation={playing ? 'bounceOut' : 'pulse'}
          isPlaying={playing}
        >
          <Button title="SONG" onPress={() => Linking.openURL(SONG_URL)} />
        </AnimatedViewParent>

        <AnimatedViewParent
          style={styles.animatableView}
          animation={playing ? 'bounceOut' : 'pulse'}
          isPlaying={playing}
        >
          <Button
            title="LICENSES"
            onPress={() => this.props.navigation.navigate('Licenses')}
          />
        </AnimatedViewParent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
});

export default MenuScreen;
