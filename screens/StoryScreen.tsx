import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import CharacterScene from '../components/CharacterScene';
import Story from '../constants/Story';

function StoryScreen({ navigation, data = Story }) {
  const [finished, setFinished] = React.useState(false);

  return (
    <Animatable.View
      useNativeDriver
      onAnimationEnd={() => {
        if (finished) {
          navigation.goBack();
        }
      }}
      animation={finished ? 'fadeOut' : 'fadeIn'}
      duration={2000}
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
        padding: 0,
      }}
    >
      <CharacterScene onFinish={() => setFinished(true)} data={data} />
    </Animatable.View>
  );
}

export default StoryScreen;
