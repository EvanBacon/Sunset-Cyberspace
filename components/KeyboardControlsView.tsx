import React, { useEffect } from 'react';
import { Platform } from 'react-native';

export default function KeyboardControlsView({ children, onDown, onUp }) {
  if (Platform.OS !== 'web') {
    return children;
  }
  useEffect(() => {
    const onKey = e => onDown(e);

    window.addEventListener('keydown', onKey, false);

    return () => window.removeEventListener('keydown', onKey);
  }, [onDown]);

  useEffect(() => {
    const onKey = e => onUp && onUp(e);

    window.addEventListener('keyup', onKey, false);

    return () => window.removeEventListener('keyup', onKey);
  }, [onUp]);

  return children;
}
