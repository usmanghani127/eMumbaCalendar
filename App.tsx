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
import CreateEvent from './src/views/CreateEvent';
import {RouteKeys} from './src/common/Constants';
import {navigationRef} from './src/common/Utilities';

if (__DEV__) {
  import('./src/config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

function App(): JSX.Element {
  const Tab = createBottomTabNavigator();

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
    [RouteKeys.CreateEvent]: {
      name: 'pluscircle',
      type: ICON_TYPES.AntDesign,
    },
  };

  const headerTitles: {[key: string]: string} = {
    [RouteKeys.ListView]: 'My Events Listing',
    [RouteKeys.CalendarView]: 'My Events Calendar',
    [RouteKeys.CreateEvent]: 'Create Event',
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({route}) => {
          return {
            tabBarIcon: ({focused}) => (
              <VectorIcon
                iconName={tabBarIcons[route.name]?.name}
                iconType={tabBarIcons[route.name]?.type}
                color={focused ? Colors.primary : Colors.grey}
                style={
                  route.name === RouteKeys.CreateEvent
                    ? {
                        position: 'absolute',
                        bottom: 0,
                      }
                    : {}
                }
                size={
                  route.name === RouteKeys.CreateEvent
                    ? 55
                    : focused
                    ? 22.5
                    : 20
                }
              />
            ),
            tabBarStyle: {paddingBottom: 10, height: 55},
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.grey,
            headerTitle: headerTitles[route.name],
            headerTitleAlign: 'center',
            headerTitleStyle: {color: Colors.white},
            headerStyle: {backgroundColor: Colors.primary},
          };
        }}>
        <Tab.Screen name="List View" component={ListView} />
        <Tab.Screen name="Create Event" component={CreateEvent} />
        <Tab.Screen name="Calendar View" component={CalendarView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
