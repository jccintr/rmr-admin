import React, {useContext} from 'react';
import { Navbar, Button } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from "react-icons/fa";
import DataContext from '../context/DataContext';
import useTheme from '../context/ThemeContext';
import logo from '../assets/logo-500.png';
import Api from '../api/Api';

const Header = () => {
    const {themeMode,lightTheme,darkTheme} = useTheme();
    const {loggedUser,setLoggedUser} = useContext(DataContext);
    const path = useLocation().pathname;

    

   const onChangeColorMode = () => {
           if(themeMode === 'dark'){
               lightTheme();
           } else {
             darkTheme();
           }
    }

    const onLogout = async () => {
      
      const response = await Api.logout(loggedUser.token);
      if(response.status === 200){
        setLoggedUser(null);
        navigate('/signin');
      } else {
        alert('Falha ao fazer logout.');
      }
    }

  return (
    <Navbar className='border-b-2'>
        <div className='flex flex-row gap-2 items-center'>
        <img src={logo} alt='logo' className='w-12' />
         <p className="dark:text-gray-100 text-sm md:text-xl">RMR Part-Time</p>
        </div>
       
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 sm:inline' color='gray' pill onClick={()=>onChangeColorMode()}>
              {themeMode==='dark'?<FaSun/>:<FaMoon />}
            </Button>
            {loggedUser&&<Button gradientDuoTone='purpleToBlue' outline onClick={()=>onLogout()}>
                 Sair
               </Button>}
           
        </div>
       
    </Navbar>
  )
}

export default Header