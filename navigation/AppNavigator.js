import { StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../screens/HomeScreen';
// import Game from '../screens/GameScreen';
import Licenses from '../screens/LicensesScreen';
import Menu from '../screens/MenuScreen';
import Story from '../screens/StoryScreen';

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: 'transparent',
  },
});

const ModalStack = createStackNavigator(
  {
    Home,
    // Game,
    Licenses,
    Menu,
    Story,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: styles.cardStyle,
  },
);

import { createAppContainer } from 'react-navigation';

export default createAppContainer(ModalStack);
