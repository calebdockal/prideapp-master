import React, {Fragment} from 'react';
import {YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import FlashMessage from 'react-native-flash-message';

import MainStack from './src/navigation/MainStack';

const store = configureStore();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <MainStack />
        <FlashMessage position="top" />
      </Fragment>
    </Provider>
  );
};

YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified.']);

export default App;
