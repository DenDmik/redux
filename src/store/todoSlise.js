import{createSlice} from "@reduxjs/toolkit";
import{createAsyncThunk} from '@reduxjs/toolkit';
//////////////создание фссинхр функц запроса данных с 'https://jsonplaceholder.typicode.com/todos вы
export const fetchTodos = createAsyncThunk(
  'todosList/fetchTodos',
  async function(_,{rejectWithValue}){
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      if(!response.ok){
        throw new Error('Server Error')
      }
      const data = await response.json();
      return data;
/////////////эти данные получаются чернез useEffect и в extraReducers.fetchTodos.fulfillded
      ///////////// из action.payload попадают в state.todoList, далее данныне вытаскиваются в
      ////////////в компоненте TodoList (const todos = useSelector(state=>state.todosA.todosList)
      //////////// и обрабатываются с помощью todos.map
    } catch (error){
      return rejectWithValue(error.message)
    }
  }
)
//////////добавление на сервер
export const addNewTodo = createAsyncThunk(
  'todosList/addNewTodo',
  async function({title},{rejectWidthValue,dispatch}){


try{
  const todo = {
    title: title,
    userId: 1,
    completed: false,
  }
  const response= await fetch('https://jsonplaceholder.typicode.com/todos',{
    method :'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(todo)
  })
  if(!response.ok){
    throw new Error('CAN\'t addNewTodo.Server error')
  }

  const data1 = await response.json()
  console.log(data1)
  dispatch(addTodo(data1))
}

catch(error){
  return rejectWidthValue(error.message)
}
  }
)
/////////////////////////////////////////////////////////удаление с сервера
 export const deleteTodo = createAsyncThunk(
  'todosList/deleteTodo',
  async function({id},{rejectWithValue,
  dispatch}){
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/${id}',{
        method:'DELETE',
      })
      console.log(response)
      console.log({id})
      if(!response.ok){
        throw new Error('Can\'t  delete .Server error')
      }
      dispatch(removeTodo({id}))
    }
    catch (error){
      return rejectWithValue(error.message)
    }
  }
)
////////////////////общий обработчик ошибок
const setError =(state,action)=>{
  state.status = 'rejected'
  state.error = action.payload
}

/////////////////////////////////изменение статуса на сервере
export const toggleTodoServer = createAsyncThunk(
  'todosList/toggleTodoServer',
  async function({id},{rejectedWidthValue,dispatch,getState}){
    const todo = getState().todosA.todosList.find(todo=>todo.id === id);
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/${id}',{
        method:'PATCH',
        headers:{
          'Content-Type': 'application/json',
        },
        ///////////// в инструкции нет ...todo // но, данные обьекта data полные,
        ////// у меня они полные только с ...todo
        body : JSON.stringify({...todo,completed: !todo.completed})
      })
      if(!response.ok){
        throw new Error('CAN\'t toggle.Server error')
      }
      dispatch(toggleTodoCompleted({id}))
      const data = await response.json()
      console.log(data)
    } catch (error){
      return rejectedWidthValue(error.message)
    }
  }
)
////////////////////
const todoSlice = createSlice({
  name : 'todosList',
  initialState:{
    todosList:[],
    status:null,
    error:null,
  },
  reducers:{
    addTodo(state,action){
      console.log(state)
      console.log(action)

      state.todosList.push(
       action.payload
      )

    },
    removeTodo(state,action){
      state.todosList = state.todosList.filter(todo=>todo.id !== action.payload.id)
    },
    toggleTodoCompleted(state,action){
      const todosToggled = state.todosList.find(todo => todo.id === action.payload.id)
      todosToggled.completed = ! todosToggled.completed
    },
  },
  extraReducers: {
    [fetchTodos.pending]:(state)=>{
      state.status = 'loading';
        state.error = null ;
        console.log('loading')
    },
    [fetchTodos.fulfilled]:(state,action)=>{
      state.status='resolved';
      state.todosList = action.payload;
    },
    [fetchTodos.rejected]:setError,

    [deleteTodo.rejected]: setError,
    [toggleTodoServer.rejected]:setError,
    [addNewTodo.rejected]:setError,
  }
})
export const{addTodo,removeTodo,toggleTodoCompleted} = todoSlice.actions
export default todoSlice.reducer
