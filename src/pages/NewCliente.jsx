import { useState,useContext, useEffect,useRef} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Button,Select, FileInput , TextInput, Spinner,Checkbox,Label} from 'flowbite-react';
import DataContext from '../context/DataContext';
import Api from '../api/Api';
import { FaUserCircle } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const NewCliente = () => {
    const {loggedUser} = useContext(DataContext);
    const [file, setFile] = useState(null);
    const [imagem, setImagem] = useState(null);
    const [imagemAtualizada, setImagemAtualizada] = useState(false);
    const [formData, setFormData] = useState({nome:'',email:'',password:'',password2:'',telefone:'',avatar: null,distritoId: 1,concelhoId: 1, isAdmin: false,nif:'',iban:''});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const [distritos,setDistritos] = useState([]);
    const [concelhos,setConcelhos] = useState([]);
    const inputFile = useRef(null);

    useEffect(()=>{ // como se fossem os estados
        const getDistritos = async () => {
            let jsonDistritos = await Api.getDistritos();
            setDistritos(jsonDistritos);
        }
        getDistritos();
     },[]);
     
     useEffect(()=>{ // como se fossem as cidades
       const getConcelhos = async (distritoId) => {
           let jsonConcelhos = await Api.getConcelhos(distritoId);
           setConcelhos(jsonConcelhos);
       }
       if (formData.distritoId) {
         getConcelhos(formData.distritoId);
       }
       
     },[formData.distritoId]);


     const onAdd = async (e) => {

          setPublishError(null);

          if (formData.nome.trim().length===0) {
            setPublishError('Informe o nome do cliente.');
            return;
          }

          if (formData.email.trim().length===0) {
            setPublishError('Informe o email do cliente.');
            return;
          }

          const validateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (!validateEmail.test(formData.email)) {
            setPublishError('Email inválido.');
            return;
          }
          

          if (formData.password.trim().length===0) {
            setPublishError('Informe a senha de acesso.');
            return;
          }

          if (formData.password !== formData.password2) {
            setPublishError('As senhas informadas são diferentes.');
            return;
          }

          if (formData.telefone.trim().length===0) {
            setPublishError('Informe o telefone do cliente.');
            return;
          }

          if (formData.concelhoId===null) {
            setPublishError('Selecione o Concelho.');
            return;
          }
          setIsLoading(true);
          const fd = new FormData();
          fd.append('name',formData.nome);
          fd.append('email',formData.email);
          fd.append('password',formData.password);
          fd.append('telefone',formData.telefone);
          fd.append('concelho_id',formData.concelhoId);
          fd.append('isAdmin',Number(formData.isAdmin));
          fd.append('nif',formData.nif);
          fd.append('iban',formData.iban);
          if(imagemAtualizada){
            fd.append('avatar',imagem);
          }

          const response = await Api.addCliente(loggedUser.token,fd);
         
          if (response.status === 201){
             navigate('/?tab=clientes');
          } else {
            let ret = await response.json();
            setPublishError(ret.erro);
          }
          setIsLoading(false);


     }


     const handleFile = (e) => {
        if(e.target.files[0]){
          setFile(URL.createObjectURL(e.target.files[0]));
          setImagem(e.target.files[0]);
          setImagemAtualizada(true);
          setFormData({ ...formData, avatar: e.target.files[0]});
        }
        
      }


  return (
    <div className='p-3 mx-auto min-h-screen dark:bg-slate-800'>
    <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Novo Cliente</h1>
    <form  className='flex flex-col gap-4 mx-auto max-w-3xl' encType="multipart/form-data">
        <div onClick={()=>{inputFile.current.click()}} className='flex flex-col gap-4 items-center justify-center'>
           {file?<img className="mb-3 w-[100px] h-[100px] rounded-full shadow-lg" src={file} alt="" />:
           (formData.avatar?<img className="mb-3 w-[100px] h-[100px] rounded-full shadow-lg" src={`${Api.base_storage}/${formData.avatar}`} alt="" />:
           <FaUserCircle className='text-gray-400 dark:text-white mb-3' size={100} />)}
          
           <input className='hidden' ref={inputFile}  accept='image/*' onChange={handleFile} type="file" />
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="nome" value="Nome:" />
            <TextInput type='text' value={formData.nome} placeholder='Nome do cliente' required id='nome'className='flex-1' onChange={(e) =>setFormData({ ...formData, nome: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="email" value="E-mail:" />
            <TextInput type='email' value={formData.email} placeholder='E-mail do cliente' required id='email'className='flex-1' onChange={(e) =>setFormData({ ...formData, email: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="password" value="Senha de Acesso:" />
            <TextInput icon={FaLock} type='password' value={formData.password} placeholder='Senha de acesso' required id='password' className='flex-1' onChange={(e) =>setFormData({ ...formData, password: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="password2" value="Confirme a Senha:" />
            <TextInput icon={FaLock} type='password' value={formData.password2} placeholder='Confirme a senha' required id='password2' className='flex-1' onChange={(e) =>setFormData({ ...formData, password2: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="telefone" value="Telefone:" />
            <TextInput type='text' value={formData.telefone} placeholder='Telefone do cliente' required id='telefone'className='flex-1' onChange={(e) =>setFormData({ ...formData, telefone: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="distrito" value="Distrito:" />
            <Select   value={formData.distritoId} id="distrito" onChange={(e) =>setFormData({ ...formData, distritoId: e.target.value })}>
              {distritos.map((distrito)=> <option key={distrito.id} value={distrito.id}>{distrito.nome}</option>)}
            </Select>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="concelho" value="Concelho:" />
            <Select id="concelho" value={formData.concelhoId} onChange={(e) =>setFormData({ ...formData, concelhoId: e.target.value })}>
              {concelhos.map((concelho)=> <option key={concelho.id} value={concelho.id}>{concelho.nome}</option>)}
            </Select>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="nif" value="NIF:" />
            <TextInput type='text' value={formData.nif} placeholder='NIF do cliente' required id='nif'className='flex-1' onChange={(e) =>setFormData({ ...formData, nif: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="iban" value="IBAN:" />
            <TextInput type='text' value={formData.iban} placeholder='IBAN do cliente' required id='iban'className='flex-1' onChange={(e) =>setFormData({ ...formData, iban: e.target.value })}/>
        </div>
        <div className='flex gap-4 sm:flex-row justify-start items-center'>
             <Checkbox id="isAdmin" checked={formData.isAdmin} onChange={e=>setFormData({...formData,isAdmin: !formData.isAdmin})} />
             <Label className='dark:text-gray-100' htmlFor="isAdmin">Administrador do Sistema</Label>
             <FaCrown className=" text-amber-400" size={20} />
        </div>
      <Button onClick={onAdd} gradientMonochrome="info" disabled={isLoading}>{isLoading ? <Spinner size='sm'/>:'ADICIONAR CLIENTE'}</Button>
      <Button onClick={()=> navigate('/?tab=clientes')} gradientMonochrome="failure" >CANCELAR</Button>
      {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
    </form>
    </div>
  )
}

export default NewCliente