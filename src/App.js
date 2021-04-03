import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import axios from 'axios'


const initialTodos = [
    {
        id: 1,
        title: 'Todo #1',
        description: 'Desc del Todo #1',
        completed: false,
    },
    {
        id: 2,
        title: 'Todo #2',
        description: 'Desc del Todo #2',
        completed: false
    }

]

const localTodos = JSON.parse(localStorage.getItem('todos'))

const App = () => {
    const [todos, setTodos] = useState([]);
    const [todoEdit, setTodoEdit] = useState(null);

    const obtenerTasks = async () => {
        const resp = await axios.get('https://6067816798f405001728ef14.mockapi.io/tasks')
        await setTodos(resp.data)

    }
    useEffect(() => {
        obtenerTasks()
        /* localStorage.setItem('todos', JSON.stringify(todos)) */
    }, []);


    const todoDelete = async (todoId) => {
        if (todoEdit && todoId === todoEdit.id) {
            setTodoEdit(null)
        }
        await axios.delete(`https://6067816798f405001728ef14.mockapi.io/tasks/` + todoId)
        obtenerTasks()

        /* const changedTodos = todos.filter(todo => todo.id !== todoId);

        setTodos(changedTodos) */
    }

    const todoToggleCompleted = (todoId) => {
        /* const changedTodos = todos.map(todo => {
            const todoEdit = {
                ...todo,
                completed: !todo.completed

            }
            if (todo.id === todoId) {
                return todoEdit

            } else {
                return todo
            }

        }); */

        /*  const changedTodos = todos.map(todo => (
             todo.id === todoId
                 ? { ...todo, completed: !todo.completed }
                 : todo
         )); */
        const changedTodos = todos.map(todo => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo)
        setTodos(changedTodos)
    }

    const todoAdd = async (todo) => {
        await axios.post(`https://6067816798f405001728ef14.mockapi.io/tasks`, { title: todo.title, description: todo.description, completed: false })

        obtenerTasks()

    }
    const todoUpdate = async (todoEdit) => {
        console.log(todoEdit)
        await axios.put(`https://6067816798f405001728ef14.mockapi.io/tasks/` + todoEdit.id, { title: todoEdit.title, description: todoEdit.description })

        obtenerTasks()
    }
    return (
        <div className='conteiner mt-4'>
            <div className='row'>
                <div className='col-8'>
                    <TodoList
                        todos={todos}
                        todoDelete={todoDelete}
                        todoToggleCompleted={todoToggleCompleted}
                        setTodoEdit={setTodoEdit}
                    />
                </div>
                <div className='col-4'>
                    <TodoForm
                        todoEdit={todoEdit}
                        todoAdd={todoAdd}
                        todoUpdate={todoUpdate}
                        setTodoEdit={setTodoEdit}
                    />
                </div>

            </div>

        </div>

    )
}
export default App;
