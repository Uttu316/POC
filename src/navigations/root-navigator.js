import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import SplashScreen from './screens/splash-screen';
import LoginScreen from './screens/login-screen';
import HomeScreen from './screens/home-screen';
import {ConfigPush} from '../utils/notificationHandler';

const Stack = createStackNavigator();

const RootNavigator = (props) => {
  const token = useSelector((state) => state.main.token);

  return (
    <NavigationContainer>
      <ConfigPush />
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{
            animationEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            animationEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            animationEnabled: false,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
