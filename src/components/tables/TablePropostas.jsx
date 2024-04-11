import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import Api from '../../api/Api';
import { Table,Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { FaTrophy } from "react-icons/fa";

const TablePropostas = ({propostas}) => {
  const navigate = useNavigate();
  
  return (
    <Table hoverable className='shadow-md'>
    <Table.Head>
          <Table.HeadCell>Data</Table.HeadCell>
          <Table.HeadCell>Profissional</Table.HeadCell>
          <Table.HeadCell className='hidden md:table-cell'>Valor</Table.HeadCell>
          <Table.HeadCell className='hidden md:table-cell'>Aceita</Table.HeadCell>
          
          <Table.HeadCell></Table.HeadCell>
    </Table.Head>
    {propostas.map((proposta) => (
      <Table.Body className='divide-y' key={proposta.id}>
      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
          <Table.Cell>{new Date(proposta.created_at).toLocaleDateString()}</Table.Cell>
          <Table.Cell>
            <div className='flex flex-row gap-2'>
                {proposta.user.avatar?<img className="w-[20px] h-[20px] rounded-full shadow-lg" src={`${Api.base_storage}/${proposta.user.avatar}`} alt="" />:<FaUserCircle className='text-gray-400 dark:text-white' size={20} />}
                {proposta.user.name}
                </div>
          </Table.Cell>
          <Table.Cell className='hidden md:table-cell'>{proposta.valor}</Table.Cell>
          <Table.Cell className='hidden md:table-cell'>{proposta.aceita?<FaTrophy className='text-amber-400' size={20}/>:''}</Table.Cell>
          <Table.Cell>
             <Button size="xs"  color="blue" onClick={()=>navigate('/proposta',{state:{proposta}})}>Detalhes</Button>
          </Table.Cell>
      </Table.Row>
    </Table.Body>
      ))}
</Table>
  )
}

export default TablePropostas