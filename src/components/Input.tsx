import React from 'react';
import {INPUT_TYPES} from '../common/Constants';
import {Platform, StyleSheet, TextInput, View, Text} from 'react-native';
import Colors from '../theme/Colors';
import {Picker} from '@react-native-picker/picker';
import {EventType} from '../redux/events';
import DatePicker from 'react-native-date-picker';

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
      case INPUT_TYPES.DATE:
        return (
          <>
            <Text style={styles.label}>{label}</Text>
            <DatePicker
              date={new Date(value)}
              minimumDate={new Date()}
              textColor={Colors.grey}
              mode={'date'}
              androidVariant={'nativeAndroid'}
              style={styles.datePicker}
              title={label}
              onDateChange={date => onChange && onChange(date.toISOString())}
            />
          </>
        );
      case INPUT_TYPES.TIME:
        return (
          <>
            <Text style={styles.label}>{label}</Text>
            <DatePicker
              date={new Date(value)}
              title={label}
              textColor={Colors.grey}
              androidVariant={'nativeAndroid'}
              style={styles.datePicker}
              mode={'time'}
              onDateChange={date => onChange && onChange(date.toISOString())}
            />
          </>
        );
      default:
        return (
          <TextInput
            style={styles.textInput}
            value={value}
            placeholder={label}
            placeholderTextColor={Colors.grey}
            numberOfLines={numberOfLines}
            multiline={numberOfLines > 1}
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
  datePicker: {
    alignSelf: 'center',
  },
  label: {
    color: Colors.grey,
    margin: 10,
  },
});
export default Input;
