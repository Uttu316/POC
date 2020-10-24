import React from 'react';
import {View, Text, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../../redux/actions/main-action';
import {styles} from '../../styles/login-styles';
import {themeVars} from '../../styles/variables';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  function onLogin() {
    dispatch(setToken('token'));
    navigation.replace('home');
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
          <View style={styles.formContainer}>
            <Text style={styles.content}>Sign In</Text>

            <Input
              placeholder="Email"
              leftIcon={{type: 'material', name: 'email'}}
              style={styles.input}
              inputStyle={styles.inputtxt}
            />
            <Input
              secureTextEntry={true}
              placeholder="Password"
              leftIcon={{type: 'material', name: 'lock'}}
              style={styles.input}
              inputStyle={styles.inputtxt}
            />
          </View>
          <Button
            title="Login"
            buttonStyle={styles.btn}
            onPress={() => onLogin()}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
