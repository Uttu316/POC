import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {styles} from '../styles/home-styles';
import {themeVars} from '../styles/variables';

const TopTabs = ({currentTab, setTab}) => {
  return (
    <View style={styles.tabsContainer}>
      <Button
        onPress={() => setTab('home')}
        titleStyle={[
          styles.tabTxt,
          {
            color: currentTab === 'home' ? themeVars.blueIcon : 'grey',
          },
        ]}
        buttonStyle={styles.btnClr}
        containerStyle={styles.tabContainer}
        icon={
          <Icon
            name={currentTab === 'home' ? 'home' : 'home-outline'}
            type="material-community"
            size={24}
            color={currentTab === 'home' ? themeVars.blueIcon : 'grey'}
          />
        }
        title={'Home'}
      />
      <View style={styles.vLine} />
      <Button
        onPress={() => setTab('events')}
        titleStyle={[
          styles.tabTxt,
          {color: currentTab === 'events' ? themeVars.blueIcon : 'grey'},
        ]}
        buttonStyle={styles.btnClr}
        containerStyle={[styles.tabContainer]}
        title="Events"
        icon={
          <Icon
            name={currentTab === 'events' ? 'map-marker' : 'map-marker-outline'}
            type="material-community"
            size={24}
            color={currentTab === 'events' ? themeVars.blueIcon : 'grey'}
          />
        }
      />
    </View>
  );
};

export default TopTabs;
