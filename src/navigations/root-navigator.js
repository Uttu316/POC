import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import SplashScreen from './screens/splash-screen';

const Stack = createStackNavigator();

const RootNavigator = (props) => {
  const token = useSelector((state) => state.main.token);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={SplashScreen}
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