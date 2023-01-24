import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ShowMessage} from '../common/Utilities';

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
  DATE = 'date',
  TYPE = 'type',
  ATTACHMENT = 'attachment',
}

export interface IEvent {
  [EventKeys.ID]?: string;
  [EventKeys.TITLE]: string;
  [EventKeys.DESCRIPTION]: string;
  [EventKeys.DATE]: string;
  [EventKeys.START_TIME]: string;
  [EventKeys.END_TIME]: string;
  [EventKeys.ATTACHMENT]?: unknown;
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
      state.events.push(action.payload);
      state.loading = false;
      ShowMessage('Event Created Successfully');
    },
    deleteEvent: (state: IEventsState, action: PayloadAction<string>) => {
      state.events.filter(event => event.id !== action.payload);
    },
    updateEvent: (state: IEventsState, action: PayloadAction<IEvent>) => {
      const eventIndex = state.events.findIndex(
        event => event.id === action.payload.id,
      );
      state.events[eventIndex] = action.payload;
    },
  },
});

export const {createEvent, deleteEvent, updateEvent} = eventsSlice.actions;

export default eventsSlice.reducer;
