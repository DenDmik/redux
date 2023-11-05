import React from "react";

const InputField=({text,setText, Submit, })=>{
  return(
    <label>
      <input value={text} onChange={(e)=>{setText( e.target.value)}}/>
      <button onClick={Submit}> Add Todo</button>
    </label>

  )
}
export default InputField