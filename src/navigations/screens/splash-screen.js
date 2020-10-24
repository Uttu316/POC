import React from 'react';
import {View, Text, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import {Button, Image, Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {styles} from '../../styles/splash-styles';
import {themeVars} from '../../styles/variables';

const SplashScreen = ({navigation}) => {
  const token = useSelector((state) => state.main.token);

  function onLetStarted() {
    if (token) {
      navigation.navigate('home');
    } else {
      navigation.navigate('login');
    }
  }
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.contentWrapper}>
          <View style={styles.logoContainer}>
            <Icon
              name="dingding"
              type="antdesign"
              size={100}
              color={themeVars.blueIcon}
              style={styles.appIcon}
            />
            <Text style={styles.logoText}>Micro POC</Text>
          </View>
          <Text style={styles.content}>
            This is a simple Micro POC built in React Native for Android and
            iPhone
          </Text>
          <Button
            title="Let's Start"
            buttonStyle={styles.btn}
            onPress={() => onLetStarted()}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default SplashScreen;
