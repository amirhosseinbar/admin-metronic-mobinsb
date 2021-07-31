import {all} from "redux-saga/effects";
import {combineReducers} from "redux";
import { EMPTYALLREDUCERS } from './type';

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {reducer_notificationAlert} from './notificationAlert';

// import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
// import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
// import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
// import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";

export const appReducer = combineReducers({
  auth: auth.reducer,
  reducer_notificationAlert,
  // customers: customersSlice.reducer,
  // products: productsSlice.reducer,
  // remarks: remarksSlice.reducer,
  // specifications: specificationsSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}



export const rootReducer = (state, action) => {
  if (action.type === EMPTYALLREDUCERS ) {
      state = undefined
      localStorage.clear()
  }
  return appReducer(state, action)
}
