import React from 'react';

import { FaFileInvoiceDollar } from "react-icons/fa";

const DashPropostas = ({value}) => {
  return (
    <div className="w-[350px] md:w-[300px] bg-red-400 border border-gray-200 rounded-lg shadow  dark:border-gray-700 px-4 py-5">
      <div className='flex flex-row justify-between'>
            <FaFileInvoiceDollar className='text-white' size={60}/>
            <div className='flex flex-col justify-around 00'>
                <span className='text-5xl text-right text-white'>{value}</span>
                <span className='text-base font-semibold text-white'>Propostas Recebidas</span>
            </div>
      </div>
     
     </div>
  )
}

export default DashPropostas