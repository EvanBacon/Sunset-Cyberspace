import React from 'react';

class KeyboardControlsView extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown, false);
    window.addEventListener('keyup', this.onKeyUp, false);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyDown = e => {
    this.props.onDown(e);
  };

  onKeyUp = e => {
    this.props.onUp(e);
  };

  render() {
    return this.props.children;
  }
}

export default KeyboardControlsView;
