import { ScreenOrientation } from 'expo';
// import * as AssetUtils from 'expo-asset-utils';
import React from 'react';

import Assets from '../Assets';
import AudioManager from '../AudioManager';
import Navigator from '../navigation/AppNavigator';
import LoadingScreen from '../screens/LoadingScreen';

import { loadAsync } from 'expo-font';

function cacheFonts(fonts) {
  try {
    return fonts.map(font => loadAsync(font));
  } catch (error) {
    throw new Error('Expo have to be installed if you want to use Font');
  }
}

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
    await cacheFonts(assetsFromFonts(Assets.fonts));
    // await AssetUtils.cacheAssetsAsync({
    //   fonts: cacheFonts(assetsFromFonts(Assets.fonts)),
    //   // files: this.files,
    //   // audio: this.audio,
    // });
    await AudioManager.setupAsync();
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
