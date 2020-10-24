import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Avatar, Button, Icon, ListItem} from 'react-native-elements';
import {themeVars} from '../styles/variables';

const Downloads = () => {
  const data = [
    {
      id: '123232',
      path: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
    },
    {
      id: '133232',
      path: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
    },
    {
      id: '124232',
      path: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
    },
    {
      id: '1232532',
      path: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
    },
    {
      id: '123632',
      path: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
    },
    {
      id: '12320532',
      path: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
    },
    {
      id: '123932',
      path: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
    },
    {
      id: '1232732',
      path: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
    },
    {
      id: '127632',
      path: '',
      name: 'Name',
      description: 'This screen shows the list of all the Events ',
    },
  ];
  return (
    <>
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
        name="download-off"
        type="material-community"
        size={150}
        color={'lightgrey'}
      />
      <Text style={styles.emptyTxt}>No downloads available!</Text>
    </View>
  );
};
const Item = ({item, index}) => (
  <ListItem bottomDivider>
    <ListItem.Content>
      <ListItem.Title numberOfLines={1}>{item.name}</ListItem.Title>
      <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
    </ListItem.Content>
    <Button
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
