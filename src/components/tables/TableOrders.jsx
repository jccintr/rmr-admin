import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import Api from '../../api/Api';
import { Table,Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';


const TableOrders = ({orders}) => {
  const navigate = useNavigate();
  return (
    <Table hoverable className='shadow-md'>
            <Table.Head>
                  <Table.HeadCell>Data</Table.HeadCell>
                  <Table.HeadCell className='hidden md:table-cell'>Cliente</Table.HeadCell>
                  <Table.HeadCell>Valor</Table.HeadCell>
                  <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            {orders.map((order) => (
              <Table.Body className='divide-y' key={order.id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(order.created_at).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className='hidden md:table-cell'>

                    <div className='flex flex-row gap-2'>
                    {order.orcamento.user.avatar?<img className="w-[20px] h-[20px] rounded-full shadow-lg" src={`${Api.base_storage}/${order.orcamento.user.avatar}`} alt="" />:<FaUserCircle className='text-gray-400 dark:text-white' size={20} />}
                    {order.orcamento.user.name}
                    </div>
                   
                  </Table.Cell>
                  <Table.Cell>{order.valor_total_cliente}</Table.Cell>
                  <Table.Cell>
                     <Button size="xs"  color="blue" onClick={()=>navigate('/order',{state:{order}})}>Detalhes</Button>
                  </Table.Cell>
              </Table.Row>
            </Table.Body>
              ))}
        </Table>
  )
}

export default TableOrders