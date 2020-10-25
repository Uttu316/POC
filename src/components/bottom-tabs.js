import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {resetValues} from '../redux/actions/main-action';
import {styles} from '../styles/home-styles';
import {themeVars} from '../styles/variables';

const BottomTabs = ({currentTab, navigation, setTab}) => {
  const [isLogout, selectLogOut] = useState(false);
  const dispatch = useDispatch();

  function onLogout() {
    selectLogOut(true);
    Alert.alert('Logout', 'Do you really want to logout?', [
      {
        text: 'OK',
        onPress: () => {
          navigation.replace('login');
          dispatch(resetValues());
        },
      },
      {
        text: 'Cancel',
        onPress: () => selectLogOut(false),
        style: 'cancel',
      },
    ]);
  }
  return (
    <View style={styles.tabsContainer}>
      <Button
        onPress={() => setTab('notification')}
        titleStyle={[
          styles.tabTxt,
          {
            color: currentTab === 'notification' ? themeVars.blueIcon : 'grey',
          },
        ]}
        buttonStyle={styles.btnClr}
        containerStyle={styles.tabContainer}
        icon={
          <Icon
            name={currentTab === 'notification' ? 'bell' : 'bell-outline'}
            type="material-community"
            size={24}
            color={currentTab === 'notification' ? themeVars.blueIcon : 'grey'}
          />
        }
        title={'Notifcation'}
      />
      <View style={styles.vLine} />
      <Button
        onPress={() => setTab('downloads')}
        titleStyle={[
          styles.tabTxt,
          {color: currentTab === 'downloads' ? themeVars.blueIcon : 'grey'},
        ]}
        buttonStyle={styles.btnClr}
        containerStyle={[styles.tabContainer]}
        title="Downloads"
        icon={
          <Icon
            name={currentTab === 'downloads' ? 'download' : 'download-outline'}
            type="material-community"
            size={24}
            color={currentTab === 'downloads' ? themeVars.blueIcon : 'grey'}
          />
        }
      />
      <View style={styles.vLine} />
      <Button
        onPress={() => onLogout()}
        buttonStyle={styles.btnClr}
        containerStyle={styles.tabContainer}
        titleStyle={[
          styles.tabTxt,
          {color: isLogout ? themeVars.blueIcon : 'grey'},
        ]}
        title={'Logout'}
        icon={
          <Icon
            name={'logout'}
            type="material"
            size={24}
            color={isLogout ? themeVars.blueIcon : 'grey'}
          />
        }
      />
    </View>
  );
};

export default BottomTabs;
