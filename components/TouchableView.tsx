import React from 'react';
import { PanResponder, View } from 'react-native';

/* global Alert */

function TouchableView({ id, style, ...props }) {
  const _panResponder = React.useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: ({ nativeEvent }, gestureState) =>
        props.onTouchesBegan({ ...nativeEvent, gestureState }),
      onPanResponderMove: ({ nativeEvent }, gestureState) =>
        props.onTouchesMoved({ ...nativeEvent, gestureState }),
      onPanResponderRelease: ({ nativeEvent }, gestureState) =>
        props.onTouchesEnded({ ...nativeEvent, gestureState }),
      onPanResponderTerminate: ({ nativeEvent }, gestureState) =>
        props.onTouchesCancelled
          ? props.onTouchesCancelled({ ...nativeEvent, gestureState })
          : props.onTouchesEnded({ ...nativeEvent, gestureState }),
    });
  }, [
    props.onTouchesBegan,
    props.onTouchesMoved,
    props.onTouchesEnded,
    props.onTouchesCancelled,
    props.onTouchesCancelled,
    props.onTouchesEnded,
  ])
  return (
    <View
      {...props}
      style={[{ flex: 1 }, style]}
      {..._panResponder.panHandlers}
    />
  );

}

export default TouchableView;
