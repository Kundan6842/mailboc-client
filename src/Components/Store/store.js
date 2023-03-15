import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Authreducer";
import showReducer from './show-slice';
import mailReducer from './mail-slice';


const store = configureStore({
  reducer: {auth: authSlice, show: showReducer, mail: mailReducer}
});

export default store;
