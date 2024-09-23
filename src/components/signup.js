import React, {useState} from "react";
import '../App.css'
import {useNavigate} from "react-router-dom";

// komponentet e bootstrapit
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
function Signup({signup}){
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
    function onSignUp(e){
        // MEtoda re versioni 6
        e.preventDefault();
        signup({ username, password });
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
            </Form>
            <Button variant='primary' onClick={onSignUp}>Sign Up</Button>
        </Container>
    )
}

export default Signup;