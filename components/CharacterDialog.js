import PropTypes from 'prop-types';
import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import DialogBox from './DialogBox';
import NameTag from './NameTag';

const isIphone = Platform.OS === 'ios';

class CharacterDialog extends React.Component {
  static propTypes = {
    onFinish: PropTypes.func.isRequired,
  };

  static defaultProps = {
    delayTime: 1500,
  };

  state = { typing: 0 };

  render() {
    const { name, image, animate, delayTime, onFinish, dialog } = this.props;
    return (
      <TouchableWithoutFeedback style={styles.touchable} onPress={onFinish}>
        <View style={styles.container}>
          {image && (
            <Animatable.Image
              useNativeDriver
              animation={'fadeInLeftBig'}
              duration={animate ? 1700 : 1}
              delay={animate ? 900 : 1}
              source={image}
              style={styles.animatedImage}
            />
          )}
          <Animatable.View
            animation={'fadeInLeftBig'}
            useNativeDriver
            duration={animate ? 1500 : 1}
            delay={animate ? 500 : 1}
          >
            <Animatable.View
              useNativeDriver
              onAnimationEnd={() => this.setState({ typing: 1 })}
              animation={'zoomIn'}
              duration={animate ? 1000 : 1}
              delay={animate ? 2000 : 1}
              style={{
                zIndex: 1,
                position: 'absolute',
                left: 24,
                top: isIphone ? -12 : 0,
                paddingTop: isIphone ? 0 : 8,
                right: 0,
              }}
            >
              {name && <NameTag>{name}</NameTag>}
            </Animatable.View>
            <DialogBox
              hasName={name}
              typing={this.state.typing}
              onFinish={() => {
                setTimeout(() => {
                  onFinish();
                }, delayTime);
              }}
            >
              {dialog}
            </DialogBox>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default CharacterDialog;

const styles = StyleSheet.create({
  touchable: {
    position: 'absolute',
    left: 0,
    minWidth: 256,
    bottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  animatedImage: {
    height: 192,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
