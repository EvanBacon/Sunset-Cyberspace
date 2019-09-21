import React, { Fragment, useEffect, useRef, useState } from 'react';

import AudioManager from '../AudioManager';
import GameScreen from './GameScreen';
import LoadingScreen from './LoadingScreen';
import MenuScreen from './MenuScreen';

export default function HomeScreen({ navigation }) {
  const [isHighScore, setIsHighScore] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameLoaded, setLoaded] = useState(false);

  useEffect(() => {
    AudioManager.sharedInstance.playAsync('intro', true);
    return () => AudioManager.sharedInstance.stopAsync('intro');
  }, []);

  return (
    <Fragment>
      <GameScreen
        onGameLoaded={() => setLoaded(true)}
        updateScore={(score, highScore) => {
          setScore(score);
          setIsHighScore(highScore);
        }}
        onPlay={playing => {
          setPlaying(playing);

          if (isPlaying) {
            AudioManager.sharedInstance.stopAsync('intro');
            setScore(0);
            setIsHighScore(false);
          } else {
            AudioManager.sharedInstance.stopAsync('retro');
            AudioManager.sharedInstance.playAsync('intro', true);
          }
        }}
      />

      {isGameLoaded ? (
        <MenuScreen
          navigation={navigation}
          score={score}
          playing={isPlaying}
          onStory={() => navigation.navigate('Story')}
        />
      ) : (
        <LoadingScreen />
      )}
    </Fragment>
  );
}
