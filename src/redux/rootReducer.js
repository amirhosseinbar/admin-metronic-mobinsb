import {all} from "redux-saga/effects";
import {combineReducers} from "redux";
import * as auth from "../app/modules/Auth/_redux/authRedux";
import { giftSelectActiveCategorisList, gift_select_Reducer_categories } from "./gift/gift_category_select";
import { giftSelectActiveSubCategoryList, gift_select_Reducer_subCategories } from "./gift/gift_subCategory_select";
import { EMPTYALLREDUCERS } from './type';
import {reducer_notificationAlert} from './notificationAlert';

// import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
// import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
// import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
// import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";

export const appReducer = combineReducers({
  gift_select_Reducer_categories,
  gift_select_Reducer_subCategories ,
  auth: auth.reducer,
  reducer_notificationAlert,
  // customers: customersSlice.reducer,
  // products: productsSlice.reducer,
  // remarks: remarksSlice.reducer,
  // specifications: specificationsSlice.reducer
});

export function* rootSaga() {
  yield all([
    auth.saga(),
    giftSelectActiveCategorisList(),
    giftSelectActiveSubCategoryList()
  ]);
}



export const rootReducer = (state, action) => {
  if (action.type === EMPTYALLREDUCERS ) {
      state = undefined
      localStorage.clear()
  }
  return appReducer(state, action)
}
