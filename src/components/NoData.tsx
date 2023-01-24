import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Colors from '../theme/Colors';
import VectorIcon, {ICON_TYPES} from './VectorIcon';

const NoData = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <VectorIcon
        iconName={'emoticon-sad'}
        iconType={ICON_TYPES.MaterialCommunityIcons}
        color={Colors.primary}
        size={50}
      />
      <Text style={styles.text}>No Data to Display</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height * 0.1,
  },
  emoji: {},
  text: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
});
export default NoData;
