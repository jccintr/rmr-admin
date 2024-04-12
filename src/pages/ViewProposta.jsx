import { useNavigate, useLocation } from 'react-router-dom';
import { Button,Textarea , TextInput, Spinner,Label} from 'flowbite-react';
import CardWorker2 from '../components/cards/CardWorker2';
import { FaTrophy } from "react-icons/fa";



const ViewProposta = () => {
    const params = useLocation();
    const {proposta} = params.state;
    const navigate = useNavigate();

  return (
    <div className='p-3 mx-auto min-h-screen dark:bg-slate-800'>
        <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Detalhes da Proposta</h1>
        {proposta.aceita&&<FaTrophy className='mx-auto text-amber-400' size={40}/>}
        {proposta.aceita&&<h3 className='text-center text-lg my-7 font-semibold dark:text-gray-100'>Proposta Vencedora</h3>}
        <h3 className='text-center text-lg my-7 font-semibold dark:text-gray-100'>Enviada em {new Date(proposta.created_at).toLocaleDateString()} por</h3>
        <form  className='flex flex-col gap-4 mx-auto max-w-3xl' encType="multipart/form-data">
           <div className='flex flex-col gap-4 mx-auto sm:flex-row justify-center'>
               <CardWorker2 worker={proposta.user}/>
           </div>
           <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <Textarea id="resposta" disabled required placeholder="Descrição da proposta..." value={proposta.resposta} rows={4}  />
            </div>
            <div className='flex flex-col gap-4 justify-between'>
               <Label htmlFor="valor" value="Valor da Proposta:" />
               <TextInput disabled type='text' value={proposta.valor} placeholder='Valor' required id='valor' className='flex-1' />
            </div>
            <Button onClick={()=>navigate(-1)} gradientMonochrome="info" >VOLTAR</Button>
        </form>
    </div>
  )
}

export default ViewProposta