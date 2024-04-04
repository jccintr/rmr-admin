import { useState,useContext, useEffect,useRef} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Button,Select, FileInput, Textarea , TextInput, Spinner,Checkbox,Label} from 'flowbite-react';
import DataContext from '../context/DataContext';
import Api from '../api/Api';
import { FaUserCircle } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";

const EditCliente = () => {
    const {loggedUser} = useContext(DataContext);
    const params = useLocation();
    const {cliente} = params.state;
    const [file, setFile] = useState(null);
    const [imagem, setImagem] = useState(null);
    const [imagemAtualizada, setImagemAtualizada] = useState(false);
    const [formData, setFormData] = useState({nome:cliente.name,email:cliente.email,telefone:cliente.telefone||'',avatar: cliente.avatar,distritoId: cliente.concelho.distrito_id,concelhoId: cliente.concelho_id, isAdmin: cliente.isAdmin});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const [distritos,setDistritos] = useState([]);
    const [concelhos,setConcelhos] = useState([]);
    const inputFile = useRef(null);
    //const [categorias,setCategorias] = useState([]);
   // console.log(cliente);
   // console.log(formData);

    // useEffect(()=>{
       
    //     const getCategorias = async () => {
    //         setIsLoading(true);            
    //         let json = await Api.getCategorias();
    //         setCategorias(json);
    //        setIsLoading(false);
    //     }
    //     getCategorias();
        
    // }, []);

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

     const onUpdate = async (e) => {
      console.log(formData);
      if (formData.nome.trim().length===0) {
        setPublishError('Informe o nome do cliente.');
        return;
      }

      if (formData.telefone.trim().length===0) {
        setPublishError('Informe o telefone do cliente.');
        return;
      }

      setIsLoading(true);
      const fd = new FormData();
      fd.append('nome',formData.nome);
      fd.append('telefone',formData.telefone);
      fd.append('concelho_id',formData.concelhoId);
      fd.append('isAdmin',Number(formData.isAdmin));
       if(imagemAtualizada){
         fd.append('avatar',imagem);
       }

      const response = await Api.updateCliente(loggedUser.token,fd,cliente.id);
         
      if (response.status === 200){
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
    <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Editando Cliente</h1>
    
    
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
            <TextInput type='text'disabled value={formData.email} placeholder='E-mail do cliente' required id='email'className='flex-1' onChange={(e) =>setFormData({ ...formData, email: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="telefone" value="Telefone:" />
            <TextInput type='text' value={formData.telefone} placeholder='Telefone do cliente' required id='telefone'className='flex-1' onChange={(e) =>setFormData({ ...formData, telefone: e.target.value })}/>
        </div>
        {/*<div className='flex flex-col gap-4 justify-between'>
            <Label htmlFor="categoria" value="Categoria:" />
            <Select id="categoria" onChange={(e) =>setFormData({ ...formData, category: e.target.value })}>
              {categorias.map((categoria)=> <option value={categoria.id}>{categoria.nome}</option>)}
            </Select>
  </div>*/}
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
        <div className='flex gap-4 sm:flex-row justify-start items-center'>
             <Checkbox id="isAdmin" checked={formData.isAdmin} onChange={e=>setFormData({...formData,isAdmin: !formData.isAdmin})} />
             <Label className='dark:text-gray-100' htmlFor="isAdmin">Administrador do Sistema</Label>
             <FaCrown className=" text-amber-400" size={20} />
        </div>
      <Button onClick={onUpdate} gradientMonochrome="info" disabled={isLoading}>{isLoading ? <Spinner size='sm'/>:'ATUALIZAR CLIENTE'}</Button>
      <Button onClick={()=> navigate('/?tab=clientes')} gradientMonochrome="failure" >CANCELAR</Button>
      {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
    </form>
    </div>
  )
}

export default EditCliente