import GameScreen from '../screens/GameScreen';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LicensesScreen from '../screens/LicensesScreen';
import MenuScreen from '../screens/MenuScreen';
import StoryScreen from '../screens/StoryScreen';

const ModalStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Game: {
      screen: GameScreen,
    },
    Licenses: {
      screen: LicensesScreen,
    },
    Menu: {
      screen: MenuScreen,
    },
    Story: {
      screen: StoryScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
    },
  },
);

export default ModalStack;
