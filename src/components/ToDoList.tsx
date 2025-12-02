import { FaList, FaPlus } from "react-icons/fa"

const ToDoList = () => {
  return (
    <div className="bg-white rounded-xl w-full max-w-md mx-auto overflow-clip shadow-xl mt-20">
        <div className="bg-pink-600 text-white p-6 w-full">
            <div className="flex justify-center items-center mb-2">
                <FaList className="text-2xl mr-3" />
                <h1 className="text-2xl font-bold">MY TASKS</h1>
            </div>
            <p className="text-pink-100 text-lg text-center">Get things done today</p>
        </div>
        <div>
            <form className="flex gap-3 m-3">
                <input type="text" placeholder="Add your tasks" className="flex-1 p-3 border-2 border-slate-200 rounded-lg placeholder-gray-300 focus:border-pink-300 outline-none"></input>
                <button type="submit" className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 shadow-sm ">
                    <FaPlus />
                </button>
            </form>
            
        </div>
    </div>
  )
}

export default ToDoList
