import React, {useContext} from 'react';
import { Navbar,TextInput, Button, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { FaMoon, FaSun } from "react-icons/fa";
import DataContext from '../context/DataContext';
import useTheme from '../context/ThemeContext';
import logo from '../assets/logo-500.png';

const Header = () => {
    const {themeMode,lightTheme,darkTheme} = useTheme();
    const {loggedUser,setLoggedUser} = useContext(DataContext);
    const path = useLocation().pathname;

    const handleSignout = async () => {
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
        });
        if(response.status === 200){
          setLoggedUser(null);
          navigate('/signin');
       } 
       
      } catch (error) {
        
      }
    };

   const onChangeColorMode = () => {
           if(themeMode === 'dark'){
               lightTheme();
           } else {
             darkTheme();
           }
    }

    const onLogout = () => {
      setLoggedUser(null);
      navigate('/signin');
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