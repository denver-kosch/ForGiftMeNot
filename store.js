import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state
const initialState = {
    token: null,
};

// Reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case 'REMOVE_TOKEN':
            return { ...state, token: null };
        default:
            return state;
    }
};

// Persist config
const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Store configuration
export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }
    ),
    devTools: true,
});

// Persistor
export const persistor = persistStore(store);
