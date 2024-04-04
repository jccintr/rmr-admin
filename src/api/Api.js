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
    getCategoria: async (id) => {
        const req = await fetch(`${BASE_API}/categorias/${id}`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
    return json;
    },
   
    addCategoria: async (token,fd) => {
        const response = await fetch(`${BASE_API}/categorias`, {
            method: 'POST',
            headers: { 
             
            'Authorization': 'Bearer ' + token
            },

            body: fd
        });
        return response;
    },
    updateCategoria: async (token,fd,id) => {
        const response = await fetch(`${BASE_API}/categorias/${id}`, {
            method: 'POST',
            headers: { 
              'Authorization': 'Bearer ' + token
            },

            body: fd
     });
        return response;
    },
    getClientes: async (token) => {
        const response = await fetch(`${BASE_API}/clientes`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getCliente: async (token,id) => {
        const response = await fetch(`${BASE_API}/clientes/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getWorkers: async (token) => {
        const response = await fetch(`${BASE_API}/workers`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getDistritos: async () => {
        const req = await fetch(`${BASE_API}/distritos`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
        return json;
    },

    getConcelhos: async (idDistrito) => {
        const req = await fetch(`${BASE_API}/concelhos/${idDistrito}`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
        return json;
    },
    updateCliente: async (token,fd,id) => {
        const response = await fetch(`${BASE_API}/clientes/${id}`, {
            method: 'POST',
            headers: { 
              'Authorization': 'Bearer ' + token
            },

            body: fd
     });
        return response;
    },

    
};