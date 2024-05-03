import { configureStore } from '@reduxjs/toolkit';
import { authSlice, userManagementSlice, catSlice } from './';
import { ubicacionSlice } from './ubicacion/ubicacionSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    userManagement: userManagementSlice.reducer,
    cat: catSlice.reducer,
    ubicacion: ubicacionSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});