import { useState,useContext, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, FileInput, Textarea , TextInput, Spinner,Checkbox,Label} from 'flowbite-react';
import DataContext from '../context/DataContext';
import Api from '../api/Api';

const EditCategoria = () => {
    const {loggedUser} = useContext(DataContext);
    const [file, setFile] = useState(null);
    const [imagem, setImagem] = useState(null);
    const [imagemAtualizada, setImagemAtualizada] = useState(false);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const { Id } = useParams();


    useEffect(()=>{
        const getCategoria = async () => {
           
            let json = await Api.getCategoria(Id);
            setFormData({nome: json.nome,descricao: json.descricao, imagem: json.imagem, ativo: json.ativo});
            setFile(`${Api.base_storage}/${json.imagem}`);
        }
        getCategoria();
    }, []);

    const onUpdate = async (e) => {

        if (formData.nome.trim().length===0) {
          setPublishError('Informe o nome da categoria.');
          return;
        }
  
        if (formData.descricao.trim().length===0) {
          setPublishError('Informe a descrição da categoria.');
          return;
        }
  
        if (!file) {
          setPublishError('selecione uma imagem para a categoria.');
          return;
        }
        setIsLoading(true);
        const fd = new FormData();
        fd.append('nome',formData.nome);
        fd.append('descricao',formData.descricao);
        fd.append('ativo',Number(formData.ativo));
        if(imagemAtualizada){
            fd.append('imagem',imagem);
        }
      
      
        const response = await Api.updateCategoria(loggedUser.token,fd,Id);
         
        if (response.status === 200){
           navigate('/?tab=categorias');
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
          setFormData({ ...formData, imagem: e.target.files[0]});
        }
        
      }

  return (
    <div className='p-3 mx-auto min-h-screen dark:bg-slate-800'>
    <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Editando Categoria</h1>
    <form  className='flex flex-col gap-4 mx-auto max-w-3xl' encType="multipart/form-data">
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' value={formData.nome} placeholder='Nome da categoria' required id='nome'className='flex-1' onChange={(e) =>setFormData({ ...formData, nome: e.target.value })}/>
        </div>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <Textarea id="descricao" required placeholder="Descrição da categoria..." value={formData.descricao} rows={4} onChange={(e) =>setFormData({ ...formData, descricao: e.target.value })} />
        </div>
        <div className='flex gap-4 sm:flex-row justify-start items-center'>
             <Checkbox id="ativo" checked={formData.ativo} onChange={e=>setFormData({...formData,ativo: !formData.ativo})} />
             <Label className='dark:text-gray-100' htmlFor="ativo">Ativo</Label>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
           <span className='dark:text-gray-100'>Imagem da Categoria:</span>
           <FileInput type='file' accept='image/*' onChange={handleFile} />
       </div>
      {file&&<img src={file} alt='uploaded umage' className='w-full h-72 object-cover' />}
      <Button onClick={onUpdate} gradientMonochrome="info" disabled={isLoading}>{isLoading ? <Spinner size='sm'/>:'ATUALIZAR CATEGORIA'}</Button>
      <Button onClick={()=> navigate('/?tab=categorias')} gradientMonochrome="failure" >CANCELAR</Button>
      {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
    </form>
    </div>
  )
}

export default EditCategoria