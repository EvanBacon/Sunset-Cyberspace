// @flow
import React from 'react';
import { PanResponder, View } from 'react-native';

/* global Alert */

class TouchableView extends React.Component {
  buildGestures = () =>
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: ({ nativeEvent }, gestureState) =>
        this.props.onTouchesBegan({ ...nativeEvent, gestureState }),
      onPanResponderMove: ({ nativeEvent }, gestureState) =>
        this.props.onTouchesMoved({ ...nativeEvent, gestureState }),
      onPanResponderRelease: ({ nativeEvent }, gestureState) =>
        this.props.onTouchesEnded({ ...nativeEvent, gestureState }),
      onPanResponderTerminate: ({ nativeEvent }, gestureState) =>
        this.props.onTouchesCancelled
          ? this.props.onTouchesCancelled({ ...nativeEvent, gestureState })
          : this.props.onTouchesEnded({ ...nativeEvent, gestureState }),
    });

  componentWillMount() {
    this._panResponder = this.buildGestures();
  }

  render() {
    const { children, id, style, ...props } = this.props;
    return (
      <View
        {...props}
        style={[{ flex: 1 }, style]}
        {...this._panResponder.panHandlers}
      >
        {children}
      </View>
    );
  }
}

export default TouchableView;
