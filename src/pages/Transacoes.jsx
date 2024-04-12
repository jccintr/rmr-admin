import React, { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import DataContext from '../context/DataContext';
import { Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import TableOrders from '../components/tables/TableOrders';

const Transacoes = () => {
  const [orders,setOrders] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {loggedUser} = useContext(DataContext)



  useEffect(()=>{
       
    const getOrders = async () => {
        setIsLoading(true);            
        let json = await Api.getOrders(loggedUser.token);
       setOrders(json);
        setIsLoading(false);
    }
    getOrders();
    
}, []);


  return (
    <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
       <div className='flex flex-col items-center w-full'>
          {orders.length>0?<div className='table-auto  w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
          <TableOrders orders={orders} />
          </div>:!isLoading?<h3 className='mt-10 text-gray-900 dark:text-white'>Transações não encontradas.</h3>:<Spinner className='mt-10' color="info" aria-label="Info spinner example" size="xl" />}
       </div>
   </div>
  )
}

export default Transacoes