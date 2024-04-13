import React, { useEffect,useState,useContext } from 'react';
import DashClientes from '../components/dashboard/DashClientes';
import DashWorkers from '../components/dashboard/DashWorkers';
import DashOrcamentos from '../components/dashboard/DashOrcamentos';
import DashPropostas from '../components/dashboard/DashPropostas';
import Api from '../api/Api';
import DataContext from '../context/DataContext';
import { Spinner} from 'flowbite-react';


const Dashboard = () => {
  const [dashboard,setDashboard] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const {loggedUser} = useContext(DataContext)

  useEffect(()=>{
       
    const getDashboard = async () => {
        setIsLoading(true);            
        let resp = await Api.getDashboardData(loggedUser.token);
        //console.log(resp.status);
        if (resp.status === 200){
           let json = await resp.json();
           setDashboard(json);
        }
        
       setIsLoading(false);
    }
    getDashboard();
    
}, []);

  return (
    <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
      <div className='flex flex-col items-center'>
     
        {!isLoading?<div className='grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4 pb-4 mx-auto'>
          
            <DashClientes value={dashboard.clientes}/>
            <DashWorkers value={dashboard.workers}/>
            <DashOrcamentos value={dashboard.orcamentos}/>
            <DashPropostas value={dashboard.propostas}/>
           
        </div>:<Spinner className='mt-10' color="info" aria-label="Info spinner example" size="xl" />}
      </div>
      
    </div>
  )
}

export default Dashboard