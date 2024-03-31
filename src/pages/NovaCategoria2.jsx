import { useState,useContext,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, FileInput, Textarea , TextInput } from 'flowbite-react';
import DataContext from '../context/DataContext';
import Api from '../api/Api';


const NovaCategoria2 = () => {
    const {loggedUser} = useContext(DataContext);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
    const imgRef = useRef();


    const handleSubmit = async (e) => {

      e.preventDefault();
      setPublishError(null);
      console.log(formData);
     
      if (!file) {
        setPublishError('selecione a porra da imagem');
        return;
      }
      try {
       
        const response = await Api.addCategoria(loggedUser.token,formData);
       
        if (response.status === 201){
          setPublishError(null);
          const post = await response.json();
          navigate('/?tab=categorias');
        } else {
          setPublishError('Deu merda !');
        }
   
      } catch (error) {
        setPublishError('Something went wrong');
      }

    }

    const handleFile = (e) => {
      if(e.target.files[0]){
        setFile(URL.createObjectURL(e.target.files[0]));
        setFormData({ ...formData, imagem: e.target.files[0]});
      }
      
    }

  return (
    <div className='p-3 mx-auto min-h-screen dark:bg-slate-800'>
      <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Nova Categoria</h1>
      <form  className='flex flex-col gap-4 mx-auto max-w-3xl' onSubmit={handleSubmit} >
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              <TextInput type='text' placeholder='Nome da categoria' required id='nome'className='flex-1' onChange={(e) =>setFormData({ ...formData, nome: e.target.value })}/>
          </div>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              <Textarea id="descricao" required placeholder="Descrição da categoria..."  rows={4} onChange={(e) =>setFormData({ ...formData, descricao: e.target.value })} />
          </div>
          <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
             <span className='dark:text-gray-100'>Imagem da Categoria:</span>
             <FileInput type='file' accept='image/*' onChange={handleFile} />
          
        </div>
        {file&&<img src={file} alt='uploaded umage' className='w-full h-72 object-cover' />}
        <Button type='submit' gradientMonochrome="info">ADICIONAR CATEGORIA</Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  )
}

export default NovaCategoria2