import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import LicensesListItem from './LicensesListItem';

const colors = [
  '#4b37ac',
  '#7f9fe3',
  // 0x1B061A,
  '#b931a8',
  '#3a47b1',
  '#7a24d5',
];

class Licenses extends Component {
  renderItem = ({ item, index }) => (
    <LicensesListItem {...item} color={colors[index % colors.length]} />
  );
  render() {
    const { licenses } = this.props;

    return (
      <FlatList
        style={styles.list}
        keyExtractor={({ key }) => key}
        data={licenses}
        numColumns={2}
        renderItem={this.renderItem}
        contentContainerStyle={{ paddingBottom: 56 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default Licenses;
