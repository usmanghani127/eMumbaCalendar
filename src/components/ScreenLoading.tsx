import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator, Dimensions
} from "react-native";
import Colors from '../theme/Colors';

interface ScreenLoading {
  loading: boolean;
}

const ScreenLoading = (props: ScreenLoading): JSX.Element => {
  const {loading} = props;

  return loading ? (
    <View style={styles.overlay}>
      <ActivityIndicator
        style={styles.spinner}
        size={'large'}
        color={Colors.primary}
      />
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: Colors.white,
    opacity: 0.75,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  spinner: {
    marginTop: Dimensions.get('window').height * 0.3,
  },
});
export default ScreenLoading;
