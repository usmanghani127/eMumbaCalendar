import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Alert} from 'react-native';
import Colors from '../theme/Colors';
import {deleteEvent, IEvent} from '../redux/events';
import VectorIcon, {ICON_TYPES} from './VectorIcon';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RouteKeys} from '../common/Constants';
import dayjs from 'dayjs';

const Event = (props: IEvent): JSX.Element => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {id, title, description, startTime, endTime} = props;

  const formattedStartDate = dayjs(startTime).format('MMM DD, YYYY');
  const formattedStartTime = dayjs(startTime).format('hh:mm A');

  const formattedEndDate = dayjs(endTime).format('MMM DD, YYYY');
  const formattedEndTime = dayjs(endTime).format('hh:mm A');

  const sameEndDate = formattedStartDate === formattedEndDate;

  const onPressDelete = () => {
    Alert.alert('Warning', 'Are you sure you want to delete this event?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => dispatch(deleteEvent(id as string)),
      },
    ]);
  };
  return (
    <View style={styles.event}>
      <View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={5}>
          {description}
        </Text>
        <Text style={styles.date}>
          {formattedStartDate}
          {'  '}
          <Text style={styles.time}>
            {sameEndDate
              ? `${formattedStartTime} to ${formattedEndTime}`
              : formattedStartTime}
          </Text>
        </Text>
        {!sameEndDate && (
          <Text style={styles.date}>
            {`to 
${formattedEndDate} `}{' '}
            <Text style={styles.time}>{formattedEndTime}</Text>
          </Text>
        )}
      </View>
      <View style={styles.icons}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate(RouteKeys.CreateEvent, {event: props})
          }
          style={styles.icon}>
          <VectorIcon
            iconName={'edit'}
            iconType={ICON_TYPES.MaterialIcons}
            color={Colors.primary}
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressDelete}
          style={styles.icon}>
          <VectorIcon
            iconName={'delete'}
            iconType={ICON_TYPES.MaterialIcons}
            color={Colors.primary}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  event: {
    flex: 1,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: Colors.white,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    color: Colors.grey,
    marginVertical: 5,
  },
  date: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  time: {
    color: Colors.primary,
    fontWeight: 'normal',
  },
  icons: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    padding: 5,
    alignSelf: 'flex-end',
  },
});
export default Event;
