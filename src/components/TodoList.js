import React from 'react';
import Todo from './Todo'


const TodoList = ({ todos, todoDelete, todoToggleCompleted, setTodoEdit }) => {

    return (
        <div>
            <h2 className='text-center display-4 text-uppercase fw-light text-decoration-underline'> TodoList</h2>
            {
                todos.length === 0
                    ? (
                        <div className='alert alert-primary text-center'>
                            No hay tareas. por favor ingrese una
                        </div>
                    ) :
                    todos.map(todo => (
                        <Todo todo={todo}
                            key={todo.id}
                            todoDelete={todoDelete}
                            todoToggleCompleted={todoToggleCompleted}
                            setTodoEdit={setTodoEdit}
                        />
                    ))
            }


        </div>
    )
}
export default TodoList;