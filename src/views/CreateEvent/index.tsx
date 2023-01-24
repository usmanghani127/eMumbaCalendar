import React, {useState} from 'react';
import {INPUT_TYPES} from '../../common/Constants';
import Input, {IInputField} from '../../components/Input';
import {SafeAreaView, ScrollView} from 'react-native';
import Button from '../../components/Button';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  createEvent,
  EventKeys,
  EventType,
  IEvent,
  IEventsState,
} from '../../redux/events';
import ScreenLoading from '../../components/ScreenLoading';

const CreateEvent = () => {
  const dispatch = useDispatch();
  const State = useSelector<IEventsState>(
    state => state.events,
  ) as IEventsState;
  const {loading} = State;
  const [data, setData] = useState<IInputField[]>([
    {
      key: EventKeys.TITLE,
      label: 'Title',
      type: INPUT_TYPES.TEXT,
      value: '',
      error: false,
    },
    {
      key: EventKeys.DESCRIPTION,
      label: 'Description',
      numberOfLines: 5,
      type: INPUT_TYPES.TEXT,
      value: '',
      error: false,
    },
    {
      key: EventKeys.TYPE,
      label: 'Event Type',
      type: INPUT_TYPES.TEXT,
      value: EventType.Event,
      error: false,
    },
    {
      key: EventKeys.DATE,
      label: 'Date',
      type: INPUT_TYPES.DATE,
      value: '',
      error: false,
    },
    {
      key: EventKeys.START_TIME,
      label: 'Start Time',
      type: INPUT_TYPES.TIME,
      value: '',
      error: false,
    },
    {
      key: EventKeys.END_TIME,
      label: 'End Time',
      type: INPUT_TYPES.TIME,
      value: '',
      error: false,
    },
    {
      key: EventKeys.ATTACHMENT,
      label: 'Attachment',
      optional: true,
      type: INPUT_TYPES.ATTACHMENT,
      value: '',
      error: false,
    },
  ]);

  const onChangeField = (newValue: string, index: number) => {
    const tempData = [...data];
    tempData[index].value = newValue;
    setData(tempData);
  };

  const onCreateEvent = () => {
    const payload: IEvent & {[key: string]: string} = {
      [EventKeys.TITLE]: '',
      [EventKeys.DESCRIPTION]: '',
      [EventKeys.DATE]: '',
      [EventKeys.START_TIME]: '',
      [EventKeys.END_TIME]: '',
      [EventKeys.ATTACHMENT]: '',
      [EventKeys.TYPE]: EventType.Event,
    };
    const tempData = [...data];
    let valid = true;
    data.forEach((field, index) => {
      const {key, optional, value} = field;
      if (!optional && value === '') {
        tempData[index].error = true;
        valid = false;
      } else {
        payload[key] = value;
        tempData[index].error = false;
      }
    });
    setData(tempData);
    valid && dispatch(createEvent(payload));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        {data.map((field: IInputField, index: number) => {
          const {label, type, value, error, numberOfLines} = field;
          return (
            <Input
              key={index.toString()}
              label={label}
              type={type}
              value={value}
              error={error}
              numberOfLines={numberOfLines}
              onChange={(newValue: string) => onChangeField(newValue, index)}
            />
          );
        })}
      </ScrollView>
      <Button
        disabled={loading}
        style={styles.done}
        label={'Done'}
        onPress={onCreateEvent}
      />
      <ScreenLoading loading={loading} />
    </SafeAreaView>
  );
};
export default CreateEvent;
