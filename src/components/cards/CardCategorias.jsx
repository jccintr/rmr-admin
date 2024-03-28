import React from 'react';
import Api from '../../api/Api';
import { Button } from 'flowbite-react';

const CardCategorias = ({categoria}) => {
 
    return (
    

<div class="w-[350px] md:w-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="w-full h-48 object-cover rounded-t-lg" src={`${Api.base_storage}/${categoria.imagem}`} alt="" />
    </a>
    <div class="p-2">
        <a href="#">
            <h5 class="mb-2 text-xl  tracking-tight text-gray-900 dark:text-white">{categoria.nome}</h5>
        </a>
        <button type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Editar</button>
        
    </div>
</div>

  )
}

export default CardCategorias