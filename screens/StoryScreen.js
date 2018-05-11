import { Constants } from 'expo';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import CutScene from '../components/CutScene';

class StoryScreen extends Component {
  render() {
    return <CutScene navigation={this.props.navigation} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Constants.statusBarHeight,
  },
});

export default StoryScreen;
