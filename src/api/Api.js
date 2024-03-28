// --host=192.168.0.107

const BASE_API = 'http://localhost:8000/api';
//const BASE_API = 'http://192.168.0.107:8000/api';
//const BASE_API = 'https://rmrparttime.com/api';



export default {
   
   base_storage: 'http://localhost:8000/storage',
 //   base_storage: 'https://rmrparttime.com/storage',
   // base_storage: 'http://192.168.0.107:8000/storage',
    
    

    getUser: async (token) => {
        const response = await fetch(`${BASE_API}/user`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },

    login: async (fd) => {
        const response = await fetch(`${BASE_API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fd)
        });
       // const json = await response.json();        
        return response;
    },
    getCategorias: async () => {
        const req = await fetch(`${BASE_API}/categorias`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
        return json;
    },

    
};