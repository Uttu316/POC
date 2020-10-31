import {useNavigation} from '@react-navigation/native';
import React from 'react';
import PushNotification from 'react-native-push-notification';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeCurrentTab,
  addVisibleNotificationData,
} from '../redux/actions/main-action';

export const ConfigPush = (props) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  let notificationData = useSelector((state) => state.main.notificationData);
  let visibleNotifications = useSelector(
    (state) => state.main.visibleNotifications,
  );

  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      // navigation.navigate('home');

      dispatch(changeCurrentTab('notification'));
      //   const savedNotificationdata = notificationData.find(
      //     (item) => item.id === notification.messageId,
      //   );
      //   let newVisibleNotifications = [
      //     savedNotificationdata,
      //     ...visibleNotifications,
      //   ];
      dispatch(addVisibleNotificationData(notification.messageId));
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: Platform.OS == 'ios',
  });

  return null;
};
