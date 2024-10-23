import logo from './logo.svg';
import './App.css';
import CompMostarUsuarios from './usuario/MostarUsuarios.js';
import CompCrearUsuario from './usuario/CrearUsuario.js';
import CompEditarUsuario from './usuario/EditarUsuario.js';
import Registro from './Registro';
import Login from './Login';
import MapView from './mapa/MapaMapbox.js'; // Cambiado a importación por defecto
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='admin/' element={<CompMostarUsuarios />} />
          <Route path='crear' element={<CompCrearUsuario />} />
          <Route path='edit/:id' element={<CompEditarUsuario />} />
          <Route path="registro" element={<Registro />} />
          <Route path="/" element={<Login />} />
          <Route path="mapa" element={<MapView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;