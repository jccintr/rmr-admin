import { useState,useContext, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, FileInput, Textarea , TextInput, Spinner,Checkbox,Label} from 'flowbite-react';
import DataContext from '../context/DataContext';
import Api from '../api/Api';
import { FaUserCircle } from "react-icons/fa";
import CardCliente2 from '../components/cards/CardCliente2';
import TablePropostas from '../components/tables/TablePropostas';

const ViewOrcamento = () => {
  const {loggedUser} = useContext(DataContext);
  const [formData, setFormData] = useState({});
  const [cliente,setCliente] = useState({});
  const [distrito,setDistrito] = useState({});
  const [concelho,setConcelho] = useState({});
  const [propostas,setPropostas] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const { Id } = useParams();

  useEffect(()=>{
    const getOrcamento = async () => {
       
        let json = await Api.getOrcamento(loggedUser.token,Id);
        setCliente(json.user);
        setDistrito(json.distrito);
        setConcelho(json.concelho);
        setPropostas(json.propostas);
        setFormData(json);
       
    }
    getOrcamento();
}, []);

  return (
    <div className='p-3 mx-auto min-h-screen dark:bg-slate-800'>
        <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Detalhes do Orçamento</h1>
        <h3 className='text-center text-xl my-7 font-semibold dark:text-gray-100'>{formData.titulo}</h3>
        <h3 className='text-center text-lg my-7 font-semibold dark:text-gray-100'>Publicado em {new Date(formData.created_at).toLocaleDateString()} por</h3>
        
        <form  className='flex flex-col gap-4 mx-auto max-w-3xl' encType="multipart/form-data">
            <div className='flex flex-col gap-4 mx-auto sm:flex-row justify-center'>
               <CardCliente2 cliente={cliente}/>
            </div>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <Textarea id="descricao" disabled required placeholder="Descrição do orcamento..." value={formData.descricao} rows={4} onChange={(e) =>setFormData({ ...formData, descricao: e.target.value })} />
            </div>
            {formData.imagem&&<img src={`${Api.base_storage}/${formData.imagem}`} alt='image' className='w-full h-72 object-cover' />}
            <div className='flex flex-col gap-4 justify-between'>
               <Label htmlFor="endereco" value="Endereço:" />
               <TextInput disabled type='text' value={formData.logradouro+','+formData.numero} placeholder='Endereço' required id='endereco' className='flex-1' onChange={(e) =>setFormData({ ...formData, logradouro: e.target.value })}/>
            </div>
            <div className='flex flex-col gap-4 justify-between'>
               <Label htmlFor="distrito" value="Distrito:" />
               <TextInput disabled type='text' value={distrito.nome} placeholder='Distrito' required id='distrito' className='flex-1' />
            </div>
            <div className='flex flex-col gap-4 justify-between'>
               <Label htmlFor="concelho" value="Concelho:" />
               <TextInput disabled type='text' value={concelho.nome} placeholder='Concelho' required id='concelho' className='flex-1' />
            </div>
        </form>
       
        <div className='flex flex-col gap-4 justify-center xl:px-5 pb-2'>
        <h3 className='text-center text-xl my-7 font-semibold dark:text-gray-100'>{propostas.length>0?'Propostas Recebidas':'Nenhuma proposta recebida'}</h3>
        {propostas.length>0&&<TablePropostas propostas={propostas}/>}
        </div>
        <div className='flex flex-col gap-4 mx-auto max-w-3xl my-5'>
           <Button className='w-full' onClick={()=>navigate('/?tab=orcamentos')} gradientMonochrome="info" >VOLTAR</Button>
        </div>
        
    </div>
  )
}

export default ViewOrcamento