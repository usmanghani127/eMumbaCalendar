import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {navigate, ShowMessage, SortEvents} from '../common/Utilities';
import {RouteKeys} from '../common/Constants';
import dayjs from 'dayjs';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export enum EventType {
  Event = 'Event',
  OutOfOffice = 'Out of Office',
  Task = 'Task',
}

export enum EventKeys {
  ID = 'id',
  TITLE = 'title',
  DESCRIPTION = 'description',
  START_TIME = 'startTime',
  END_TIME = 'endTime',
  TYPE = 'type',
  ATTACHMENT = 'attachment',
  NOTIFICATION_ID = 'notificationId',
}

export interface IEvent {
  [EventKeys.ID]?: string;
  [EventKeys.TITLE]: string;
  [EventKeys.DESCRIPTION]: string;
  [EventKeys.START_TIME]: string;
  [EventKeys.NOTIFICATION_ID]?: string;
  [EventKeys.END_TIME]: string;
  [EventKeys.ATTACHMENT]?: string;
  [EventKeys.TYPE]: EventType;
}

export interface IEventsState {
  loading: boolean;
  events: IEvent[];
}

const initialState: IEventsState = {
  loading: false,
  events: [],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    createEvent: (state: IEventsState, action: PayloadAction<IEvent>) => {
      state.loading = true;
      const events = [...state.events];
      events.push({
        ...action.payload,
        id: uuidv4(),
      });
      events.sort(SortEvents);
      state.events = events;
      state.loading = false;
      ShowMessage('Event Created');
      navigate(RouteKeys.ListView);

      const {title, startTime} = action.payload;

      const diff = dayjs(startTime).diff(dayjs(), 'minutes');
      const notificationTime =
        diff > 10
          ? dayjs(startTime).subtract(10, 'minutes').toISOString()
          : dayjs().add(30, 'seconds').toISOString();

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: new Date(notificationTime).getTime(),
      };

      notifee
        .createChannel({
          id: 'Events',
          name: 'Events Channel',
          sound: 'default',
        })
        .then(() => {
          notifee
            .createTriggerNotification(
              {
                title,
                body: `Today at ${dayjs(startTime).format('hh:mm A')}`,
                android: {
                  channelId: 'Events',
                },
              },
              trigger,
            )
            .then(id => {
              const index = state.events.length - 1;
              state.events[index] = {
                ...state.events[index],
                notificationId: id,
              };
            });
        });
    },
    deleteEvent: (state: IEventsState, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
      ShowMessage('Event Deleted');
    },
    updateEvent: (state: IEventsState, action: PayloadAction<IEvent>) => {
      const eventIndex = state.events.findIndex(
        event => event.id === action.payload.id,
      );
      const events = [...state.events];
      events[eventIndex] = action.payload;
      events.sort(SortEvents);
      state.events = events;
      ShowMessage('Event Updated');
    },
  },
});

export const {createEvent, deleteEvent, updateEvent} = eventsSlice.actions;

export default eventsSlice.reducer;
