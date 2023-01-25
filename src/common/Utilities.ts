import {Alert, Platform, ToastAndroid} from 'react-native';
import {createNavigationContainerRef} from '@react-navigation/native';
import dayjs from 'dayjs';
import {EventKeys, IEvent} from '../redux/events';

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

export const SortEvents = (a: IEvent, b: IEvent) => {
  const dateA = dayjs(a[EventKeys.START_TIME]);
  const dateB = dayjs(b[EventKeys.START_TIME]);
  return dateA.isBefore(dateB) ? -1 : dateB.isBefore(dateA) ? 1 : 0;
};
