import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
//import '../App.css';
// komponentet e bootstrapit
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
function Login({login}){ //nga props to login
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    function onChangeName(e){
        const username = e.target.value;
        setUsername(username);
    }

    function onChangePassword(e){
        const password = e.target.value;
        setPassword(password)
    }

    function onLogin(e){
        /* metoda vjeter v5
        props.login({username: username, password: password});
        props.history.push('/')*/
        // MEtoda re versioni 6
        e.preventDefault();
        login({ username, password });
        navigate('/');
    }
    return(
        <Container>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter username' value={username} onChange={onChangeName}/>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={onChangePassword}/>
                </Form.Group>
                <Button variant='primary' onClick={onLogin}>Login</Button>
            </Form>
        </Container>
    )
}

export default Login;