import {NativeModules} from 'react-native';
import sagaPlugin from 'reactotron-redux-saga';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

let tron = Reactotron;

if (__DEV__ && !process.env.__TEST__) {
  tron = Reactotron.configure({
    name: 'FakeStore',
    host: NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0],
  }).setAsyncStorageHandler!(AsyncStorage)
    .useReactNative({
      asyncStorage: false,
      overlay: false,
    })
    .use(reactotronRedux())
    .use(sagaPlugin({}))
    .connect();

  tron.clear!();

  console.tron = tron;
}

export default tron;
