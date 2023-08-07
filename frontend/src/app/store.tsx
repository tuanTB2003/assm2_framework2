import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    persistStore,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import Products from '../Slices/Products';
import productApi, { productReducer } from '../api/product';
import categoryApi, { categoryReducer } from '../api/categories';
import authApi, { authReducer } from '../api/auth';
const persistConfig = {
    key: 'root',
    storage,
    whileList: ['auth', 'cartUser'], // luu strorage
    backlist: ['products'] // k luu vaoo storage
}


const rootReducer = combineReducers({
    [productApi.reducerPath]: productReducer,
    [categoryApi.reducerPath]: categoryReducer,
    [authApi.reducerPath]: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware:any)=>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(productApi.middleware)
        .concat(categoryApi.middleware)
        .concat(authApi.middleware)
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export default store
export const persistor = persistStore(store)