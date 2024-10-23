import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/usuarios';

const CompMostrarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        try {
            const res = await axios.get(URI);
            setUsuarios(res.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const deleteUsuario = async (id) => {
        try {
            const response = await axios.delete(`${URI}/${id}`);
            if (response.status === 200) {
                alert(response.data.message);
                getUsuarios();
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            alert("Error al eliminar usuario. Por favor, intente de nuevo.");
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-12'>
                    <div className='card shadow'>
                        <div className='card-header bg-primary text-white'>
                            <h4 className='mb-0'>Lista de Usuarios</h4>
                        </div>
                        <div className='card-body'>
                            {/* Botones para ir a login y registro */}
                            <div className='mb-4'>
                                <Link to="/login" className='btn btn-secondary me-2'>
                                    <i className="fas fa-sign-in-alt me-2"></i>Iniciar Sesión
                                </Link>
                                <Link to="/registro" className='btn btn-primary'>
                                    <i className="fas fa-user-plus me-2"></i>Registrarse
                                </Link>
                            </div>

                            <div className='table-responsive'>
                                <table className='table table-hover table-bordered'>
                                    <thead className='table-light'>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Correo</th>
                                            <th>Teléfono</th>
                                            <th>Rol</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map((usuario) => (
                                            <tr key={usuario.id_usuario}>
                                                <td>{usuario.id_usuario}</td>
                                                <td>{usuario.nombre}</td>
                                                <td>{usuario.correo}</td>
                                                <td>{usuario.telefono}</td>
                                                <td>
                                                    <span className={`badge ${usuario.rol === 'conductor' ? 'bg-success' : 'bg-info'}`}>
                                                        {usuario.rol}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link to={`/edit/${usuario.id_usuario}`} className='btn btn-warning btn-sm me-2'>
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <button onClick={() => {
                                                        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                                                            deleteUsuario(usuario.id_usuario);
                                                        }
                                                    }} className='btn btn-danger btn-sm'>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Link to="/crear" className='btn btn-success mt-3'>
                                <i className="fas fa-plus me-2"></i>Agregar Usuario
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompMostrarUsuarios;
