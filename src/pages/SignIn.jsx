import { Button, Label, TextInput,Alert, Spinner } from 'flowbite-react';
import React, {useState,useContext} from 'react';
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-500.png';
import Api from '../api/Api';



const SignIn = () => {
    const {setLoggedUser} = useContext(DataContext);
    const [formData,setFormData] = useState({});
    const [errorMessage,setErrorMessage] = useState(null);
    const [loading,setLoading] = useState(false);
    
    const navigate = useNavigate();
  
    const handleChange = (e) => {
         setFormData({...formData,[e.target.id]: e.target.value.trim()});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!formData.email || !formData.password) {
          setErrorMessage('Preencha todos os campos por favor.');
          return;
        }
    
        try {
          setLoading(true);
          setErrorMessage(null);
          
         
          const res = await Api.login(formData);
          //
          if(res.status===200){
             setLoading(false);
             let jsonUser = await res.json();
             setLoggedUser(jsonUser);
             navigate('/?tab=dashboard');
          } else {
            console.log(await res.json());
            setLoading(false);
            setErrorMessage('Email e ou senha inválidos.');
             return;
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }


  return (
    <div className='min-h-screen pt-20 md:pt-40  dark:bg-slate-800'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'> 
              <img src={logo} alt='logo' className='w-44 md:w-2/3  m-auto md:m-0' />
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email'/> 
              <TextInput type='email' placeholder='Seu email' id="email" onChange={handleChange}/>
            </div>
            <div>
              <Label value='Senha'/>
              <TextInput type='password' placeholder='Sua senha' id="password" onChange={handleChange}/>
            </div>
            <Button gradientMonochrome="info"  type='submit' disabled={loading}>
              {
                loading ? <Spinner size='sm'/>: 'ENTRAR'
                }
              </Button>
             
              
          </form>
          
          {
          errorMessage&&<Alert className="mt-5" color='failure'>
            {errorMessage}
          </Alert>
        }
        </div>
    </div>
  </div>
  )
}

export default SignIn
