import { useState,useContext, useEffect,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button,TextInput, Spinner,Label} from 'flowbite-react';
import DataContext from '../context/DataContext';
import Api from '../api/Api';
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

const Parametros = () => {
  const {loggedUser} = useContext(DataContext);
  const [formData, setFormData] =useState({});// useState({nome:cliente.name,email:cliente.email,telefone:cliente.telefone||'',avatar: cliente.avatar,distritoId: cliente.concelho.distrito_id,concelhoId: cliente.concelho_id, isAdmin: cliente.isAdmin});
  const [publishError, setPublishError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [isUpdating,setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const inputIvaRef = useRef();
  const inputClienteRef = useRef();
  const inputProfissionalRef = useRef();
  const inputWhatsRef = useRef();


  useEffect(()=>{ // como se fossem os estados
    const getParametros = async () => {
        setIsLoading(true);
        let response = await Api.getParametros(loggedUser.token);
        if (response.status === 200) {
            let json = await response.json();
            setFormData(json);
        } else {
          setPublishError('Falha ao obter dados.');
        }
        setIsLoading(false);
    }
    getParametros();
 },[]);

const onUpdate = async (e) => {


  //console.log(formData);
 
  setSuccessMessage(null);
  setPublishError(null);

  if (isNaN(formData.percentual_iva) || !Number.isInteger(Number(formData.percentual_iva)) || formData.percentual_iva<1) {
    setPublishError('O percentual do IVA deve ser um número inteiro maior do que zero.');
    inputIvaRef.current.focus();
    return;
  }

  if (isNaN(formData.percentual_cliente) || !Number.isInteger(Number(formData.percentual_cliente)) || formData.percentual_cliente<1) {
    setPublishError('O percentual do cliente deve ser um número inteiro maior do que zero.');
    inputClienteRef.current.focus();
    return;
  }

  if (isNaN(formData.percentual_profissional) || !Number.isInteger(Number(formData.percentual_profissional)) || formData.percentual_profissional<1) {
    setPublishError('O percentual do profissional deve ser um número inteiro maior do que zero.');
    inputProfissionalRef.current.focus();
    return;
  }

  if (isNaN(formData.telefone_whats) || !Number.isInteger(Number(formData.telefone_whats)) || formData.telefone_whats<1) {
    setPublishError('O número do WhatsApp deve conter apenas números.');
    inputWhatsRef.current.focus();
    return;
  }
 
 setIsUpdating(true);
const response = await Api.updateParametros(loggedUser.token,formData);
if (response.status===200) {
  setSuccessMessage('Parâmetros atualizados com sucesso.');
} else {
  
  let ret = await response.json();
   setPublishError(ret.erro);
}
setIsUpdating(false);
  
}

  return (
    <div className='flex-1 p-3 w-full justify-center items-center dark:bg-slate-800'>
      {!isLoading?(<>
      <h3 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Parâmetros</h3>
      <form  className='flex flex-col gap-4 mx-auto max-w-3xl'>
         <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="iva" value="Percentual do IVA:" />
            <TextInput ref={inputIvaRef} type='text' value={formData.percentual_iva} placeholder='Percentual do IVA' required id='iva' className='flex-1' onChange={(e) =>setFormData({ ...formData, percentual_iva: e.target.value })}/>
         </div>
         <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="cliente" value="Percentual do Cliente:" />
            <TextInput ref={inputClienteRef} type='text' value={formData.percentual_cliente} placeholder='Percentual do Cliente' required id='cliente' className='flex-1' onChange={(e) =>setFormData({ ...formData, percentual_cliente: e.target.value })}/>
         </div>
         <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="profissional" value="Percentual do Profissional:" />
            <TextInput ref={inputProfissionalRef} type='text' value={formData.percentual_profissional} placeholder='Percentual do Profissional' required id='profissional' className='flex-1' onChange={(e) =>setFormData({ ...formData, percentual_profissional: e.target.value })}/>
         </div>
         <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="whats" value="WhatsApp:" />
            <TextInput ref={inputWhatsRef} type='text' value={formData.telefone_whats} placeholder='WhatsApp' required id='whats' className='flex-1' onChange={(e) =>setFormData({ ...formData, telefone_whats: e.target.value })}/>
         </div>
         <Button onClick={onUpdate} gradientMonochrome="info" disabled={isUpdating}>{isUpdating ? <Spinner size='sm'/>:'SALVAR ALTERAÇÕES'}</Button>
         
         {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
         {successMessage && <Alert className='mt-5' color='success'>{successMessage}</Alert>}
         
      </form></>):<Spinner className='flex-1 w-full mt-10' color="info" aria-label="Info spinner example" size="xl" />}

    </div>
  )
}

export default Parametros