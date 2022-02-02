// ReduxPersist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
// ReduxPersist

// ReduxToolkit
import {
  configureStore,
  getDefaultMiddleware,
  createReducer,
  combineReducers,
} from '@reduxjs/toolkit';
// ReduxToolkit

import * as actions from './phonebook-actions';
import logger from 'redux-logger';

const middleware =
  process.env.NODE_ENV === 'development'
    ? [
        ...getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
        logger,
      ]
    : [
        ...getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
      ];

// const itemsReducer = (state = [], { type, payload }) => {
//   switch (type) {
//     case AddContact:
//       return [...state, { ...payload }];
//     case DeleteContact:
//       return [...state.filter(contact => contact.id !== payload)];

//     default:
//       return state;
//   }
// };

const items = createReducer([], {
  //                     Деструктуризируем payload из action
  [actions.addContact]: (state, { payload }) => [...state, { ...payload }],
  [actions.deleteContact]: (state, { payload }) => [
    ...state.filter(contact => contact.id !== payload),
  ],
});

// const filterReducer = (state = '', { type, payload }) => {
//   switch (type) {
//     case SearchContacts:
//       return payload;

//     default:
//       return state;
//   }
// };

const filter = createReducer('', {
  [actions.searchContacts]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  items,
  filter,
});

const contactsPersistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

const rootReducer = combineReducers({
  contacts: persistReducer(contactsPersistConfig, contactsReducer),
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

const persistor = persistStore(store);

export { persistor, store };
