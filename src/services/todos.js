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
        return axios.put(`${API_BASE_URL}/todoos/${id}`,data, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    }

    deleteTodo(id, token){
        axios.defaults.headers.common['Authorization'] = "Token " + token;
        return axios.delete(`${API_BASE_URL}/todoos/${id}`)
    }

    completeTodo(id,token){
        axios.defaults.headers.common['Authorization'] = "Token " + token;
        return axios.put(`${API_BASE_URL}/todos/${id}/complete`)
    }

    login(data){
        return axios.post(`${API_BASE_URL}/login/`, data)
    }
    signup(data){
        return axios.post(`${API_BASE_URL}/signup/`, data)
    }
}

const TodoDataService1 = new TodoDataService();
export default TodoDataService1;