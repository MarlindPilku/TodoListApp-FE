import React, {useState, useEffect} from "react";
//import '../App.css'
// v6 changes
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import TodoDataService from '../services/todos';
import {Link} from 'react-router-dom';
// UI
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddTodo({token}){

    /* v5
    let editing = false;
    let initialTodoTitle = '';
    let initialTodoMenu = '';*/
    // v6
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    // v6
    const initialTodoState = {
        id: null,
        title: "",
        memo: "",
        completed: false
      };

    /* v5
    const [title, setTitle] = useState();
    const [memo, setMemo] = useState();
    const [submitted, setSubmitted] = useState(false);*/
    //v6
    const [todo, setTodo] = useState(initialTodoState);
    const [submitted, setSubmitted] = useState(false);
    // v6
    useEffect(() => {
    if (params.id) {
      getTodo(params.id);
    }
  }, [params.id]);

  const getTodo = id => {
    TodoDataService.getAll(token)
      .then(response => {
        const selectedTodo = response.data.find(item => item.id === parseInt(id));
        if (selectedTodo) {
          setTodo(selectedTodo);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };


    /* v5
    if(props.location.state && props.location.state.currentTodo){
        editing = true;
        initialTodoTitle = props.location.state.currentTodo.title;
        initialTodoMenu = props.location.state.currentTodo.memo;
    }*/
    /* v5
    function onChangeTitle(e){
        const title = e.target.value;
        setTitle(title);
    }

    function onChangeMemo(e){
        const memo = e.target.value;
        setMemo(memo);
    }*/
    // v6
    const handleInputChange = event => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };
    /*const saveTodo = () =>{
        let data = {
            title: title,
            memo: memo,
            completed: false,
        }

        if(editing){
            TodoDataService.updateTodo(props.location.state.currentTodo.id, data, props.token).then(response =>
            {
                setSubmitted(true);
                console.log(response.data);
            }).catch(e=>{
                console.log(e)
            })
        }
        else {
           TodoDataService.createTodo(data, props.token).then(
            response => {
                setSubmitted(true);
            }
        ).catch(e=>{
            console.log(e);
        });
        }}*/
    //v6
    const saveTodo = () => {
    var data = {
      title: todo.title,
      memo: todo.memo,
      completed: todo.completed
    };

    if (params.id) {
      TodoDataService.updateTodo(params.id, data, token)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      TodoDataService.createTodo(data, token)
        .then(response => {
          setSubmitted(true);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

    return(
        <Container>
            {submitted ? (
                <div>
                    <h4>Todo submitted succesfully</h4>
                    <Link to={'/todos'} >Back to Todos</Link>
                </div>
            ) : (
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            {params.id ? 'Edit' : 'Create'} Todo
                        </Form.Label>
                        <Form.Control type='text' required placeholder='eg buy gift tomorrow' name='title' value={todo.title} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control as='textarea' rows={3} placeholder='eg buy gift tomorrow' name='memo' value={todo.memo} onChange={handleInputChange}/>
                    </Form.Group>
                    <Button variant='info' onClick={saveTodo}>{params.id ? "Update" : "Add"}</Button>
                </Form>
            )}
        </Container>
    )
}

export default AddTodo;