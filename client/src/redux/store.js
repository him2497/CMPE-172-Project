import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import createReducer from './reducers';
import reduxThunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}


const persistedReducer = persistReducer(persistConfig, createReducer())

export const store = createStore(persistedReducer, applyMiddleware(reduxThunk)) //logger
store.asyncReducers = {}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}

export const persistor = persistStore(store);