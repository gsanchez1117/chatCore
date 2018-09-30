import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen'
import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator({ LoginScreen: LoginScreen });

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html

  //Authentication Screens stack
  Auth: AuthStack,

  //Main App Screens Stack
  Main: MainTabNavigator,
}, {
  //Authentication Screen is the initial screen to show.
  initialRouteName: 'Auth'
});