import React, { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import DataContext from '../context/DataContext';
import CardWorker from '../components/cards/CardWorker';
import { CiSearch } from "react-icons/ci";
import { TextInput,Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';


const Profissionais = () => {
  const [workers,setWorkers] = useState([]);
  const [searchText,setSearchText] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {loggedUser} = useContext(DataContext)

  const workersFiltrado = workers.filter(
		worker => worker.user.name && worker.user.name.toLowerCase().includes(searchText.toLowerCase()),
	);

  useEffect(()=>{
       
    const getWorkers = async () => {
        setIsLoading(true);            
        let resp = await Api.getWorkers(loggedUser.token);
        if(resp.status === 200){
          let json = await resp.json();
           setWorkers(json);
        }
        
       setIsLoading(false);
    }
    getWorkers();
    
}, []);

  return (
    <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
    <div className='flex flex-col items-center'>
        <div className='flex w-full flex-col md:flex-row md:justify-end'>
            
            <TextInput type='text' placeholder='pesquisar...' rightIcon={CiSearch} className='mt-2 md:mt-0 lg:inline' onChange={e => setSearchText(e.target.value)}/>
        </div>
        
        {workersFiltrado.length>0?<div className='grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4 pb-4 mx-auto'>
          {workersFiltrado.map((worker)=><CardWorker key={worker.id} worker={worker}/>)}
        </div>:!isLoading?<h3 className='mt-10 text-gray-900 dark:text-white'>Profissionais não encontrados.</h3>:<Spinner className='mt-10' color="info" aria-label="Info spinner example" size="xl" />}
    </div>
   
</div>
  )
}

export default Profissionais