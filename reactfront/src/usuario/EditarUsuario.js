import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/usuarios'

const CompEditarUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        correo: "",
        contrasena: "",
        telefono: "",
        rol: ""
    });
    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URI}/${id}`, usuario);
            navigate('/');
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    } 

    useEffect(() => {
        getUsuarioById();
    }, []);

    const getUsuarioById = async () => {
        try {
            const res = await axios.get(`${URI}/${id}`);
            setUsuario(res.data);
        } catch (error) {
            console.error("Error al obtener usuario:", error);
        }
    }
    
    return(
        <div>
            <h3>Editar Usuario</h3>
            <form onSubmit={update}>
                <div className='mb-3'> 
                    <label className='form-label'>Nombre</label>
                    <input name="nombre" value={usuario.nombre} onChange={handleChange} type='text' className='form-control' />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Correo</label>
                    <input name="correo" value={usuario.correo} onChange={handleChange} type='text' className='form-control' />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Contraseña</label>
                    <input name="contrasena" value={usuario.contrasena} onChange={handleChange} type='password' className='form-control' />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Teléfono</label>
                    <input name="telefono" value={usuario.telefono} onChange={handleChange} type='number' className='form-control' />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Rol</label>
                    <select name="rol" value={usuario.rol} onChange={handleChange} className="form-select">
                        <option value="">Seleccione un rol</option>
                        <option value="conductor">Conductor</option>
                        <option value="pasajero">Pasajero</option>
                    </select>
                </div>
                <button type='submit' className='btn btn-primary'><i className="fa-solid fa-floppy-disk"></i> Guardar</button>
            </form>
        </div>
    )
}

export default CompEditarUsuario