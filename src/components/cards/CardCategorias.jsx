import React from 'react';
import Api from '../../api/Api';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const CardCategorias = ({categoria}) => {
    const navigate = useNavigate();
 
    return (
        <div className="w-[350px] md:w-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="w-full h-48 object-cover rounded-t-lg" src={`${Api.base_storage}/${categoria.imagem}`} alt="" />
        <div className="p-2">
                <a href="#">
                    <h5 className="mb-2 text-xl  tracking-tight text-gray-900 dark:text-white">{categoria.nome}</h5>
                </a>
                <Button size="sm" className='mt-4' color="blue" onClick={()=>navigate('/edit-categoria/'+categoria.id)}>Editar</Button>
            </div>
        </div>
   )
}

export default CardCategorias