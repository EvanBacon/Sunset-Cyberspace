import PropTypes from 'prop-types';
import React from 'react';

import CharacterDialog from './CharacterDialog';

class CharacterStory extends React.Component {
  static propTypes = {
    onFinish: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
  };
  state = { index: 0 };
  render() {
    const { index } = this.state;
    const { data, onFinish } = this.props;
    const item = data[index];
    if (!item) {
      console.warn('Empty Story!');
      return null;
    }
    return (
      <CharacterDialog
        onFinish={() => {
          if (index === data.length - 1) {
            onFinish();
            return;
          }
          this.setState({ index: index + 1 });
        }}
        animate={item.animate}
        image={item.image}
        name={item.name}
        dialog={item.dialog}
      />
    );
  }
}

export default CharacterStory;
