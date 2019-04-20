import { ScreenOrientation } from 'expo';
import * as AssetUtils from 'expo-asset-utils';
import React from 'react';

import Assets from '../Assets';
import AudioManager from '../AudioManager';
import Navigator from '../navigation/AppNavigator';
import LoadingScreen from '../screens/LoadingScreen';

function assetsFromFonts(fonts = {}) {
  const items = {};
  const keys = Object.keys(fonts);
  for (const key of keys) {
    const item = fonts[key];
    const name = key.substr(0, key.lastIndexOf('.'));
    items[name] = item;
  }
  return [items];
}

class Preload extends React.Component {
  state = {
    loading: true,
  };

  get files() {
    return [
      // ...AssetUtils.arrayFromObject(Assets.images),
      // ...AssetUtils.arrayFromObject(Assets.models),
    ];
  }

  // get audio() {
  //   return AssetUtils.arrayFromObject(Assets.audio);
  // }

  async preloadAssets() {
    await AssetUtils.cacheAssetsAsync({
      fonts: assetsFromFonts(Assets.fonts),
      // files: this.files,
      // audio: this.audio,
    });
    await AudioManager.sharedInstance.setupAsync();
    this.setState({ loading: false });
  }

  componentWillMount() {
    // ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
    this.preloadAssets();
  }

  get loading() {
    return <LoadingScreen />;
  }

  get screen() {
    return <Navigator />;
  }

  render() {
    return this.state.loading ? this.loading : this.screen;
  }
}

export default Preload;
