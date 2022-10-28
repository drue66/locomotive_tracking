import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { locomotiveApi } from '../../entities/locomotive/api/locomotiveApi';

export const store = configureStore({
  reducer: {
    [locomotiveApi.reducerPath]: locomotiveApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    locomotiveApi.middleware,
  ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
