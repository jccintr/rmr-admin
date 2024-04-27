import React, { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import CardCategorias from '../components/cards/CardCategorias';
import { CiSearch } from "react-icons/ci";
import { TextInput,Button,Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';


const Categorias = () => {
  const [categorias,setCategorias] = useState([]);
  const [searchText,setSearchText] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {loggedUser} = useContext(DataContext)

  const categoriasFiltrado = categorias.filter(
		categoria => categoria.nome && categoria.nome.toLowerCase().includes(searchText.toLowerCase()),
	);


  useEffect(()=>{
       
    const getCategorias = async () => {
        setIsLoading(true);            
        let json = await Api.getCategorias(loggedUser.token);
        setCategorias(json);
        setIsLoading(false);
    }
    getCategorias();
    
}, []);


  return (
          <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
              <div className='flex flex-col items-center'>
                  <div className='flex w-full flex-col md:flex-row md:justify-between'>
                      <Button color="blue" onClick={()=>navigate('/nova-categoria')}>Nova Categoria</Button>
                      <TextInput type='text' placeholder='pesquisar...' rightIcon={CiSearch} className='mt-2 md:mt-0 lg:inline' onChange={e => setSearchText(e.target.value)}/>
                  </div>
                  
                  {categoriasFiltrado.length>0?<div className='grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-4 pt-4 pb-4 mx-auto'>
                    {categoriasFiltrado.map((categoria)=><CardCategorias key={categoria.id} categoria={categoria}/>)}
                  </div>:!isLoading?<h3 className='mt-10 text-gray-900 dark:text-white'>Categoria não encontrada.</h3>:<Spinner className='mt-10' color="info" aria-label="Info spinner example" size="xl" />}
              </div>
             
          </div>
         
   
   
  )
}

export default Categorias