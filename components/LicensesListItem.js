import { FontAwesome } from '@expo/vector-icons';
import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class LicensesListItem extends Component {
  render() {
    const {
      image,
      userUrl,
      username,
      name,
      version,
      color,
      licenses,
      repository,
      licenseUrl,
      parents,
    } = this.props;

    let title = name;
    if (username) {
      if (title.toLowerCase() != username.toLowerCase()) {
        title += ` by ${username}`;
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.cardShadow}>
          <View style={[styles.card, { backgroundColor: color }]}>
            {image && (
              <TouchableOpacity onPress={() => Linking.openURL(userUrl)}>
                <Image source={{ uri: image }} style={styles.image} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              underlayColor={'#eeeeee'}
              onPress={() => Linking.openURL(repository)}
              style={styles.item}
            >
              <View style={{ maxWidth: '90%' }}>
                <Text style={styles.name}>{title}</Text>
                <Link style={styles.text} url={licenseUrl}>
                  {licenses}
                </Link>
                <Link style={styles.text}>{version}</Link>
              </View>
              <FontAwesome
                style={{ alignSelf: 'center' }}
                color={'white'}
                size={16}
                name={'chevron-right'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const Link = ({ url, style, children }) => (
  <Text
    style={style}
    numberOfLines={1}
    onPress={() => url && Linking.openURL(url)}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cardShadow: {
    marginHorizontal: 12,
    marginVertical: 6,
    shadowColor: '#E010C0',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  image: {
    aspectRatio: 1,
    width: 96,
    borderRadius: 0,
  },

  text: {
    color: 'white',
    marginTop: 3,
  },
});
