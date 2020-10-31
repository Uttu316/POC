import React, {useEffect, useState} from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {apiCall, showToastWithGravity} from '../../apis/api';
import BottomTabs from '../../components/bottom-tabs';
import Downloads from '../../components/download';
import Events from '../../components/events';
import Home from '../../components/home';
import Notification from '../../components/notification';
import TopTabs from '../../components/top-tabs';
import {
  changeCurrentTab,
  getEventsData,
  setEventAPIStatus,
  testPushNotification,
} from '../../redux/actions/main-action';
import {styles} from '../../styles/home-styles';
import {check} from '../../utils/utils';

const HomeScreen = ({navigation}) => {
  const currentTab = useSelector((state) => state.main.currentTab);
  const eventsData = useSelector((state) => state.main.eventsData);
  const {events, locations} = eventsData;
  const downloadData = useSelector((state) => state.main.downloadData);

  const notificationData = useSelector((state) => state.main.notificationData);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEvents(1, '', '', '');
  }, []);

  function fetchEvents(pageNo, name, type, postcode, callback) {
    dispatch(setEventAPIStatus('loading'));
    const data = {
      pageNo,
      name,
      type,
      postcode,
    };
    apiCall(data)
      .then((res) => {
        let newEvents = events;
        let newLocations = res.locations;
        res.events.forEach((item) => {
          newEvents.push({
            id: item.Id,
            image: item.Thumb,
            url: item.FileUri,
            isDownloaded: check(item, downloadData),
            isDownLoading: false,
            name: item.Title,
            description: item.Description,
            time: item.EventStartTime,
            isReserved: check(item, notificationData),
          });
        });

        const apiData = {
          events: newEvents,
          locations: newLocations,
        };

        dispatch(getEventsData(apiData));

        if (callback) {
          callback('done');
        }
        dispatch(setEventAPIStatus('done'));
      })
      .catch((err) => {
        console.log(err);

        const apiData = {
          events: [],
          locations: [],
        };

        dispatch(getEventsData(apiData));
        if (callback) {
          callback('error');
        }
        dispatch(setEventAPIStatus('error'));
        showToastWithGravity('Unable to fetch events');
      });
  }
  function setTab(selectedTab) {
    dispatch(changeCurrentTab(selectedTab));
  }

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView style={styles.mainContainer}>
        <TopTabs
          currentTab={currentTab}
          setTab={(selectedTab) => setTab(selectedTab)}
        />
        <View style={styles.mainWrapper}>
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
        </View>
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
