import React, {useState, useEffect} from "react";
//import '../App.css'

import TodoDataService from '../services/todos';
import {Link} from 'react-router-dom';
// UI
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// Date formating
import moment from "moment";
function TodoList({token, user}){
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        //retrieveTodos();

  if (user && token) {
    retrieveTodos();
  } else {
    console.log('No token available');
    setTodos([])
  }
    },[token, user]);

    const retrieveTodos = () =>{

        TodoDataService.getAll(token).then(response => {
            setTodos(response.data);
        }).catch(e=>{console.log(e);
         console.error('Error retrieving todos:', e.response ? e.response.data : e);});
    }

    const deleteTodo=(todoId)=>{
        TodoDataService.deleteTodo(todoId, token).then(response => {
            retrieveTodos()
        }).catch(e=>{
            console.log(e);
        })
    }

    const completeTodo = (todoId) => {
        TodoDataService.completeTodo(todoId,token).then(response => {
            retrieveTodos();
            console.log('completeTodo ', todoId);
        }).catch(e=>{
            console.log(e);
        })
    }

    return(
        <Container>
            <h3>TODOS</h3>
            {user === null ? null :
            <Link to={'/todos/create'}>
                <Button variant= 'outline-info' className='mb-3'>
                    Add To-do
                </Button>
            </Link>
            }

            {todos.map((todo)=>{
                return(
                    <Card key={todo.id} className='mb-3'>
                        <Card.Body>
                            <div className={todo.completed ? 'text-decoration-line-through' : ""}>
                                <Card.Title>
                                    {todo.title}
                                </Card.Title>
                                <Card.Text><b>Memo:</b> {todo.memo}</Card.Text>
                                <Card.Text>Date created: {moment(todo.created).format("Do MMMM YYYY")}</Card.Text>
                            </div>
                            {
                                !todo.completed &&
                                <Link to={{pathname: '/todos/' + todo.id, state: {currentTodo: todo}}}>
                                <Button variant='outline-info' className='me-2'>
                                    Edit
                                </Button>
                                </Link>
                            }

                            <Button variant='outline-danger' onClick={()=>deleteTodo(todo.id)}>
                                Delete
                            </Button>
                            <Button variant='outline-success' onClick={()=>completeTodo(todo.id)}>
                                Complete
                            </Button>
                        </Card.Body>
                    </Card>
                )
            })}
        </Container>
    )
}

export default TodoList;