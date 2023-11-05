import './App.css';
import React from "react";
import TodoList from "./components/todoList";
import InputField from "./components/inputFild";
import {useDispatch,useSelector} from "react-redux";
import{addTodo,fetchTodos,addNewTodo} from "./store/todoSlise";

function App() {
  const [title,setTitle] = React.useState('')
  const dispatch = useDispatch()
  ///// достаем данные status , error из state.todosA методом деструктуризации
  const{status,error}=useSelector(state=>state.todosA)
  const addTask =()=>{
    if(title.trim().length){
      dispatch(addNewTodo({title}))
      setTitle('')
    }

  }
    ////////////////////////добавление
  // const addTodo =()=>{
  //   if(text.trim().length){
  //     setTodos([...todos,
  //       {
  //         id: new Date().toISOString(),
  //         text,
  //         completed:false,
  //       }
  //
  //       ]
  //     )
  //     setText('')
  //   }
  // }
  // ///////////////////////удаление................
  // function removeTodo(todoId){
  //   setTodos(todos.filter(todo=> todo.id !== todoId))
  // }
  // /////////////////////////////перекдючение в сост выполнен.т.е (todo.completed = true)
  // const toggleTodoCompleted=(todoId)=>


  // {
  //   setTodos(
  //     todos.map(todo=>{
  //       if(todo.id !== todoId) return todo;
  //       else{
  //         return ({
  //           ...todo,
  //           completed : !todo.completed
  //         })
  //       }
  //     })
  //   )
  // }
  ////////////////////////вызов ассинхронной ф-ции при перв загрузке
  React.useEffect(()=>{dispatch(fetchTodos()) ;console.log('loading')},[dispatch])

  return (
    <div className="App">
      <InputField
        text={title}
        Submit={addTask}
        setText={setTitle}
        />
      {/*//// полбзуемся данными status , error полученными через деструктуризацию выше  из status.todosA*/}
      {status === 'loading'&& <h2>Loading...</h2>}
      {error && <h2>ERROR:{error}</h2>}
      <TodoList
      />
    </div>
  )
}

export default App;
