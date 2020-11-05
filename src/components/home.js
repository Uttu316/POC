import React, {useState, useEffect} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
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
var purchaseUpdateSubscription = null;
var purchaseErrorSubscription = null;

const Home = () => {
  const isSubscribed = useSelector((state) => state.main.isSubscribed);
  const [products, setProducts] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // try {
    //   const result = await RNIap.initConnection();
    //   await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
    //   console.log('result', result);
    //   getItems();
    // } catch (err) {
    //   console.warn(err.code, err.message);
    // }
    getItems();
    purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          if (Platform.OS === 'ios') {
            finishTransactionIOS(purchase.transactionId);
          }
          await finishTransaction(purchase);
        } catch (ackErr) {
          console.log('ackErr', ackErr);
        }
      }
    });
    purchaseErrorSubscription = purchaseErrorListener((error) => {
      console.log('purchaseErrorListener', error);
    });
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    };
  }, []);
  const getItems = async () => {
    try {
      const newproducts = await RNIap.getProducts(itemSkus);

      setProducts(newproducts);
    } catch (err) {
      console.log(err.code, err.message);
    }
  };
  const requestPurchase = async (sku) => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.log(err.code, err.message);
    }
  };

  function onBuySubscription() {
    if (products !== null) {
      try {
        requestPurchase(products[0].productId);
      } catch (err) {
        console.log(err);
      }
    }
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
