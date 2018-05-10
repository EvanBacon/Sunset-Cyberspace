import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import CharacterScene from './CharacterScene';

class CutScene extends React.Component {
  state = {
    finished: false,
  };

  onAnimationEnd = () => {
    if (this.state.finished) {
      this.props.onFinish();
    }
  };

  get animation() {
    return this.state.finished ? 'fadeOut' : 'fadeIn';
  }

  onFinish = () => this.setState({ finished: true });

  render() {
    return (
      <Animatable.View
        useNativeDriver
        onAnimationEnd={this.onAnimationEnd}
        animation={this.animation}
        duration={2000}
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'black',
          padding: 0,
        }}
      >
        <CharacterScene onFinish={this.onFinish} data={this.props.data} />
      </Animatable.View>
    );
  }
}

export default CutScene;
