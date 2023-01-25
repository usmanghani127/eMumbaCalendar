import React, {useEffect, useState} from 'react';
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule,
  DateData,
} from 'react-native-calendars/src';
import {useSelector} from 'react-redux';
import {IEvent, IEventsState} from '../../redux/events';
import Colors from '../../theme/Colors';
import dayjs from 'dayjs';
import Event from '../../components/Event';
import NoData from '../../components/NoData';
import {MarkedDates} from 'react-native-calendars/src/types';

interface IAgenda {
  [key: string]: IEvent[];
}

interface IMarkedDate {
  marked: boolean;
}

interface IMarkedDates {
  [key: string]: IMarkedDate;
}

const CalendarView = () => {
  const [agendaItems, setAgendaItems] = useState<AgendaSchedule & IAgenda>({});
  const [markedDates, setMarkedDates] = useState<MarkedDates & IMarkedDates>(
    {},
  );
  const Store = useSelector<IEventsState>(
    state => state.events,
  ) as IEventsState;

  const filterDateEvents = (
    date: string = dayjs().format('YYYY-MM-DD').toString(),
  ) => {
    const tempAgendaItems = {} as AgendaSchedule & IAgenda;
    Store.events.forEach(event => {
      const key = dayjs(event.startTime).format('YYYY-MM-DD').toString();
      if (key === date) {
        if (key in tempAgendaItems) {
          tempAgendaItems[key].push(event as AgendaEntry & IEvent);
        } else {
          tempAgendaItems[key] = [event as AgendaEntry & IEvent];
        }
      }
    });
    setAgendaItems(tempAgendaItems);
  };

  const calculateMarkedDates = () => {
    const tempMarkedDates = {} as MarkedDates & IMarkedDates;
    Store.events.forEach(event => {
      const key = dayjs(event.startTime).format('YYYY-MM-DD').toString();
      if (!(key in tempMarkedDates)) {
        tempMarkedDates[key] = {marked: true} as IMarkedDate;
      }
    });
    setMarkedDates(tempMarkedDates);
  };

  useEffect(() => {
    filterDateEvents();
    calculateMarkedDates();
  }, [Store.events]);

  const onDayChange = (date: DateData) => {
    filterDateEvents(date.dateString);
  };

  return (
    <Agenda
      items={agendaItems}
      markedDates={markedDates}
      renderItem={item => {
        const {id, title, description, startTime, endTime, type} =
          item as unknown as IEvent;
        return (
          <Event
            id={id}
            title={title}
            description={description}
            startTime={startTime}
            endTime={endTime}
            type={type}
          />
        );
      }}
      onDayPress={onDayChange}
      pastScrollRange={12}
      futureScrollRange={12}
      renderEmptyData={() => <NoData />}
      theme={{
        agendaDayTextColor: Colors.primary,
        agendaDayNumColor: Colors.primary,
        agendaTodayColor: Colors.primary,
        agendaKnobColor: Colors.primary,
        dotColor: Colors.primary,
        indicatorColor: Colors.primary,
        todayTextColor: Colors.primary,
        selectedDayBackgroundColor: Colors.primary,
      }}
    />
  );
};
export default CalendarView;
