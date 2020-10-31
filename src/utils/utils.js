import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {showToastWithGravity} from '../apis/api';
import FileViewer from 'react-native-file-viewer';
import PushNotification from 'react-native-push-notification';

export async function requestStoragePermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    return granted;
  } catch (err) {
    return false;
  }
}
export function playVideo(item) {
  var url = item.url;
  var ext = url.split('.').pop();
  const {fs} = RNFetchBlob;
  let VideoDir = fs.dirs.DownloadDir;
  const path = VideoDir + '/POC/' + item.id + '.' + ext;
  FileViewer.open(path)
    .then(() => {
      // success
    })
    .catch((error) => {
      showToastWithGravity('Something went wrong!');
    });
}

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  const paddingToBottom = 20;

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export function check(item, data) {
  let isPresent = data.find((each) => each.id === item.Id);

  if (isPresent) {
    return true;
  }
  return false;
}

export const testPushNotification = (title, message, time, id) => {
  PushNotification.localNotificationSchedule({
    channelId: 'channel-id',
    title: title, // (optional)
    message: message, // (required)
    date: time,
    messageId: id,
    allowWhileIdle: true,
  });
};
export function __init_push() {
  PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
}
