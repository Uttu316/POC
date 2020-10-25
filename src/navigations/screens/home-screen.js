import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {apiCall, showToastWithGravity} from '../../apis/api';
import BottomTabs from '../../components/bottom-tabs';
import Downloads from '../../components/download';
import Events from '../../components/events';
import Home from '../../components/home';
import Notification from '../../components/notification';
import TopTabs from '../../components/top-tabs';
import {
  getEventsData,
  setEventAPIStatus,
} from '../../redux/actions/main-action';
import {styles} from '../../styles/home-styles';

const HomeScreen = ({navigation}) => {
  const [currentTab, setTab] = useState('home');
  const events = useSelector((state) => state.main.eventsData.events);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchEvents(1, '', '', '');
  }, []);

  function fetchEvents(pageNo, name, type, postcode) {
    dispatch(setEventAPIStatus('loading'));
    const data = {
      pageNo,
      name,
      type,
      postcode,
    };
    apiCall(data)
      .then((res) => {
        let newEvents = [];

        res.events.forEach((item) => {
          newEvents.push({
            id: item.Id,
            image: item.Thumb,
            url: item.FileUri,
            isDownloaded: true,
            isDownLoading: false,
            name: item.Title,
            description: item.Description,
            time: item.EventStartTime,
            isReserved: false,
          });
        });
        const apiData = {
          events: newEvents,
          locations: res.locations,
        };

        dispatch(getEventsData(apiData));
        dispatch(setEventAPIStatus('done'));
      })
      .catch((err) => {
        console.log(err);
        showToastWithGravity('Not able to fetch events');
        dispatch(setEventAPIStatus('error'));
      });
  }
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
          {currentTab === 'events' && (
            <Events
              fetchEvents={fetchEvents}
              page={page}
              setPage={(page) => setPage(page)}
            />
          )}
        </ScrollView>
        <BottomTabs
          currentTab={currentTab}
          navigation={navigation}
          setTab={(selectedTab) => setTab(selectedTab)}
        />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
