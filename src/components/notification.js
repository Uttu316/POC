import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Avatar, Button, Icon, ListItem} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {
  addNotificationData,
  addVisibleNotificationData,
} from '../redux/actions/main-action';
import {themeVars} from '../styles/variables';
import moment from 'moment';

const Notification = () => {
  const dispatch = useDispatch();
  const [isChanging, toggle] = useState(false);
  let data = useSelector((state) => state.main.notificationData);
  let visibleNotifications = useSelector(
    (state) => state.main.visibleNotifications,
  );
  const totalCount = data.length;

  function onAction(item, index) {
    let newNotificationData = data;
    newNotificationData[index] = {
      ...newNotificationData[index],
      status: 'attending',
    };
    toggle(!isChanging);
    dispatch(addNotificationData(newNotificationData));
    dispatch(addVisibleNotificationData(null));
  }

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
        renderItem={(props) => (
          <Item
            {...props}
            onAction={onAction}
            visibleNotifications={visibleNotifications}
          />
        )}
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
const Item = ({item, onAction, visibleNotifications, index}) => (
  <ListItem
    bottomDivider
    containerStyle={{
      backgroundColor:
        visibleNotifications === item.id ? 'rgba(0,255,0,0.3)' : 'white',
    }}>
    <Avatar
      source={{uri: item.image}}
      icon={{type: 'material', name: 'person', size: 28}}
      avatarStyle={{borderRadius: 150}}
      placeholderStyle={styles.avatarIcon}
    />
    <ListItem.Content>
      <ListItem.Title numberOfLines={1}>{item.name}</ListItem.Title>
      <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
    </ListItem.Content>
    <View style={styles.listRightContainer}>
      <Text style={styles.timeTxt}>starts {moment(item.time).fromNow()} </Text>
      <TouchableOpacity
        onPress={() => {
          if (item.status === 'upcoming') {
            onAction(item, index);
          }
        }}
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
