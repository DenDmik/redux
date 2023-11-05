import React from "react";
import {useDispatch} from "react-redux";
import{deleteTodo} from "../store/todoSlise";
import {toggleTodoServer} from "../store/todoSlise";

const TodoItem =({id,completed,title})=>{
  const dispatch = useDispatch()
  return(
    <li key={id}>
      <input type='checkbox'
             checked={completed}
             onChange={()=>dispatch(toggleTodoServer({id}))}
      />
      <span>{title}</span>
      <span className={'delete'} onClick={()=>dispatch(deleteTodo({id}))}>&times;</span>
    </li>

  )
}
export default TodoItem