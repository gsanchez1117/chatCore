import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Colors from '../constants/Colors';

//Icon names can be found at: https://infinitered.github.io/ionicons-version-3-search/?
import TabBarIcon from '../components/TabBarIcon';

//screen imports
import HomeScreen from '../screens/HomeScreen';
import LocationScreen from '../screens/LocationScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen';


/*********************
 * Home Screen Stack *
 *********************/

const HomeScreenStack = createStackNavigator({
  Home: HomeScreen,
});

HomeScreenStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
      selectedColor={Colors.GS_Color_Main_4}
    />
  ),
};

/*************************
 * Location Screen Stack *
 *************************/

const LocationScreenStack = createStackNavigator({
  Location: LocationScreen,
});

LocationScreenStack.navigationOptions = {
  tabBarLabel: 'Location',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-compass${focused ? '' : '-outline'}` : 'md-compass'}
      selectedColor={Colors.GS_Color_Main_3}
    />
  ),
};

/************************
 * Friends Screen Stack *
 ************************/

const FriendsScreenStack = createStackNavigator({
  Friends: FriendsScreen,
});

FriendsScreenStack.navigationOptions = {
  tabBarLabel: 'Friends',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-contacts${focused ? '' : '-outline'}` : 'md-contacts'}
      selectedColor={Colors.GS_Color_Main_2}
    />
  ),
};

/************************
 * Profile Screen Stack *
 ************************/

const ProfileScreenStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileScreenStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-contact${focused ? '' : '-outline'}` : 'md-contact'}
      selectedColor={Colors.GS_Color_Main_1}
    />
  ),
};

/**********************
 * Main Tab Navigator *
 **********************/

export default createBottomTabNavigator({
  HomeScreenStack,
  LocationScreenStack,
  FriendsScreenStack,
  ProfileScreenStack,
}, {
  tabBarOptions: {
    activeTintColor: Colors.GS_Color_Contrast_4,
    inactiveTintColor: Colors.GS_Color_Contrast_4,
},
});
