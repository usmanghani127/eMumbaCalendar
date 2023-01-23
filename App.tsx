/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListView from './src/views/ListView';
import CalendarView from './src/views/CalendarView';
import VectorIcon, {ICON_TYPES} from './src/components/VectorIcon';
import Colors from './src/theme/Colors';

function App(): JSX.Element {
  const Tab = createBottomTabNavigator();

  enum RouteKeys {
    ListView = 'List View',
    CalendarView = 'Calendar View',
  }

  interface ITabBarIcons {
    [key: string]: {
      name: string;
      type: string;
    };
  }

  const tabBarIcons: ITabBarIcons = {
    [RouteKeys.ListView]: {
      name: 'th-list',
      type: ICON_TYPES.FontAwesome,
    },
    [RouteKeys.CalendarView]: {
      name: 'calendar',
      type: ICON_TYPES.FontAwesome5,
    },
  };

  const headerTitles: {[key: string]: string} = {
    [RouteKeys.ListView]: 'My Events Listing',
    [RouteKeys.CalendarView]: 'My Events Calendar',
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => {
          return {
            // header1
            tabBarIcon: ({focused}) => (
              <VectorIcon
                iconName={tabBarIcons[route.name]?.name}
                iconType={tabBarIcons[route.name]?.type}
                color={focused ? Colors.primary : Colors.grey}
                size={20}
              />
            ),
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.grey,
            title: headerTitles[route.name],
            headerTitleAlign: 'center',
            headerTitleStyle: {color: Colors.white},
            headerStyle: {backgroundColor: Colors.primary},
          };
        }}>
        <Tab.Screen name="List View" component={ListView} />
        <Tab.Screen name="Calendar View" component={CalendarView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
