import Expo from 'expo';

import AssetUtils from 'expo-asset-utils';
import Assets from './Assets';

class AudioManager {
  sounds = {};

  playAsync = async (name, isLooping) => {
    if (name in this.sounds) {
      const soundObject = this.sounds[name];
      try {
        await soundObject.setPositionAsync(0);
        await soundObject.setIsLoopingAsync(isLooping);
        await soundObject.playAsync();
      } catch (error) {
        console.warn('Error playing audio', { error });
      }
    } else {
      console.warn("Audio doesn't exist", name);
    }
  };

  stopAsync = async name => {
    if (name in this.sounds) {
      const soundObject = this.sounds[name];
      try {
        // await soundObject.setPositionAsync(0);
        await soundObject.stopAsync();
      } catch (error) {
        console.warn('Error playing audio', { error });
      }
    } else {
      console.warn("Audio doesn't exist", name);
    }
  };

  configureExperienceAudioAsync = async () =>
    Expo.Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: false,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });

  setupAudioAsync = async () => {
    const keys = Object.keys(Assets.audio);
    for (let key of keys) {
      const item = Assets.audio[key];
      this.sounds[key.split('.')[0]] = (await Expo.Audio.Sound.create(
        item,
      )).sound;
    }
  };

  setupAsync = () =>
    Promise.all([this.configureExperienceAudioAsync(), this.setupAudioAsync()]);
}

AudioManager.sharedInstance = new AudioManager();

export default AudioManager;
