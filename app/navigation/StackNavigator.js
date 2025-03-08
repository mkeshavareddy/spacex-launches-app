// app/navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LaunchListScreen from '../screens/LaunchListScreen';
import LaunchDetailsScreen from '../screens/LaunchDetailsScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LaunchList">
        <Stack.Screen name="LaunchList" component={LaunchListScreen} />
        <Stack.Screen name="LaunchDetails" component={LaunchDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
