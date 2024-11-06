import { configureStore } from '@reduxjs/toolkit';
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

import userAuthSlice from './slices/userAuthSlice';
import adminAuthSlice from './slices/adminAuthSlice';


const userPersistConfig = { key: 'userAuth', storage, version: 1 };
const adminPersistConfig = { key: 'adminAuth', storage, version: 1 };

const userAuthPersistReducer = persistReducer(
  userPersistConfig,
  userAuthSlice.reducer
);
const adminAuthPersistReducer = persistReducer(
  adminPersistConfig,
  adminAuthSlice.reducer
);

export const store = configureStore({
  reducer: {
    user: userAuthPersistReducer,
    admin: adminAuthPersistReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    return middleware;
  },
});

export const persistor = persistStore(store);