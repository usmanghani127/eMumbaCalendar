import {Alert, Platform, ToastAndroid} from 'react-native';

export const ShowMessage = (text: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(text, 2000);
  } else {
    Alert.alert(text);
  }
};
