import React,{useEffect, useState,useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { FaTools } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { PiNotepadFill } from "react-icons/pi";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { HiUsers,HiChartPie } from "react-icons/hi";
import DataContext from '../context/DataContext';
import { IoIosMegaphone } from "react-icons/io";

const SideBar = () => {
    const location = useLocation();
    const [tab,setTab] = useState('');
    const {setLoggedUser,loggedUser} = useContext(DataContext);

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
          setTab(tabFromUrl);
        }
        
      },[location.search]);

      const handleSignout = async () => {
        // try {
        //   const response = await fetch('/api/auth/logout', {
        //     method: 'POST',
        //   });
        //   if(response.status === 200){
        //     setLoggedUser(null);
        //     navigate('/signin');
        //  } 
         
        // } catch (error) {
          
        // }
      };




  return (
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
        <Sidebar.ItemGroup>
              <Link to='/?tab=dashboard'>
                    <Sidebar.Item  active={tab === 'dashboard' || !tab} icon={HiChartPie} as='div'>Dashboard</Sidebar.Item>
              </Link>
              <Link to='/?tab=categorias'>
                    <Sidebar.Item active={tab === 'categorias' || !tab}  icon={BiSolidCategory} as='div'>Categorias</Sidebar.Item>
              </Link>
              <Link to='/?tab=clientes'>
                    <Sidebar.Item active={tab === 'clientes' || !tab} icon={HiUsers} as='div'>Clientes</Sidebar.Item>
              </Link>
              <Link to='/?tab=profissionais'>
                    <Sidebar.Item active={tab === 'profissionais' || !tab} icon={FaTools} as='div'>Profissionais</Sidebar.Item>
              </Link>
              <Link to='/?tab=orcamentos'>
                    <Sidebar.Item active={tab === 'orcamentos' || !tab} icon={IoIosMegaphone} as='div'>Orçamentos</Sidebar.Item>
              </Link>
              <Link to='/?tab=transacoes'>
                    <Sidebar.Item active={tab === 'transacoes' || !tab}  icon={FaHandshake} as='div'>Transações</Sidebar.Item>
              </Link>
              <Link to='/?tab=parametros'>
                    <Sidebar.Item active={tab === 'parametros' || !tab}  icon={IoMdSettings} as='div'>Parâmetros</Sidebar.Item>
              </Link>
             
        </Sidebar.ItemGroup>
    </Sidebar.Items>
</Sidebar>
  )
}

export default SideBar