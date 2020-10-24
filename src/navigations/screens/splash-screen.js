import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {styles} from '../../styles/splash-styles';

const SplashScreen = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.mainContainer}>
        <Text>Hell</Text>
      </View>
    </>
  );
};

export default SplashScreen;
