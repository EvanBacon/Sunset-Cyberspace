import Expo from 'expo';
import AssetUtils from 'expo-asset-utils';
import React from 'react';

import Assets from '../Assets';
import AudioManager from '../AudioManager';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';

class Preload extends React.Component {
  state = {
    loading: true,
  };

  get fonts() {
    let items = {};
    const keys = Object.keys(Assets.fonts || {});
    for (let key of keys) {
      const item = Assets.fonts[key];
      const name = key.substr(0, key.lastIndexOf('.'));
      items[name] = item;
    }
    return [items];
  }

  get files() {
    return [
      ...AssetUtils.arrayFromObject(Assets.images),
      ...AssetUtils.arrayFromObject(Assets.models),
    ];
  }

  get audio() {
    return AssetUtils.arrayFromObject(Assets.audio);
  }

  async preloadAssets() {
    await AssetUtils.cacheAssetsAsync({
      fonts: this.fonts,
      files: this.files,
      audio: this.audio,
    });
    await AudioManager.sharedInstance.setupAsync();
    this.setState({ loading: false });
  }

  componentWillMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
    this.preloadAssets();
  }

  get loading() {
    return <LoadingScreen />;
  }

  get screen() {
    return <HomeScreen />;
  }

  render() {
    return this.state.loading ? this.loading : this.screen;
  }
}

export default Preload;
