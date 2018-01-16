import PropTypes from 'prop-types';
import React from 'react';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import TypeWriter from 'react-native-typewriter';

import { Retro } from './Text';

const isIphone = Platform.OS === 'ios';

export default class CharacterDialog extends React.Component {
  static propTypes = {
    onFinish: PropTypes.func.isRequired,
  };
  static defaultProps = {
    delayTime: 1500,
  };
  state = { typing: 0 };
  render = () => (
    <TouchableWithoutFeedback
      style={{
        position: 'absolute',
        left: 0,
        minWidth: 256,
        bottom: 8,
      }}
      onPress={this.props.onFinish}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}>
        {this.props.image && (
          <Animatable.Image
            useNativeDriver
            animation={'fadeInLeftBig'}
            duration={this.props.animate ? 1700 : 1}
            delay={this.props.animate ? 900 : 1}
            source={this.props.image}
            style={{ height: 192, aspectRatio: 1, resizeMode: 'contain' }}
          />
        )}
        <Animatable.View
          animation={'fadeInLeftBig'}
          useNativeDriver
          duration={this.props.animate ? 1500 : 1}
          delay={this.props.animate ? 500 : 1}>
          <Animatable.View
            useNativeDriver
            onAnimationEnd={_ => {
              this.setState({ typing: 1 });
            }}
            animation={'zoomIn'}
            duration={this.props.animate ? 1000 : 1}
            delay={this.props.animate ? 2000 : 1}
            style={{
              zIndex: 1,
              position: 'absolute',
              left: 24,
              top: isIphone ? -12 : 0,
              paddingTop: isIphone ? 0 : 8,
              right: 0,
            }}>
            {this.props.name && <NameTag>{this.props.name}</NameTag>}
          </Animatable.View>
          <DialogBox
            hasName={this.props.name}
            typing={this.state.typing}
            onFinish={() => {
              setTimeout(() => {
                this.props.onFinish();
              }, this.props.delayTime);
            }}>
            {this.props.dialog}
          </DialogBox>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const colors = {
  flat: '#212557',
  border: '#3B429C',
};
export const NameTag = ({ children, style }) => (
  <View
    style={[
      style,
      {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
      },
    ]}>
    <Retro.Regular
      style={{
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderWidth: 3,
        borderRadius: 4,
        borderColor: colors.border,
        backgroundColor: colors.flat,
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
      }}>
      {children}
    </Retro.Regular>
  </View>
);

export const DialogBox = ({ children, hasName, style, typing, onFinish }) => (
  <View
    style={[
      style,
      {
        paddingHorizontal: 16,
        minWidth: 264,
        paddingBottom: 24,
        paddingTop: isIphone || !hasName ? 32 : 48,
        borderWidth: 3,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: colors.border,
        backgroundColor: colors.flat,
      },
    ]}>
    <TypeWriter
      maxDelay={60}
      typing={typing}
      onTypingEnd={onFinish}
      style={[
        { fontFamily: 'Retro-Italic' },
        { textAlign: 'center', color: 'white', fontSize: 16 },
      ]}>
      {children}
    </TypeWriter>
  </View>
);
