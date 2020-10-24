import {createStore, combineReducers, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {MainReducer} from './reducers/main-reducer';

const persistConfig = {
  key: 'test-1',
  storage: AsyncStorage,
  timeout: 100000,
};

let middleware = [thunk];

const rootReducer = combineReducers({
  main: MainReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export {store, persistor};
