import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import CharacterStory from './CharacterStory';

export default class CutScene extends React.Component {
  state = {
    finished: false,
  };

  render() {
    return (
      <Animatable.View
        useNativeDriver
        onAnimationEnd={_ => {
          if (this.state.finished) {
            this.props.onFinish();
          }
        }}
        animation={this.state.finished ? 'fadeOut' : 'fadeIn'}
        duration={2000}
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'black',
          padding: 0,
        }}>
        <CharacterStory onFinish={() => this.setState({ finished: true })} data={this.props.data} />
      </Animatable.View>
    );
  }
}
