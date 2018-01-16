import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import AudioManager from '../AudioManager';
import Story from '../constants/Story';
import CutScene from './CutScene';
import GameScreen from './GameScreen';
import LoadingScreen from './LoadingScreen';
import MenuScreen from './MenuScreen';

export default class HomeScreen extends React.Component {
  state = {
    playing: false,
    score: 0,
    gameLoaded: false,
    count: 0,
    cutScene: null,
  };

  componentWillMount() {
    AudioManager.sharedInstance.playAsync('intro', true);
  }

  componentWillUnmount() {
    AudioManager.sharedInstance.stopAsync('intro');
  }

  _renderUI = loading => {
    return loading ? (
      <LoadingScreen />
    ) : (
      <MenuScreen
        score={this.state.score}
        playing={this.state.playing}
        onStory={() => this.setState({ cutScene: Story })}
      />
    );
  };
  render() {
    const { gameLoaded } = this.state;

    const onPlay = playing => {
      this.setState({ playing });
      if (playing) {
        AudioManager.sharedInstance.stopAsync('intro');
        this.setState({ score: 0, highScore: false });
      } else {
        AudioManager.sharedInstance.stopAsync('retro');
        AudioManager.sharedInstance.playAsync('intro', true);
      }
    };

    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <GameScreen
          onGameLoaded={() => this.setState({ gameLoaded: true })}
          updateScore={(score, highScore) => this.setState({ score, highScore })}
          onPlay={onPlay}
        />

        {this._renderUI(!gameLoaded)}

        {this.state.cutScene && (
          <CutScene onFinish={() => this.setState({ cutScene: null })} data={this.state.cutScene} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
