import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import Api from '../../api/Api';
import { Table,Button } from 'flowbite-react';


const TableDetOrder = ({order}) => {
 
  return (
    <Table hoverable className='shadow-md'>
            <Table.Head>
                  <Table.HeadCell>Item</Table.HeadCell>
                  <Table.HeadCell className='text-right'>Valor</Table.HeadCell>
                  
            </Table.Head>
            
              <Table.Body className='divide-y' key={order.id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell >Valor Orçamento:</Table.Cell>
                  <Table.Cell className='text-right'>{order.valor_proposta}</Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>Valor IVA:</Table.Cell>
                  <Table.Cell className='text-right'>{order.valor_iva}</Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>Taxa de Uso:</Table.Cell>
                  <Table.Cell className='text-right'>{order.valor_taxa_uso}</Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>A Receber do Cliente:</Table.Cell>
                  <Table.Cell className='text-right'>{order.valor_total_cliente}</Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>Taxa do Profissional:</Table.Cell>
                  <Table.Cell className='text-right'>{order.valor_taxa_profissional}</Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>Valor do Profissional:</Table.Cell>
                  <Table.Cell className='text-right'>{order.valor_profissional}</Table.Cell>
              </Table.Row>
            </Table.Body>
           
        </Table>
  )
}

export default TableDetOrder