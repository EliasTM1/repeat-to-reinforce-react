import React from 'react'

const Todo = ({ todo, toggleTodo }) => {

    const handleSwitch = () => {
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label>
                <input type='checkbox' checked={todo.completed} onChange={handleSwitch} />
                {todo.name}
            </label>
        </div>
    )
}

export default Todo