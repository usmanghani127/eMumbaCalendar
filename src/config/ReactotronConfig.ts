import {NativeModules} from 'react-native';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

let reactotron = {};
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];
  // @ts-ignore
  reactotron = Reactotron.configure({
    name: 'eMumba Calendar',
    host: scriptHostname,
  })
    .useReactNative()
    .use(reactotronRedux())
    .setAsyncStorageHandler(AsyncStorage)
    .connect();
  // @ts-ignore
  console.tron = Reactotron;
} else {
  const noop = () => {};
  // @ts-ignore
  const ouroboros = () => console.tron;
  // @ts-ignore
  console.tron = {
    startTimer: () => noop,
    send: noop,
    apiResponse: noop,
    debug: noop,
    stateActionComplete: noop,
    stateValuesResponse: noop,
    stateKeysResponse: noop,
    stateValuesChange: noop,
    stateBackupResponse: noop,
    repl: noop,
    warn: noop,
    configure: ouroboros,
    connect: ouroboros,
    use: ouroboros,
    useReactNative: ouroboros,
    close: noop,
    clear: noop,
    log: noop,
    logImportant: noop,
    display: noop,
    error: noop,
    image: noop,
    reportError: noop,
    benchmark: () => ({step: noop, stop: noop}),
    onCustomCommand: noop,
  };
}

export default reactotron;
