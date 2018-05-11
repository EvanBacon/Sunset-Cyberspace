/*

Ok, so if you want to make a license page, download this lib: https://www.npmjs.com/package/npm-license-crawler

I did it globally: `npm i npm-license-crawler -g`

## There are two main styles

### Overwhelmingly long to avoid really crediting people: (not judging, you do you) 
npm-license-crawler --dependencies --json licenses.json

### And a concise clean list of direct packages:
npm-license-crawler --onlyDirectDependencies --json licenses.json

Then use something like this library to display that json! :D


*/

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

import Licenses from '../components/Licenses';

import Data from '../licenses';
import Button from '../components/Button';
import * as Animatable from 'react-native-animatable';

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

let licenses = Object.keys(Data).map(key => {
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
    licenses: licenses.slice(0, 405),
    version,
    ...license,
  };
});

sortDataByKey(licenses, 'username');

class LicensesScreen extends Component {
  onPress = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <Licenses licenses={licenses} />
        <Animatable.View
          style={{
            zIndex: 2,
            position: 'absolute',
            bottom: 8,
            left: 8,
            width: 128,
          }}
          animation={'pulse'}
          easing="ease-out"
          iterationCount={'infinite'}
        >
          <Button title="BACK" onPress={this.onPress} />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Constants.statusBarHeight,
  },
});

export default LicensesScreen;
