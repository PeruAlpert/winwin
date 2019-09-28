import React, {Component} from 'react';
//import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
import {AsyncStorage} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
//import {connect} from 'react-redux';
import Loading from './containers/Loading';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persist_reducer = persistReducer(persistConfig, rootReducer);

const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

class App extends Component {
  render() {
    const store = createStore(persist_reducer);
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Loading />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
