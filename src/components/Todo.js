import React from 'react'

const Todo = ({ todo, todoDelete, todoToggleCompleted, setTodoEdit }) => {

    return (
        <div className='card mt-2'>
            <div className='card-body'>
                <h3 className='card-title text-right'>
                    {todo.title}
                    <button
                        className={`btn btn-sm ${todo.completed ? 'btn-outline-success' : 'btn-success'} ms-2`}
                        onClick={() => todoToggleCompleted(todo.id)}
                    >
                        {todo.completed ? 'Terminado' : 'Terminar'}
                    </button>
                </h3>
                <p className='card-title'>
                    {todo.description}
                </p>
                <hr />
                <div className='d-flex justify-content-end'>
                    <button
                        className='btn btn-sm btn-outline-primary me-2'
                        onClick={() => setTodoEdit(todo)}
                    >
                        Editar
                </button>
                    <button
                        className='btn btn-sm btn-outline-danger'
                        onClick={() => todoDelete(todo.id)}
                    >
                        Eliminar
                </button>
                </div>
            </div>

        </div>
    )
}

export default Todo
