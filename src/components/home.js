import React, {useEffect, useState} from 'react';
import {View, Platform, Alert, Text, StyleSheet} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getSubscription} from '../redux/actions/main-action';
import {themeVars} from '../styles/variables';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

const itemSkus = Platform.select({
  ios: [
    'com.cooni.point1000',
    'com.cooni.point5000', // dooboolab
  ],
  android: [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
    'android.test.item_unavailable',
    // 'point_1000', '5000_point', // dooboolab
  ],
});

const itemSubs = Platform.select({
  ios: [
    'com.cooni.point1000',
    'com.cooni.point5000', // dooboolab
  ],
  android: [
    'test.sub1', // subscription
  ],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const Home = () => {
  const [state, setState] = useState({
    productList: [],
    receipt: '',
    availableItemsMessage: '',
  });
  const isSubscribed = useSelector((state) => state.main.isSubscribed);
  const dispatch = useDispatch();
  function onBuySubscription() {
    requestSubscription(state.productList[0].productId);
    dispatch(getSubscription(!isSubscribed));
  }
  useEffect(async () => {
    try {
      const result = await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      console.log('result', result);
    } catch (err) {
      console.warn(err.code, err.message);
    }

    purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          // if (Platform.OS === 'ios') {
          //   finishTransactionIOS(purchase.transactionId);
          // } else if (Platform.OS === 'android') {
          //   // If consumable (can be purchased again)
          //   consumePurchaseAndroid(purchase.purchaseToken);
          //   // If not consumable
          //   acknowledgePurchaseAndroid(purchase.purchaseToken);
          // }
          const ackResult = await finishTransaction(purchase);
        } catch (ackErr) {
          console.warn('ackErr', ackErr);
        }

        setState({...state, receipt: receipt});
      }
    });
    purchaseErrorSubscription = purchaseErrorListener((error) => {
      console.log('purchaseErrorListener', error);
      Alert.alert('purchase error', JSON.stringify(error));
    });
    getItems();
    // return () => {
    //   try {
    //     if (purchaseUpdateSubscription) {
    //       purchaseUpdateSubscription.remove();
    //       purchaseUpdateSubscription = null;
    //     }
    //     if (purchaseErrorSubscription) {
    //       purchaseErrorSubscription.remove();
    //       purchaseErrorSubscription = null;
    //     }
    //     RNIap.endConnection();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
  }, []);
  const getItems = async () => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      // const products = await RNIap.getSubscriptions(itemSkus);
      console.log('Products', products);
      setState({...state, productList: products});
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };
  const getSubscriptions = async () => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log('Products', products);
      setState({...state, productList: products});
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const getAvailablePurchases = async () => {
    try {
      console.info(
        'Get available purchases (non-consumable or unconsumed consumable)',
      );
      const purchases = await RNIap.getAvailablePurchases();
      console.info('Available purchases :: ', purchases);
      if (purchases && purchases.length > 0) {
        setState({
          ...state,
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0].transactionReceipt,
        });
      }
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  };

  const requestPurchase = async (sku) => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const requestSubscription = async (sku) => {
    try {
      RNIap.requestSubscription(sku);
    } catch (err) {
      Alert.alert(err.message);
    }
  };
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
        title={!isSubscribed ? 'Buy Subscription' : "You've Subscribed"}
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
