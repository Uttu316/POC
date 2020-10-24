import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getSubscription} from '../redux/actions/main-action';
import {themeVars} from '../styles/variables';

const Home = () => {
  const isSubscribed = useSelector((state) => state.main.isSubscribed);
  const dispatch = useDispatch();
  function onBuySubscription() {
    dispatch(getSubscription(!isSubscribed));
  }
  return (
    <View style={styles.container}>
      <Avatar
        source={{
          uri:
            'https://cdn3.iconfinder.com/data/icons/ballicons-reloaded-free/512/icon-68-128.png',
        }}
        icon={{
          type: 'material-community',
          name: isSubscribed ? 'credit-card-check' : 'credit-card',
          size: 150,
          color: 'lightgrey',
        }}
        size="xlarge"
        placeholderStyle={styles.imagePlaceholder}
        containerStyle={styles.image}
      />
      <Text style={styles.contentHeading}>Entertainment Pass</Text>
      <Text style={styles.contentFree}>Free 7 days trial</Text>
      <Text style={styles.contentPrice}>$10/month</Text>
      <Button
        raised
        disabled={isSubscribed}
        title={!isSubscribed ? 'Buy Subscription' : "You've already Subscribed"}
        containerStyle={styles.button}
        buttonStyle={styles.btn}
        onPress={() => onBuySubscription()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  image: {
    marginVertical: 40,
  },
  imagePlaceholder: {
    backgroundColor: 'white',
  },
  contentHeading: {
    marginVertical: 2,
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 16,
  },
  contentFree: {
    marginVertical: 2,
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 22,
  },
  contentPrice: {
    marginVertical: 2,
    fontWeight: 'bold',
    color: themeVars.greenClr,
    fontSize: 20,
    marginBottom: 50,
  },
  button: {
    marginVertical: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btn: {
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
});

export default Home;
