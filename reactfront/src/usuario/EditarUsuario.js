import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/usuarios'

const CompEditarUsuario = () =>{
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [telefono, setTelefono] = useState("")
    const [rol, setRol] = useState("")
    const navigate = useNavigate()

    const id = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI+id, {nombre: nombre, correo: correo, contrasena: contrasena, telefono: telefono, rol: rol})
        navigate('/')
    } 

    useEffect( () => {
        getUsuarioById()
    },[])

    const getUsuarioById = async () =>{
            const res = await axios.get(URI+id)
            setNombre(res.data.nombre)
            setCorreo(res.data.correo)
            setContrasena(res.data.contrasena)
            setTelefono(res.data.telefono)
            setRol(res.data.rol)
    }
    
    return(
        <div>
            <h3>Editar Usuario</h3>
            <form onSubmit={update}>
                <div className='mb-3'> 
                    <label className='form-label'>Nombre</label>
                    <input value={nombre} onChange={ (e) => setNombre(e.target.value) } type='text' className='form-control'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Correo</label>
                    <input value={correo} onChange={ (e) => setCorreo(e.target.value) } type='text' className='form-control'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Contraseña</label>
                    <input value={contrasena} onChange={ (e) => setContrasena(e.target.value) } type='password' className='form-control'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Telefono</label>
                    <input value={telefono} onChange={ (e) => setTelefono(e.target.value) } type='number' className='form-control'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Rol</label>
                    <input value={rol} onChange={ (e) => setRol(e.target.value) } type='text' className='form-control'></input>
                </div>
                {/* <div className='mb-3'>
                    <select value={rol} onChange={ (e) => setRol(e.target.value) } class="form-select" id="floatingSelectGrid">
                        <option selected="">Roles</option>
                        <option value="1">conductor</option>
                        <option value="2">pasajero</option>
                    </select>
                </div> */}
                <button type='submit' className='btn btn-primary'><i class="fa-solid fa-floppy-disk"></i></button>
            </form>
        </div>
    )
}

export default CompEditarUsuario    