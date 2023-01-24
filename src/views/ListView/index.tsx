import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {EventType, IEvent, IEventsState} from '../../redux/events';
import styles from './styles';
import Event from '../../components/Event';
import NoData from '../../components/NoData';
import Colors from '../../theme/Colors';

const ListView = () => {
  const [appliedFilter, setAppliedFilter] = useState<string>('All');

  const Store = useSelector<IEventsState>(
    state => state.events,
  ) as IEventsState;

  const {events, loading} = Store;

  const FiltersRow = () => {
    const RenderFilter = ({item}: {item: string}) => (
      <TouchableOpacity
        onPress={() => setAppliedFilter(item)}
        activeOpacity={1}
        style={[styles.filter, appliedFilter === item && styles.appliedFilter]}>
        <Text
          style={[
            styles.filterText,
            appliedFilter === item && styles.appliedFilterText,
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={['All', ...Object.values(EventType)]}
        renderItem={RenderFilter}
        horizontal={true}
        style={styles.filtersRow}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        keyExtractor={(item: IEvent) => item.id as string}
        data={
          appliedFilter === 'All'
            ? events
            : events.filter(event => event.type === appliedFilter)
        }
        extraData={events}
        renderItem={({item}) => {
          const {id, title, description, date, startTime, endTime, type} = item;
          return (
            <Event
              id={id}
              title={title}
              description={description}
              date={date}
              startTime={startTime}
              endTime={endTime}
              type={type}
            />
          );
        }}
        refreshControl={
          <RefreshControl
            tintColor={Colors.primary}
            colors={[Colors.primary]}
            refreshing={loading}
            onRefresh={() => {}}
          />
        }
        ListHeaderComponent={FiltersRow}
        ListEmptyComponent={() => <NoData />}
      />
    </SafeAreaView>
  );
};
export default ListView;
