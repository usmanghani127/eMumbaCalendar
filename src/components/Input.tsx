import React from 'react';
import {INPUT_TYPES} from '../common/Constants';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import Colors from '../theme/Colors';
import {Picker} from '@react-native-picker/picker';
import {EventType} from '../redux/events';

export interface IInputField {
  key: string;
  optional?: boolean;
  label: string;
  type: INPUT_TYPES;
  value: string;
  error: boolean;
  numberOfLines?: number;
  onChange?: (value: string) => void;
}

const Input = (props: IInputField): JSX.Element => {
  const {label, type, value, error, numberOfLines = 1, onChange} = props;

  const InputField = (): JSX.Element => {
    switch (type) {
      case INPUT_TYPES.DROPDOWN:
        return (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            itemStyle={styles.pickerItem}
            style={styles.selected}
            prompt={'Event Type'}>
            {Object.values(EventType).map(type => (
              <Picker.Item label={type} value={type} />
            ))}
          </Picker>
        );
      default:
        return (
          <TextInput
            style={styles.textInput}
            value={value}
            placeholder={label}
            placeholderTextColor={Colors.grey}
            numberOfLines={numberOfLines}
            onChangeText={onChange}
          />
        );
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        {borderColor: error ? Colors.red : Colors.transparent},
      ]}>
      {InputField()}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 15,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: Colors.white,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
  },
  textInput: {
    color: Colors.grey,
  },
  pickerItem: {
    color: Colors.grey,
    fontSize: 14,
  },
  selected: {
    color: Colors.grey,
    fontSize: 14,
  },
});
export default Input;
