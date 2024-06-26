import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer, {intialStateType} from '@app/redux/slices/userSlice';
import dashboardReducer, { initialStateType } from '@app/redux/slices/dashboardSlice';

const rootReducer = combineReducers({
    user: userReducer,
    dashboard_slice: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;
