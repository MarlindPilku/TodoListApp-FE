import axios from "axios";
const API_BASE_URL = 'https://marlind.pythonanywhere.com/api'

class TodoDataService{

    getAll(token){

        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.get(`${API_BASE_URL}/todos/`);
    }
    createTodo(data, token){
        axios.defaults.headers.common['Authorization'] = "Token " + token;
        return axios.post(`${API_BASE_URL}/todo/`,data)
    }

    updateTodo(id, data, token){
        axios.defaults.headers.common['Authorization'] = "Token " + token;
        return axios.put(`http://localhost:8000/api/todoos/${id}`,data, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    }

    deleteTodo(id, token){
        axios.defaults.headers.common['Authorization'] = "Token " + token;
        return axios.delete(`http://localhost:8000/api/todoos/${id}`)
    }

    completeTodo(id,token){
        axios.defaults.headers.common['Authorization'] = "Token " + token;
        return axios.put(`http://localhost:8000/api/todos/${id}/complete`)
    }

    login(data){
        return axios.post('http://localhost:8000/api/login/', data)
    }
    signup(data){
        return axios.post('http://localhost:8000/api/signup/', data)
    }
}

export default new TodoDataService();