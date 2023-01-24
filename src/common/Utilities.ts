import {Alert, Platform, ToastAndroid} from 'react-native';
import {createNavigationContainerRef} from '@react-navigation/native';

export const ShowMessage = (text: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(text, 2000);
  } else {
    Alert.alert(text);
  }
};

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params = {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
