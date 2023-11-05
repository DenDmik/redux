import React from "react";
import TodoItem from "./todoItem";
import {useSelector} from "react-redux";

const TodoList =()=>{
  const todos = useSelector(state=>state.todosA.todosList)
  return(
    <ul>{
      todos.map(todo =>< TodoItem key={todo.id}
           ///// здесь данные из  state.todosA.todosList   оператором ... разворачиваются в
        /////// компонент TodoItem для каждого обьекта todo из массива todos , полученного из
        ////// state.todosA.todosList ,
                                  {...todo}


        />
      )
    }</ul>

  )
}
export default TodoList