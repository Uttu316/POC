import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Button, Icon, ListItem} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {setDownloadsData} from '../redux/actions/main-action';
import {themeVars} from '../styles/variables';
import {playVideo, requestStoragePermission} from '../utils/utils';

const Downloads = () => {
  const dispatch = useDispatch();
  const downloadData = useSelector((state) => state.main.downloadData);

  const [isLoading, setLoading] = useState('');

  useEffect(() => {
    checkDownloads();
  }, []);
  async function checkDownloads() {
    setLoading('loading');
    let downloads = [];
    let count = 0;

    if (downloadData.length === 0) {
      setLoading('done');
      return;
    }
    downloadData.forEach(async (item) => {
      var url = item.url;
      var ext = url.split('.').pop();
      const {fs} = RNFetchBlob;
      let VideoDir = fs.dirs.DownloadDir;
      let hasPermission = await requestStoragePermission();

      if (!hasPermission) {
        requestStoragePermission();
        return false;
      }

      RNFetchBlob.fs
        .exists(VideoDir + '/POC/' + item.id + '.' + ext)
        .then((exists) => {
          if (exists) {
            downloads.push(item);
          }
          count += 1;
          if (count === downloadData.length) {
            dispatch(setDownloadsData(downloads));
            setLoading('done');
          }
        })
        .catch((err) => {
          console.log(err, 'checking error');
          setLoading('error');
        });
    });
  }

  return (
    <>
      {isLoading === 'done' && (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={downloadData}
          ListEmptyComponent={() => <EmptyContainer />}
          renderItem={(props) => <Item {...props} playVideo={playVideo} />}
        />
      )}
      {isLoading === 'loading' && (
        <ActivityIndicator
          color={themeVars.blueIcon}
          size={32}
          style={{marginVertical: 20, alignSelf: 'center'}}
        />
      )}
    </>
  );
};
const EmptyContainer = () => {
  return (
    <View style={styles.emptyContainer}>
      <Icon
        name="download-off"
        type="material-community"
        size={150}
        color={'lightgrey'}
      />
      <Text style={styles.emptyTxt}>No downloads available!</Text>
    </View>
  );
};
const Item = ({item, playVideo, index}) => (
  <ListItem bottomDivider>
    <ListItem.Content>
      <ListItem.Title numberOfLines={1}>{item.name}</ListItem.Title>
      <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
    </ListItem.Content>
    <Button
      onPress={() => playVideo(item)}
      containerStyle={styles.button}
      buttonStyle={styles.btnIcn}
      icon={{
        type: 'material',
        name: 'play-circle-outline',
        color: themeVars.blueIcon,
        size: 32,
      }}
    />
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
    fontSize: 14,
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
  button: {},
  btnIcn: {
    backgroundColor: 'white',
  },
});

export default Downloads;
