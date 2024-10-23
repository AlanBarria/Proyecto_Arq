import logo from './logo.svg';
import './App.css';
import CompMostarUsuarios from './usuario/MostarUsuarios.js';
import CompCrearUsuario from './usuario/CrearUsuario.js';
import CompEditarUsuario from './usuario/EditarUsuario.js';
import Registro from './Registro';
import Login from './Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element= { <CompMostarUsuarios></CompMostarUsuarios>} />
          <Route path='crear' element= { <CompCrearUsuario></CompCrearUsuario>} />
          <Route path='edit/:id' element= { <CompEditarUsuario></CompEditarUsuario> } />
          <Route path="registro" element={<Registro />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
