import {configureStore} from '@reduxjs/toolkit';
import EventsReducer from '../redux/events';
import Reactotron from './ReactotronConfig';

const store = configureStore({
  reducer: {
    events: EventsReducer,
  },
  enhancers: [Reactotron.createEnhancer()],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
