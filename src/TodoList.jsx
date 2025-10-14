import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function TodoList() {
    let [todo, setTodo] = useState([{ task: "Sample Task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");
    let [filter, setFilter] = useState("all"); // all, done, pending

    let addNewTask = () => {
        if (newTodo.trim() === "") return;
        setTodo((prevTodos) => [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }]);
        setNewTodo("");
    };

    let updateTaskValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodo((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    let MarkAllDone = () => {
        setTodo((prevTodos) => prevTodos.map((todo) => ({ ...todo, isDone: true })));
    };

    let MarkAsDone = (id) => {
        setTodo((Todos) =>
            Todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    let clearAll = () => {
        setTodo([]);
    };

    let filteredTodos = todo.filter((t) => {
        if (filter === "done") return t.isDone;
        if (filter === "pending") return !t.isDone;
        return true;
    });

    let completedCount = todo.filter((t) => t.isDone).length;
    let pendingCount = todo.length - completedCount;

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 flex items-center justify-center p-5">
            <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-6">
                <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6"> My Todo App</h1>
                
                {/* Input Section */}
                <div className="flex gap-3 mb-4">
                    <input
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 outline-none text-gray-800"
                        placeholder="Add a new task"
                        value={newTodo}
                        onChange={updateTaskValue}
                        onKeyDown={(e) => e.key === "Enter" && addNewTask()}
                    />
                    <button
                        className={`px-5 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${newTodo.trim() ? 'bg-purple-600 hover:bg-purple-700 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}
                        onClick={addNewTask}
                        disabled={!newTodo.trim()}
                    >
                        Add
                    </button>
                </div>

                {/* Filters */}
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${filter === 'all' ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-200 hover:bg-purple-200'}`}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${filter === 'done' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 hover:bg-green-200'}`}
                        onClick={() => setFilter("done")}
                    >
                        Done
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${filter === 'pending' ? 'bg-yellow-500 text-white shadow-md' : 'bg-gray-200 hover:bg-yellow-200'}`}
                        onClick={() => setFilter("pending")}
                    >
                        Pending
                    </button>
                </div>

                {/* Task Counts */}
                <p className="text-center text-gray-600 font-semibold mb-4">
                    Completed: {completedCount} |  Pending: {pendingCount}
                </p>

                {/* Todo List */}
                <ul className="space-y-3">
                    {filteredTodos.length === 0 ? (
                        <p className="text-center text-gray-500">No tasks found</p>
                    ) : (
                        filteredTodos.map((todo) => (
                            <li key={todo.id} className={`flex justify-between items-center p-4 rounded-xl border transition-all duration-300 ${todo.isDone ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-300'}`}>
                                <span className={`text-lg font-medium ${todo.isDone ? 'line-through text-green-700' : 'text-gray-800'}`}>
                                    {todo.task}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                                        onClick={() => MarkAsDone(todo.id)}
                                    >
                                        {todo.isDone ? "Undo" : "Done"}
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>

                {/* Bottom Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        className="px-5 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300"
                        onClick={MarkAllDone}
                    >
                        Mark All Done
                    </button>
                    <button
                        className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300"
                        onClick={clearAll}
                    >
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
