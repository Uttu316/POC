import React, {useState} from 'react';
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

import {themeVars} from '../styles/variables';
import DropDownPicker from 'react-native-dropdown-picker';

const Events = () => {
  const [types, setTypes] = useState(null);
  const [items, setItems] = useState([{label: 'A-type', value: 'a'}]);
  const data = [
    {
      id: '123232',
      image:
        'https://cdn3.iconfinder.com/data/icons/ballicons-reloaded-free/512/icon-68-128.png',
      url: '',
      isDownloaded: true,
      isDownLoading: false,
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 PM',
      isReserved: false,
    },
    {
      id: '133232',
      image: '',
      url: '',
      isDownloaded: false,
      isDownLoading: false,
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 PM',
      isReserved: false,
    },
    {
      id: '124232',
      image: '',
      url: '',
      isDownloaded: false,
      isDownLoading: false,
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 PM',
      isReserved: false,
    },
    {
      id: '1232532',
      image: '',
      url: '',
      isDownloaded: false,
      isDownLoading: false,
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 PM',
      isReserved: true,
    },
    {
      id: '123632',
      image: '',
      url: '',
      isDownloaded: false,
      isDownLoading: false,
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 PM',
      isReserved: false,
    },
    {
      id: '12320532',
      image: '',
      url: '',
      isDownloaded: true,
      isDownLoading: false,
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 PM',
      isReserved: false,
    },
    {
      id: '123932',
      image: '',
      url: '',
      isDownloaded: false,

      isDownLoading: false,
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 PM',
      isReserved: false,
    },
    {
      id: '1232732',
      image: '',
      url: '',
      isDownloaded: false,
      isDownLoading: false,
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 PM',
      isReserved: false,
    },
    {
      id: '127632',
      image: '',
      url: '',
      isDownloaded: false,
      isDownLoading: false,
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 PM',
      isReserved: true,
    },
  ];
  return (
    <>
      <View style={styles.mapViewContainer}>{/* Map View */}</View>
      <View style={styles.formContainer}>
        <View style={styles.formLeftContaner}>
          <TextInput
            placeholder="Name"
            style={[styles.input, {marginBottom: 5}]}
          />
          <TextInput placeholder="Place" style={styles.input} />
        </View>
        <View style={styles.formRightContanier}>
          <DropDownPicker
            items={items}
            placeholder="Types"
            defaultValue={types}
          />
          <Button title="Search" containerStyle={{marginTop: 5}} />
        </View>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data}
        ListEmptyComponent={() => <EmptyContainer />}
        renderItem={(props) => <Item {...props} />}
      />
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
const Item = ({item, index}) => (
  <ListItem bottomDivider>
    <Avatar
      source={{uri: item.image}}
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
      />
    )}
    {item.isDownLoading && (
      <ActivityIndicator color={themeVars.blueIcon} size={32} />
    )}
    <View style={styles.listRightContainer}>
      <Text style={styles.timeTxt}>at {item.time} </Text>

      <TouchableOpacity
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
    backgroundColor: 'lightgrey',
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
