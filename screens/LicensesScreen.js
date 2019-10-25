import Constants from 'expo-constants';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useSafeArea } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Licenses from '../components/Licenses';
import Data from '../licenses';

function extractNameFromGithubUrl(url) {
  if (!url) {
    return null;
  }

  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  const components = reg.exec(url);

  if (components && components.length > 5) {
    return components[5];
  }
  return null;
}

function sortDataByKey(data, key) {
  data.sort(function(a, b) {
    return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
  });
  return data;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const licenses = Object.keys(Data).map(key => {
  let { licenses, ...license } = Data[key];
  let [name, version] = key.split('@');

  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  let username =
    extractNameFromGithubUrl(license.repository) ||
    extractNameFromGithubUrl(license.licenseUrl);

  let userUrl;
  let image;
  if (username) {
    username = capitalizeFirstLetter(username);
    image = `http://github.com/${username}.png`;
    userUrl = `http://github.com/${username}`;
  }

  return {
    key,
    name,
    image,
    userUrl,
    username,
    /// Use only the first 406...
    licenses: licenses.slice(0, 405),
    version,
    ...license,
  };
});

sortDataByKey(licenses, 'username');

export default function LicensesScreen({ navigation }) {
  const [top, left, bottom, right] = useSafeArea();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top,
          paddingBottom: bottom,
          paddingLeft: left,
          paddingRight: right,
        },
      ]}
    >
      <Licenses licenses={licenses} />
      <Animatable.View
        style={styles.animatableIView}
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
      >
        <Button title="BACK" onPress={() => navigation.goBack()} />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  animatableIView: {
    zIndex: 2,
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 128,
  },
});
