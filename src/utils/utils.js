import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {showToastWithGravity} from '../apis/api';
import FileViewer from 'react-native-file-viewer';

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
  let VideoDir = fs.dirs.SDCardDir;
  const path = VideoDir + '/POC/' + item.id + '.' + ext;
  FileViewer.open(path)
    .then(() => {
      // success
    })
    .catch((error) => {
      showToastWithGravity('Something went wrong!');
    });
}