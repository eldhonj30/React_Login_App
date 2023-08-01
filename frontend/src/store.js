import { configureStore,combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/userSlices/authSlice"
import { apiSlice } from "./slices/userSlices/apiSlice";
import adminReducer from "./slices/adminSlices/adminAuthSlice";


// const store = configureStore({
//   reducer:{
//     auth:authReducer,
//     [apiSlice.reducerPath] : apiSlice.reducer,

//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true 
// })

// export default store;


const rootReducer = combineReducers({
  auth: authReducer,
  adminAuth: adminReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;