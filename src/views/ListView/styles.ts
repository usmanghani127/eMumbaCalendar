import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  filtersRow: {
    marginVertical: 10,
  },
  filter: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.grey,
    marginHorizontal: 10,
  },
  appliedFilter: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  appliedFilterText: {
    color: Colors.white,
  },
  filterText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: Colors.grey,
  },
});
