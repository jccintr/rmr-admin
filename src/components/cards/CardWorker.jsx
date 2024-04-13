import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Button } from "flowbite-react";
import Api from '../../api/Api';
import Stars from '../Stars';
import { FaCrown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CardWorker = ({worker}) => {
  const navigate = useNavigate()
  return (
    <div className="w-[330px] md:w-[250px] lg:w-[300px] py-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
    
    <div className="flex flex-col items-center">
    {worker.user.avatar?<img className="mb-3 w-[60px] h-[60px] rounded-full shadow-lg" src={`${Api.base_storage}/${worker.user.avatar}`} alt="" />:<FaUserCircle className='text-gray-400 dark:text-white mb-3' size={60} />}
      
    <div className='flex flex-row gap-1 items-center'>
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{worker.user.name}</h5>
      {worker.user.isAdmin&&<FaCrown className="mb-1 text-amber-400" size={20} />}
    </div>
      <span className="mb-2 text-xs font-medium text-gray-900 dark:text-white">{worker.categoria.nome}</span>
      <Stars stars={worker.user.stars} showNumber={false}/>
      <span className="mt-3 text-sm text-gray-500 dark:text-gray-400">{worker.user.concelho.nome}</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">{worker.user.concelho.distrito.nome}</span>
      <Button size="sm" className='mt-4' color="blue" onClick={()=>navigate('/edit-worker',{state:{worker}})}>Editar</Button>
     
    </div>
  </div>
  )
}

export default CardWorker