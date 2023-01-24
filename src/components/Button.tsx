import React from 'react';
import {StyleSheet, TouchableOpacity, Text, ViewStyle} from 'react-native';
import Colors from '../theme/Colors';

interface IButton {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled: boolean;
}

const Button = (props: IButton): JSX.Element => {
  const {label, onPress, style, disabled} = props;

  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : onPress}
      activeOpacity={0.8}
      style={[styles.button, style]}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 25,
  },
  label: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default Button;
