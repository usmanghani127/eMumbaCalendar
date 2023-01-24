import {IEvent} from '../redux/events';

export enum INPUT_TYPES {
  TEXT,
  DATE,
  TIME,
  DATE_TIME,
  DROPDOWN,
  RADIO,
  CHECKBOX,
  ATTACHMENT,
}

export enum RouteKeys {
  ListView = 'List View',
  CalendarView = 'Calendar View',
  CreateEvent = 'Create Event',
}

export type RootNavigatorParamList = {
  [RouteKeys.ListView]: undefined;
  [RouteKeys.CreateEvent]: {
    event: IEvent & {[key: string]: string};
  };
  [RouteKeys.CalendarView]: undefined;
};
