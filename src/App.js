// Dependencies
//import './App.css';
import React from "react";
import {Route, Link, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

// Components import
import TodoList from "./components/todo-list";
import Login from "./components/login";
import Signup from "./components/signup";
import AddTodo from "./components/add-todos";

// For design
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Navbar";

// sherbimi qe merr te dhenat nga backendi - kamarieri
import TodoDataService from './services/todos'

function App() {

    const [user, setUser] = React.useState(localStorage.getItem('user') || null) // extra
    const [token, setToken] = React.useState(localStorage.getItem('token') || null)
    const [error, setError] = React.useState()

    async function login(user=null
    ){
        TodoDataService.login(user).then(response=>{
            setToken(response.data.token);
            setUser(user.username)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', user.username)
            setError('');
        }).catch(e=>{
            console.log('login ', e);
            setError(e.toString());
        });
    }

    async function logout(){
        setToken('')
        setUser('')
        localStorage.setItem('token', '')
        localStorage.setItem('user', '')
    }

    async function signup(user=null){
        TodoDataService.signup(user).then(response=>{
            setToken(response.data.token);
            setUser(user.username)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', user.username)
            setError('');
        }).catch(e=>{
            console.log(e);
            setError(e.toString());
        });
    }

  return (
    <div className="App">
        <Navbar bg='primary' variant='dark'>
            <div className='container-fluid'>
                <Navbar.Brand>TodosAPP</Navbar.Brand>
                <Nav className='me-auto'>
                    <Container>
                        <Link to={"/todos"} className='nav-link'>Todos</Link>
                        { user ?
                            (<Link className='nav-link' onClick={logout}>Logout ({user})</Link>) :
                            (
                                <>
                                <Link to={"/login"} className='nav-link'>Login</Link>
                                <Link to={"/signup"} className='nav-link'>Signup</Link>
                                </>
                            )
                        }
                    </Container>
                </Nav>
            </div>
        </Navbar>
        <div className='container mt-4'>
            {/*<Routes>
                <Route exact path={['/','/todos']} render={(props)=>
                <TodoList {...props} token={token}/>
                }></Route>
                <Route path='/todos/create' render={(props)=>
                <AddTodo {...props} token={token}/>}></Route>
                <Route path='/todos/:id' render={(props)=>
                <AddTodo {...props} token={token}/>}></Route>
                <Route path='/login' render={(props)=>
                <Login {...props} login={login}/>}></Route>
                <Route path='/signup' render={(props)=>
                <Signup {...props} signup={signup}/>}></Route>
            </Routes>*/}
            <Routes>
              <Route path="/" element={<TodoList token={token} user={user} />} />
              <Route path="/todos" element={<TodoList token={token} user={user} />} />
              <Route path="/todos/create" element={<AddTodo token={token} />} />
              <Route path="/todos/:id" element={<AddTodo token={token} />} />
              <Route path="/login" element={<Login login={login} />} />
              <Route path="/signup" element={<Signup signup={signup} />} />
            </Routes>
        </div>
        <footer className='text-center text-lg-start bg-light text-muted mt-4'>
            <div className='text-center p-4'>
                Copyright - <a target='_blank' className='text-reset fw-bold text-decoration-none' href='#'>MINE</a>
            </div>
        </footer>
    </div>
  );
}

export default App;
