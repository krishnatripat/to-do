import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import Nav from './component/nav'
function App() {
  const [todo, setTodo] = useState("")
  const [showfinished, setshowfinished] = useState(true)
  const [todos, setTodos] = useState([])
  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  const toggle = () => {
    setshowfinished(!showfinished)
  }

  const Savetols = () => {  
    
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const add = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    Savetols()



  }
  const edit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
    Savetols()

  }
  const handlkecheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos(newtodos)
    Savetols()
  }
  const del = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
    Savetols()
  }
  const handlechange = (e) => {
    setTodo(e.target.value)

  }
  return (
    <>
      <Nav />
      <div className="md:container w-3/4 font-white flex flex-col mx-auto my-5 rounded-xl min-h-[80vh] md:w-3/2 bg-violet-200 m-9 h-96 p-5 gap-49">
        <h1 className='font-bold text-center p-2'>Manage Your to-do at one Place</h1>
        <div className=" flex  ">
          <h2 className='font-bold p-1 w-auto h-1' >Add a todo</h2>
          <input className='w-3/4 rounded-xl' placeholder='enter your todo' onChange={handlechange} value={todo} type="text" />
          <button className='py-1 px-6 w-auto rounded-lg text-sm mx-6 font-bold text-wrap bg-violet-600 ' disabled={todo.length <= 3} onClick={add}>Add</button>
        </div>
        <div className="toggle my-2 flex"><input type="checkbox" onClick={toggle} name="" checked={showfinished} id="" />
          <h4 className='font-bold p-1'>show Finished</h4>
        </div>  <h2 className='text-lg  font-bold'>Your todo</h2>
        <div className="todos">{todos.length === 0 && <div className='m-5'>No to-do to display</div>}{todos.map(item => {
          return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 justify-between">
            <input type="checkbox" onClick={handlkecheck} name=
              {item.id} checked={item.isCompleted} />
            <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            <div className="buttons">
              <button className='py-1 p-3 m-1 rounded-lg font-bold text-sm mx- text-wrap bg-violet-600' onClick={(e) => { edit(e, item.id) }}>Edit</button>
              <button className='py-1 p-3 m-1 rounded-lg font-bold text-sm mx-1 text-wrap bg-red-600' onClick={(e) => { del(e, item.id) }}>Del</button>
            </div> </div>
        })}
        </div>
      </div>
    </>
  )
}
export default App