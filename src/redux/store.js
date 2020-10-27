import {createStore, combineReducers, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {MainReducer} from './reducers/main-reducer';

const persistConfig = {
  key: 'test-21',
  storage: AsyncStorage,
  timeout: 100000,
  blacklist: ['main'],
};
const mainConfig = {
  key: 'main',
  storage: AsyncStorage,
  blacklist: ['eventsData'],
};
let middleware = [thunk];

const rootReducer = combineReducers({
  main: persistReducer(mainConfig, MainReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export {store, persistor};
