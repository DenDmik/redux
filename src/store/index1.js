import {configureStore} from "@reduxjs/toolkit";
import todoReducer from './todoSlise'
export default configureStore({
  reducer:{
    todosA: todoReducer,
  }
})