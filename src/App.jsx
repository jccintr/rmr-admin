import React, {useState,useEffect} from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './routes/PrivateRoute';
import Header from './components/Header';
import NovaCategoria from './pages/NovaCategoria';
import EditCategoria from './pages/EditCategoria';
import EditCliente from './pages/EditCliente';

function App() {

  const [themeMode,setThemeMode] = useState('light');

  const darkTheme = () => {
       setThemeMode('dark');
  }

  const lightTheme = () => {
      setThemeMode('light');
  }

  useEffect(()=>{
    document.querySelector('html').classList.remove('dark','light');
    document.querySelector('html').classList.add(themeMode);
  },[themeMode]);




  return (
    <DataProvider>
      <ThemeProvider value={{themeMode,darkTheme,lightTheme}}>
            <BrowserRouter>
              <Header />
              <Routes>
                  <Route path="/signin" element={<SignIn/>}/>
                  <Route element={<PrivateRoute/>}>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/nova-categoria" element={<NovaCategoria/>}/>
                      <Route path='/edit-categoria/:Id' element={<EditCategoria />} />
                      <Route path='/edit-cliente' element={<EditCliente />} />
                  </Route>
              </Routes>
             
            </BrowserRouter>
        </ThemeProvider>
    </DataProvider>
  )
}

export default App