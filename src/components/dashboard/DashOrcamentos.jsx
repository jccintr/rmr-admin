import React from 'react';
import { IoIosMegaphone } from "react-icons/io";

const DashOrcamentos = ({value}) => {
  return (
    <div className="w-[330px] md:w-[300px] mx-auto bg-orange-400 border border-gray-200 rounded-lg shadow  dark:border-gray-700 px-4 py-5">
      <div className='flex flex-row justify-between'>
            <IoIosMegaphone className='text-white' size={60}/>
            <div className='flex flex-col justify-around 00'>
                <span className='text-5xl text-right text-white'>{value}</span>
                <span className='text-base font-semibold text-white'>Oportunidades de Trabalho</span>
            </div>
      </div>
     
     </div>
  )
}

export default DashOrcamentos