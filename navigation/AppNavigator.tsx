import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import Home from '../screens/HomeScreen';
import Licenses from '../screens/LicensesScreen';
import Menu from '../screens/MenuScreen';
import Story from '../screens/StoryScreen';

// import Game from '../screens/GameScreen';
const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: 'transparent',
  },
});

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" initialRouteName="Home" screenOptions={{ headerShown: false, cardStyle: styles.cardStyle }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Licenses" component={Licenses} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Story" component={Story} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

