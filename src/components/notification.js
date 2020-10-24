import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Avatar, Button, Icon, ListItem} from 'react-native-elements';
import {themeVars} from '../styles/variables';

const Notification = () => {
  const totalCount = 2;
  const data = [
    {
      id: '123232',
      image:
        'https://cdn3.iconfinder.com/data/icons/ballicons-reloaded-free/512/icon-68-128.png',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 min',
      status: 'upcoming',
    },
    {
      id: '133232',
      image: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 min',
      status: 'upcoming',
    },
    {
      id: '124232',
      image: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 min',
      status: 'attending',
    },
    {
      id: '1232532',
      image: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 min',
      status: 'upcoming',
    },
    {
      id: '123632',
      image: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 min',
      status: 'upcoming',
    },
    {
      id: '12320532',
      image: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 min',
      status: 'upcoming',
    },
    {
      id: '123932',
      image: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 min',
      status: 'upcoming',
    },
    {
      id: '1232732',
      image: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 min',
      status: 'upcoming',
    },
    {
      id: '127632',
      image: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
      time: '05:12 min',
      status: 'attended',
    },
  ];
  return (
    <>
      {data && data.length > 0 && (
        <Text style={styles.totalTxt}>
          Total Events attended: {' ' + totalCount}
        </Text>
      )}
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data}
        ListEmptyComponent={() => <EmptyContainer />}
        renderItem={(props) => <Item {...props} />}
      />
    </>
  );
};
const EmptyContainer = () => {
  return (
    <View style={styles.emptyContainer}>
      <Icon
        name="bell-alert"
        type="material-community"
        size={150}
        color={'lightgrey'}
      />
      <Text style={styles.emptyTxt}>No notificaton available!</Text>
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
    <View style={styles.listRightContainer}>
      <Text style={styles.timeTxt}>starts in {item.time} </Text>
      <TouchableOpacity
        style={[
          styles.rightBtn,
          {
            backgroundColor:
              item.status == 'attending'
                ? themeVars.greenClr
                : item.status == 'upcoming'
                ? themeVars.blueIcon
                : 'lightgrey',
          },
        ]}
        activeOpacity={0.9}>
        <Text
          style={[
            styles.rightBtnTxt,
            {
              color:
                item.status == 'upcoming' || item.status == 'attending'
                  ? 'white'
                  : 'black',
            },
          ]}>
          {item.status == 'upcoming'
            ? 'Attending?'
            : item.status == 'attending'
            ? 'Attending!!!'
            : item.status == 'attended'
            ? 'Attended'
            : 'Not attented'}
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
    maxWidth: 70,

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
});

export default Notification;
