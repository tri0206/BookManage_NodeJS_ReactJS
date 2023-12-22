import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import readerReducer from "./readerReducer";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};
const readerPersistConfig = {
    ...persistCommonConfig,
    key: 'reader',
    whitelist: ['isLoggedIn', 'readerInfo']
};

export default (history) => combineReducers({
    router: connectRouter(history),
    // admin: persistReducer(adminPersistConfig, adminReducer),
    reader: persistReducer(readerPersistConfig, readerReducer),
    app: appReducer
})