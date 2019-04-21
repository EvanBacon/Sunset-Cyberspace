import React from 'react';
import { StyleSheet, View } from 'react-native';

import AudioManager from '../AudioManager';
import GameScreen from './GameScreen';
import LoadingScreen from './LoadingScreen';
import MenuScreen from './MenuScreen';

class HomeScreen extends React.Component {
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
        navigation={this.props.navigation}
        score={this.state.score}
        playing={this.state.playing}
        onStory={() => this.props.navigation.navigate('Story')}
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
        <GameScreen
          ref={ref => (this.gameView = ref)}
          onGameLoaded={() => this.setState({ gameLoaded: true })}
          updateScore={(score, highScore) =>
            this.setState({ score, highScore })
          }
          onPlay={onPlay}
        />

        {this._renderUI(!gameLoaded)}
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
