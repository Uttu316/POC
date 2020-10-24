import React, {useState} from 'react';
import {View, Text, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import BottomTabs from '../../components/bottom-tabs';
import Downloads from '../../components/download';
import Events from '../../components/events';
import Home from '../../components/home';
import Notification from '../../components/notification';
import TopTabs from '../../components/top-tabs';
import {styles} from '../../styles/home-styles';

const HomeScreen = ({navigation}) => {
  const [currentTab, setTab] = useState('home');

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView style={styles.mainContainer}>
        <TopTabs
          currentTab={currentTab}
          setTab={(selectedTab) => setTab(selectedTab)}
        />
        <ScrollView
          style={styles.mainWrapper}
          showsVerticalScrollIndicator={false}>
          {currentTab === 'home' && <Home />}
          {currentTab === 'notification' && <Notification />}
          {currentTab === 'downloads' && <Downloads />}
          {currentTab === 'events' && <Events />}
        </ScrollView>
        <BottomTabs
          currentTab={currentTab}
          setTab={(selectedTab) => setTab(selectedTab)}
        />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
