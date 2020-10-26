import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Button, Icon, ListItem} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import {themeVars} from '../styles/variables';
import DropDownPicker from 'react-native-dropdown-picker';

import MapView, {Marker} from 'react-native-maps';
import {PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNotificationData,
  getEventsData,
  setDownloadsData,
} from '../redux/actions/main-action';
import moment from 'moment';
import {showToastWithGravity} from '../apis/api';
import {playVideo, requestStoragePermission} from '../utils/utils';

const Events = ({fetchEvents, page, setPage}) => {
  const _map = useRef(null);
  const [checking, toggleChecking] = useState(false);
  const [searchValues, setSeachValues] = useState({
    name: '',
    postcode: '',
  });
  const [types, setTypes] = useState(null);
  const [items, setItems] = useState([
    {label: 'Football', value: 'football'},
    {
      label: 'Tennis',
      value: 'tennis',
    },
  ]);
  const dispatch = useDispatch();
  const apiStatus = useSelector((state) => state.main.eventApiStatus);
  const eventsData = useSelector((state) => state.main.eventsData);
  const notificationData = useSelector((state) => state.main.notificationData);
  const downloadData = useSelector((state) => state.main.downloadData);
  const data = eventsData.events;
  const locations = eventsData.locations;

  useEffect(() => {
    if (_map.current) {
      _map.current.fitToSuppliedMarkers(locations.map(({user_id}) => user_id));
    }
  }, []);

  function onSearch() {
    fetchEvents(page, searchValues.name, types, searchValues.postcode);
  }

  async function download(item, index) {
    let newData = data;
    newData[index] = {...newData[index], isDownLoading: true};
    dispatch(getEventsData({...eventsData, events: newData}));

    let hasPermission = await requestStoragePermission();

    if (!hasPermission) {
      requestStoragePermission();
      newData[index] = {...newData[index], isDownLoading: false};
      dispatch(getEventsData({...eventsData, events: newData}));
      return false;
    }

    var url = item.url;
    var ext = url.split('.').pop();
    const {config, fs} = RNFetchBlob;
    let VideoDir = fs.dirs.SDCardDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: VideoDir + '/POC/' + item.id + '.' + ext,
        description: 'Video',
      },
    };
    config(options)
      .fetch('GET', url)
      .then((res) => {
        newData[index] = {
          ...newData[index],
          isDownLoading: false,
          isDownloaded: true,
        };
        dispatch(setDownloadsData([...downloadData, newData[index]]));
        dispatch(getEventsData({...eventsData, events: newData}));

        showToastWithGravity('Video downloaded');
      })
      .catch((err) => {
        newData[index] = {...newData[index], isDownLoading: false};
        dispatch(getEventsData({...eventsData, events: newData}));
        showToastWithGravity('Something went wrong!');
      });
  }

  function onNotifyMe(item, index) {
    let newData = data;
    newData[index] = {...newData[index], isReserved: true};
    dispatch(getEventsData({...eventsData, events: newData}));

    let newNotificationData = [
      {...item, status: 'upcoming'},
      ...notificationData,
    ];

    dispatch(addNotificationData(newNotificationData));
  }

  return (
    <>
      <View style={styles.mapViewContainer}>
        <MapView
          showsUserLocation={true}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          ref={_map}>
          {locations.map((marker) => (
            <Marker
              key={marker.user_id}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lng,
              }}
              title={marker.title}
            />
          ))}
        </MapView>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formLeftContaner}>
          <TextInput
            placeholder="Name"
            value={searchValues.name}
            onChangeText={(text) =>
              setSeachValues({...searchValues, name: text})
            }
            style={[styles.input, {marginBottom: 5}]}
          />
          <TextInput
            value={searchValues.postcode}
            onChangeText={(text) =>
              setSeachValues({...searchValues, postcode: text})
            }
            placeholder="Postcode"
            style={styles.input}
          />
        </View>
        <View style={styles.formRightContanier}>
          <DropDownPicker
            items={items}
            placeholder="Types"
            defaultValue={types}
            onChangeItem={(item) => setTypes(item.value)}
          />
          <Button
            title="Search"
            containerStyle={{marginTop: 5}}
            onPress={() => onSearch()}
          />
        </View>
      </View>
      {apiStatus !== 'loading' && (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={data}
          ListEmptyComponent={() => <EmptyContainer />}
          renderItem={(props) => (
            <Item
              {...props}
              download={download}
              playVideo={playVideo}
              onNotifyMe={onNotifyMe}
            />
          )}
        />
      )}
      {apiStatus === 'loading' && (
        <ActivityIndicator
          color={themeVars.blueIcon}
          size={32}
          style={{marginVertical: 20, alignSelf: 'center'}}
        />
      )}
    </>
  );
};
const ErrorContainer = () => {
  return (
    <View style={styles.emptyContainer}>
      <Icon
        name="map-marker-off"
        type="material-community"
        size={150}
        color={'lightgrey'}
      />
      <Text style={styles.emptyTxt}>No Events available!</Text>
    </View>
  );
};
const EmptyContainer = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTxt, {fontSize: 16, fontWeight: 'bold'}]}>
        No Events available!
      </Text>
    </View>
  );
};
const Item = ({item, onNotifyMe, download, playVideo, index}) => (
  <ListItem bottomDivider>
    <Avatar
      source={{uri: item.image}}
      avatarStyle={{borderRadius: 150}}
      icon={{type: 'material', name: 'person', size: 28}}
      placeholderStyle={styles.avatarIcon}
    />
    <ListItem.Content>
      <ListItem.Title numberOfLines={1}>{item.name}</ListItem.Title>
      <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
    </ListItem.Content>
    {!item.isDownLoading && (
      <Button
        containerStyle={styles.button}
        buttonStyle={styles.btnIcn}
        icon={{
          type: item.isDownloaded ? 'material' : 'material-community',
          name: item.isDownloaded ? 'play-circle-outline' : 'download-outline',
          color: themeVars.blueIcon,
          size: 32,
        }}
        onPress={() => {
          if (!item.isDownloaded) {
            download(item, index);
          } else {
            playVideo(item);
          }
        }}
      />
    )}
    {item.isDownLoading && (
      <ActivityIndicator color={themeVars.blueIcon} size={32} />
    )}
    <View style={styles.listRightContainer}>
      <Text style={styles.timeTxt}>at {item.time} </Text>

      <TouchableOpacity
        onPress={() => {
          if (!item.isReserved) {
            onNotifyMe(item, index);
          }
        }}
        style={[
          styles.rightBtn,
          {
            backgroundColor: item.isReserved
              ? themeVars.greenClr
              : themeVars.blueIcon,
          },
        ]}
        activeOpacity={0.9}>
        <Text style={[styles.rightBtnTxt]}>
          {!item.isReserved ? 'Notify me' : 'Reserved'}
        </Text>
      </TouchableOpacity>
    </View>
  </ListItem>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  totalTxt: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
  },
  avatarIcon: {
    backgroundColor: 'lightgrey',
    borderRadius: 150,
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyTxt: {
    color: 'grey',
    marginTop: 30,
  },
  btn: {
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  listRightContainer: {
    alignItems: 'center',
  },
  timeTxt: {
    fontSize: 12,
    color: 'black',

    textAlign: 'center',
  },
  rightBtn: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginTop: 5,
    backgroundColor: themeVars.blueIcon,
    borderRadius: 4,
  },
  rightBtnTxt: {
    color: 'white',
  },
  button: {},
  btnIcn: {
    backgroundColor: 'white',
    paddingHorizontal: 0,
  },
  mapViewContainer: {
    height: 250,
  },
  map: {
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  formLeftContaner: {
    flex: 7,
  },
  formRightContanier: {
    flex: 5,
    marginLeft: 5,
  },

  input: {
    backgroundColor: 'white',
    fontSize: 14,
    margin: 0,
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  inputText: {},
});

export default Events;
