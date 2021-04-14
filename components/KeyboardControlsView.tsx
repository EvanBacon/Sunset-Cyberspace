import React, { useEffect } from 'react';

export default function KeyboardControlsView({ children, onDown, onUp }) {
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
