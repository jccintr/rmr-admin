import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import Api from '../../api/Api';
import { Table,Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';


const TableOrcamentos = ({orcamentos}) => {
  const navigate = useNavigate();
  return (
    <Table hoverable className='shadow-md'>
            <Table.Head>
                  <Table.HeadCell>Data</Table.HeadCell>
                  <Table.HeadCell>Titulo</Table.HeadCell>
                  <Table.HeadCell className='hidden md:table-cell'>Cliente</Table.HeadCell>
                  <Table.HeadCell className='hidden md:table-cell'>Propostas</Table.HeadCell>
                  <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            {orcamentos.map((orcamento) => (
              <Table.Body className='divide-y' key={orcamento.id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(orcamento.created_at).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{orcamento.titulo}</Table.Cell>
                  <Table.Cell className='hidden md:table-cell'>

                    <div className='flex flex-row gap-2'>
                    {orcamento.user.avatar?<img className="w-[20px] h-[20px] rounded-full shadow-lg" src={`${Api.base_storage}/${orcamento.user.avatar}`} alt="" />:<FaUserCircle className='text-gray-400 dark:text-white' size={20} />}
                    {orcamento.user.name}
                    </div>
                   
                  </Table.Cell>
                  <Table.Cell className='hidden md:table-cell'>{orcamento.propostas.length}</Table.Cell>
                  <Table.Cell>
                     <Button size="xs"  color="blue" onClick={()=>navigate('/orcamento/' + orcamento.id)}>Detalhes</Button>
                  </Table.Cell>
              </Table.Row>
            </Table.Body>
              ))}
        </Table>
  )
}

export default TableOrcamentos