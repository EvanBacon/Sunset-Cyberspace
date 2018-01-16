import Expo from 'expo';
import Audio from './constants/Audio';
import arrayFromObject from './utils/arrayFromObject';
import cacheAssetsAsync from './utils/cacheAssetsAsync';

class AudioManager {
  sounds = {};

  playAsync = async (name, isLooping) => {
    if (this.sounds.hasOwnProperty(name)) {
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
    if (this.sounds.hasOwnProperty(name)) {
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
    const keys = Object.keys(Audio);
    for (let key of keys) {
      const item = Audio[key];
      this.sounds[key] = (await Expo.Audio.Sound.create(item)).sound;
    }
  };

  downloadAsync = async () =>
    cacheAssetsAsync({
      files: [...arrayFromObject(Audio)],
    });

  setupAsync = async () => {
    await this.configureExperienceAudioAsync();
    await this.downloadAsync();
    await this.setupAudioAsync();
  };
}

AudioManager.sharedInstance = new AudioManager();

export default AudioManager;
