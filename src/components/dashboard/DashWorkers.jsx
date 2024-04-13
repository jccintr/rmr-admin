import React from 'react';
import { FaTools } from "react-icons/fa";

const DashWorkers = ({value}) => {
  return (
    <div className="w-[330px] md:w-[300px] mx-auto bg-green-400 border border-gray-200 rounded-lg shadow  dark:border-gray-700 px-4 py-5">
      <div className='flex flex-row justify-between'>
            <FaTools className='text-white' size={60}/>
            <div className='flex flex-col justify-around'>
                <span className='text-5xl text-right text-white'>{value}</span>
                <span className='text-base font-semibold text-white'>Profissionais Cadastrados</span>
            </div>
      </div>
     
     </div>
  )
}

export default DashWorkers