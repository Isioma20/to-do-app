import { FaList, FaPlus, FaCheckCircle, FaTrash, FaEdit} from "react-icons/fa"
import { useState, useEffect } from "react";

interface Todo {
  id: number;   
  text: string; 
  completed: boolean;  
  createdAt: string; 
}

const LOCALSTORAGE_KEY = "myapp_todos_v1";

// initialize todo from localstorage
const ToDoList:React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
        const raw = localStorage.getItem(LOCALSTORAGE_KEY);
        return raw ? (JSON.parse(raw) as Todo[]) : [];
        } catch {
        return [];
        }
    });

    const [newTodoText, setNewTodoText] = useState<string>("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>("");

// modify localstorage anytime todos change
    useEffect(() => {
        try {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos));
        } catch (e) {
        console.error("Failed to save todos to localStorage", e);
        }
    }, [todos]);

    const generateId = (): number => Date.now() + Math.floor(Math.random() * 1000);

    // Add list item to todos
    const handleAddTodo = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const text = newTodoText.trim();
        if (!text) return;

        const todo: Todo = {
        id: generateId(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        };

    // Add to front so new items appear at top
        setTodos((prev) => [todo, ...prev]);
        setNewTodoText("");
    };

    //  handle edit task
    const startEditing = (todo: Todo) => {
        setEditingId(todo.id);
        setEditingText(todo.text);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingText("");
    };

    const submitEdit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (editingId === null) return;

    const text = editingText.trim();
        if (!text) {
        return;
        }

        setTodos((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, text } : t))
        );

        cancelEditing();
    };

    // handle delete task
     const deleteTodo = (id: number) => {
        if (!window.confirm("Delete this task?")) return;
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    const toggleCompleted = (id: number) => {
        setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    };


  return (
    <div className="bg-white rounded-xl w-full max-w-md mx-auto overflow-clip shadow-xl mt-20 max-sm:mx-2 max-sm:my-1">
        <div className="bg-pink-600 text-white p-6 w-full">
            <div className="flex justify-center items-center mb-2">
                <FaList className="text-2xl mr-3" />
                <h1 className="text-2xl font-bold">MY TASKS</h1>
            </div>
            <p className="text-pink-100 text-lg text-center">Get things done today</p>
        </div>
        <div className="p-6">
            <form onSubmit={handleAddTodo} className="flex gap-3 m-3">
                <input value={newTodoText} 
                onChange={(e) => setNewTodoText(e.target.value)} 
                type="text"
                placeholder="Add your tasks" 
                className="flex-1 p-3 border-2 border-slate-200 rounded-lg placeholder-gray-300 focus:border-pink-300 outline-none"></input>
                <button type="submit" className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 shadow-sm ">
                    <FaPlus />
                </button>
            </form>
            <ul className="mt-4 space-y-3">
                {todos.map((todo) => {
                const isEditing = editingId === todo.id;
            return (
              <li
                key={todo.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-slate-100"
              >
                <button
                  onClick={() => !isEditing && toggleCompleted(todo.id)}
                  disabled={isEditing}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                    todo.completed ? "bg-pink-500 text-white border-pink-500" : "border-slate-200"
                  }`}>
                  {todo.completed ? <FaCheckCircle /> : null}
                </button>

                <div className="flex-1">
                  {isEditing ? (
                    <form onSubmit={submitEdit} className="flex gap-2">
                      <input
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="flex-1 border p-2 rounded" />
                      <button type="submit" className="bg-pink-500 text-white px-3 py-2 rounded">
                        Save
                      </button>
                      <button
                        type="button" onClick={cancelEditing}
                        className="border px-3 py-2 rounded">
                        Cancel
                      </button>
                    </form>
                  ) : (
                      <div className={`text-base ${todo.completed ? "line-through text-slate-400" : ""}`}>
                        {todo.text}
                      </div>
                  )}
                </div>

                {!isEditing && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEditing(todo)}
                      className="text-slate-500 hover:text-pink-500"
                      aria-label="Edit task"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-slate-500 hover:text-red-500"
                      aria-label="Delete task"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        </div>
    </div>
  )
}

export default ToDoList
