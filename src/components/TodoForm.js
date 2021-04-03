import React, { useState, useEffect } from 'react'
const initialFormValues = {
    title: '',
    description: ''
}
const TodoForm = ({ todoAdd, todoEdit, todoUpdate, setTodoEdit }) => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const { title, description } = formValues;
    const [error, setError] = useState(null);
    const [succesMessage, setSuccesMessage] = useState(null);

    useEffect(() => {
        if (todoEdit) {
            setFormValues(todoEdit)

        } else {
            setFormValues(initialFormValues)
        }
    }, [todoEdit])

    const handleInputChange = (e) => {
        const changedFormValues = {
            ...formValues,
            [e.target.name]: e.target.value
        }

        setFormValues(changedFormValues)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim() === '') {
            setError('Debes indicar un titulo')
            return;
        }
        if (description.trim() === '') {
            setError('Debes indicar una descripcion')
            return;
        }
        if (todoEdit) {
            todoUpdate(formValues)
            setSuccesMessage('Actualizado con exito');
        } else {
            todoAdd(formValues);
            setSuccesMessage('Agregado con exito');
            setFormValues(initialFormValues);

        }

        setTimeout(() => {
            setSuccesMessage(null);
        }, 2000)
        setError(null);
    }
    return (
        <div>
            <h2 className='text-center display-4 text-uppercase fw-light text-decoration-underline'>{todoEdit ? 'Editar tarea' : 'Nueva tarea'}</h2>
            {
                todoEdit &&
                <button
                    className='btn btn-warning bt-sm mb-2'
                    onClick={() => setTodoEdit(null)}
                >
                    Cancelar Edicion
            </button>
            }
            <form onSubmit={handleSubmit}>
                <input type='text'
                    placeholder='Titulo'
                    className='form-control'
                    value={title}
                    name='title'
                    onChange={handleInputChange}>

                </input>
                <textarea placeholder='Descripcion'
                    className='form-control mt-2'
                    value={description}
                    name='description'
                    onChange={handleInputChange}>

                </textarea>
                <div className='d-grid gap-2'>
                    <button className='btn btn-primary mt-3  '>
                        {todoEdit ? 'Actualizar tarea' : 'Agregar Tarea'}
                    </button>
                </div>
            </form>
            {
                error && (
                    <div className='alert alert-danger mt-2'>
                        {error}
                    </div>
                )

            },
            {
                succesMessage && (
                    <div className='alert alert-success mt-2'>
                        {succesMessage}
                    </div>
                )
            }



        </div>

    )
};
export default TodoForm;