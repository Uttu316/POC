import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
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
import {themeVars} from '../../styles/variables';
import {requestStoragePermission} from '../../utils/utils';

const HomeScreen = ({navigation}) => {
  const [refreshing] = useState(false);

  const [currentTab, setTab] = useState('home');
  const events = useSelector((state) => state.main.eventsData.events);
  const notificationData = useSelector((state) => state.main.notificationData);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEvents(page, '', '', '');
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
            isDownloaded: false,
            isDownLoading: false,
            name: item.Title,
            description: item.Description,
            time: item.EventStartTime,
            isReserved: checkisReserved(item),
          });
        });
        const apiData = {
          events: newEvents,
          locations: res.locations,
        };

        dispatch(getEventsData(apiData));
        checkFiles(apiData);
        dispatch(setEventAPIStatus('done'));
      })
      .catch((err) => {
        console.log(err);

        const apiData = {
          events: [],
          locations: [],
        };

        dispatch(getEventsData(apiData));
        dispatch(setEventAPIStatus('error'));
        showToastWithGravity('Unable to fetch events');
      });
  }

  function checkisReserved(item) {
    let isReserved = notificationData.find((each) => each.id === item.Id);

    if (isReserved) {
      return true;
    }
    return false;
  }

  async function checkIsDownloaded(data, item, index) {
    var url = item.url;
    var ext = url.split('.').pop();
    const {fs} = RNFetchBlob;
    let VideoDir = fs.dirs.SDCardDir;
    let hasPermission = await requestStoragePermission();

    if (!hasPermission) {
      requestStoragePermission();
      return false;
    }

    RNFetchBlob.fs
      .exists(VideoDir + '/POC/' + item.id + '.' + ext)
      .then((exists) => {
        let newData = data.events;
        newData[index] = {...newData[index], isDownloaded: exists};
        dispatch(getEventsData({...data, events: newData}));
      })
      .catch((err) => {
        console.log(err, 'checking error');
      });
  }

  function checkFiles(data) {
    data.events.map((item, index) => {
      checkIsDownloaded(data, item, index);
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
          refreshControl={
            currentTab === 'events' && (
              <RefreshControl
                colors={[themeVars.blueIcon]}
                tintColor={[themeVars.blueIcon]}
                refreshing={refreshing}
                onRefresh={() => {
                  fetchEvents();
                }}
              />
            )
          }
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
