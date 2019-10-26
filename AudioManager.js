import { Audio } from 'expo-av';

// import * as AssetUtils from 'expo-asset-utils';
import Assets from './Assets';

class AudioManager {
  sounds = {};

  playAsync = async (name, isLooping) => {
    return;
    if (name in this.sounds) {
      const soundObject = this.sounds[name];
      try {
        await soundObject.setPositionAsync(0);
        await soundObject.setIsLoopingAsync(isLooping);
        await soundObject.playAsync();
      } catch ({ message }) {
        console.warn(`Error playing audio: ${message}`);
      }
    } else {
      console.warn("Audio doesn't exist", name);
    }
  };

  stopAsync = async name => {
    if (name in this.sounds) {
      const soundObject = this.sounds[name];
      try {
        await soundObject.stopAsync();
      } catch ({ message }) {
        console.warn(`Error stopping audio: ${message}`);
      }
    } else {
      console.warn("Audio doesn't exist", name);
    }
  };

  configureExperienceAudioAsync = async () => {
    await Audio.setIsEnabledAsync(true);
    // return Audio.setAudioModeAsync({
    //   allowsRecordingIOS: false,
    //   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //   playsInSilentModeIOS: false,
    //   shouldDuckAndroid: true,
    //   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    //   playThroughEarpieceAndroid: true
    // });
  };

  setupAudioAsync = async () => {
    const keys = Object.keys(Assets.audio);
    for (let key of keys) {
      const item = Assets.audio[key];
      this.sounds[key.split('.')[0]] = (await Audio.Sound.createAsync(
        item,
      )).sound;
    }
  };

  setupAsync = () =>
    Promise.all([this.configureExperienceAudioAsync(), this.setupAudioAsync()]);
}

export default new AudioManager();
