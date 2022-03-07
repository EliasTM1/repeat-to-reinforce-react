import React from 'react'
// * Styles
import './Homepage.styles.scss'
//  * Components
import Todo from '../components/Todo'

const Homepage = ({ todo, toggleTodo }) => {
    return (
        todo.map(todo => {
            return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        })
    )
}

// <div>
//     <Todo></Todo>
// </div>
export default Homepage