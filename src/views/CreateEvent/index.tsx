import React, {useCallback, useState} from 'react';
import {
  INPUT_TYPES,
  RootNavigatorParamList,
  RouteKeys,
} from '../../common/Constants';
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
  updateEvent,
} from '../../redux/events';
import ScreenLoading from '../../components/ScreenLoading';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

const CreateEvent = (
  props: BottomTabScreenProps<RootNavigatorParamList, RouteKeys.CreateEvent>,
) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const State = useSelector<IEventsState>(
    state => state.events,
  ) as IEventsState;
  const {loading} = State;

  const initialValues: IEvent & {[key: string]: string} = {
    [EventKeys.TITLE]: '',
    [EventKeys.DESCRIPTION]: '',
    [EventKeys.DATE]: new Date().toISOString(),
    [EventKeys.START_TIME]: new Date().toISOString(),
    [EventKeys.END_TIME]: new Date().toString(),
    [EventKeys.TYPE]: EventType.Event,
    [EventKeys.ATTACHMENT]: '',
  };

  const [editView, setEditView] = useState(false);
  const [data, setData] = useState<IInputField[]>([
    {
      key: EventKeys.TITLE,
      label: 'Title',
      type: INPUT_TYPES.TEXT,
      value: initialValues[EventKeys.TITLE],
      error: false,
    },
    {
      key: EventKeys.DESCRIPTION,
      label: 'Description',
      numberOfLines: 5,
      type: INPUT_TYPES.TEXT,
      value: initialValues[EventKeys.DESCRIPTION],
      error: false,
    },
    {
      key: EventKeys.TYPE,
      label: 'Event Type',
      type: INPUT_TYPES.DROPDOWN,
      value: initialValues[EventKeys.TYPE],
      error: false,
    },
    {
      key: EventKeys.DATE,
      label: 'Date',
      type: INPUT_TYPES.DATE,
      value: initialValues[EventKeys.DATE],
      error: false,
    },
    {
      key: EventKeys.START_TIME,
      label: 'Start Time',
      type: INPUT_TYPES.TIME,
      value: initialValues[EventKeys.START_TIME],
      error: false,
    },
    {
      key: EventKeys.END_TIME,
      label: 'End Time',
      type: INPUT_TYPES.TIME,
      value: initialValues[EventKeys.END_TIME],
      error: false,
    },
    // {
    //   key: EventKeys.ATTACHMENT,
    //   label: 'Attachment',
    //   optional: true,
    //   type: INPUT_TYPES.ATTACHMENT,
    //   value: initialValues[EventKeys.ATTACHMENT] as string,
    //   error: false,
    // },
  ]);

  const {route: {params: {event} = {}} = {}} = props;

  const resetData = () => {
    navigation.reset({
      ...navigation.getState().routes,
      index: 1,
      routes: [{name: RouteKeys.CreateEvent}],
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (event) {
        const tempData = [...data];
        tempData.forEach((field, index) => {
          tempData[index].value = event[field.key];
        });
        setData(tempData);
        setEditView(true);
        navigation.setOptions({headerTitle: 'Update Event'});
      }
      return () => resetData();
    }, [event]),
  );

  const onChangeField = (newValue: string, index: number) => {
    const tempData = [...data];
    tempData[index].value = newValue;
    setData(tempData);
  };

  const onDonePress = () => {
    const payload: IEvent & {[key: string]: string} = {
      [EventKeys.ID]: event?.id || '',
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
    valid && dispatch(editView ? updateEvent(payload) : createEvent(payload));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        {data.map((field: IInputField, index: number) => {
          const {key, label, type, value, error, numberOfLines} = field;
          return (
            <Input
              key={key}
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
        onPress={onDonePress}
      />
      <ScreenLoading loading={loading} />
    </SafeAreaView>
  );
};
export default CreateEvent;
