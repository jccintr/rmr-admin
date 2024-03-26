import React,{useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Dashboard from './Dashboard';
import Categorias from './Categorias';
import Clientes from './Clientes';
import Profissionais from './Profissionais';
import Orcamentos from './Orcamentos';
import Transacoes from './Transacoes';
import Parametros from './Parametros';




const Home = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);


  return (
     <div className='min-h-screen flex flex-col md:flex-row dark:bg-slate-800'>
      <div className=''>
        <SideBar/>
      </div>
       {tab === 'dashboard' && <Dashboard />}
       {tab === 'categorias' && <Categorias />}
       {tab === 'clientes' && <Clientes />}
       {tab === 'profissionais' && <Profissionais />}
       {tab === 'orcamentos' && <Orcamentos />}
       {tab === 'transacoes' && <Transacoes />}
       {tab === 'parametros' && <Parametros />}
    </div>
  )
}

export default Home