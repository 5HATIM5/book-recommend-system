import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";
import bookReducer from "./slice/BookSlice"; 


// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage, 
};


const rootReducer = combineReducers({
  books: bookReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor for persisting state
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
