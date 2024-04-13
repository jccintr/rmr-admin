import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Button } from "flowbite-react";
import Api from '../../api/Api';
import { useNavigate } from 'react-router-dom';
import { FaCrown } from "react-icons/fa";

const CardCliente = ({cliente}) => {
  const navigate = useNavigate()
  return (
    <div className="w-[330px] md:w-[250px] lg:w-[300px] py-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
    
    <div className="flex flex-col items-center">
    {cliente.avatar?<img className="mb-3 w-[60px] h-[60px] rounded-full shadow-lg" src={`${Api.base_storage}/${cliente.avatar}`} alt="" />:<FaUserCircle className='text-gray-400 dark:text-white mb-3' size={60} />}
      
      <div className='flex flex-row gap-1 items-center'>
         <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{cliente.name}</h5>
          {cliente.isAdmin&&<FaCrown className="mb-1 text-amber-400" size={20} />}
      </div>
      
      
      <span className="text-sm text-gray-500 dark:text-gray-400">{cliente.concelho.nome}</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">{cliente.concelho.distrito.nome}</span>
      <Button size="sm" className='mt-4' color="blue" onClick={()=>navigate('/edit-cliente',{state:{cliente}})}>Editar</Button>
     
    </div>
  </div>
  )
}

export default CardCliente