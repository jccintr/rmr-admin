import React from 'react';
import { HiUsers } from "react-icons/hi";

const DashClientes = ({value}) => {
  return (
    <div className="w-[330px] md:w-[300px]  mx-auto bg-blue-500 border border-gray-200 rounded-lg shadow  dark:border-gray-700 px-4 py-5">
      <div className='flex flex-row justify-between'>
            <HiUsers className='text-white' size={75}/>
            <div className='flex flex-col justify-around'>
                <span className='text-5xl text-right text-white'>{value}</span>
                <span className='text-lg font-semibold text-white'>Clientes Cadastrados</span>
            </div>
      </div>
     
     </div>
  )
}

export default DashClientes