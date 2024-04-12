import { useNavigate, useLocation } from 'react-router-dom';
import { Button,Textarea , TextInput, Spinner,Label} from 'flowbite-react';
import TableDetOrder from '../components/tables/TableDetOrder';

const ViewTransacao = () => {
    const params = useLocation();
    const {order} = params.state;
    const navigate = useNavigate();

  return (
    <div className='p-3 mx-auto min-h-screen dark:bg-slate-800'>
        <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Detalhes da Transação</h1>
        <form  className='flex flex-col gap-4 mx-auto max-w-3xl' >
            <div className='flex flex-col gap-4 justify-between'>
               <Label htmlFor="data" value="Data:" />
               <TextInput disabled type='text' value={new Date(order.created_at).toLocaleDateString()} placeholder='Data' required id='data' className='flex-1' />
            </div>
            <div className='flex flex-col gap-4 justify-between'>
               <Label htmlFor="cliente" value="Cliente:" />
               <TextInput disabled type='text' value={order.orcamento.user.name} placeholder='Cliente' required id='data' className='flex-1' />
            </div>
            <div className='flex flex-col gap-4 justify-between'>
               <Label htmlFor="pi" value="Identificador do Pagamento:" />
               <TextInput disabled type='text' value={order.payment_intent} placeholder='Pi' required id='data' className='flex-1' />
            </div>
            <h3 className='text-center text-lg my-7 font-semibold dark:text-gray-100'>Valores</h3>
            <TableDetOrder order={order}/>
            <Button onClick={()=>navigate(-1)} gradientMonochrome="info" >VOLTAR</Button>
        </form>
    </div>
  )
}

export default ViewTransacao