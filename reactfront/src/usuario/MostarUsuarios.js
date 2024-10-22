import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const URI = 'http://localhost:8000/usuarios'

const CompMostarUsuarios = () =>{
    const [usuarios, setUsuario] = useState([])
    useEffect( ()=>{
        getUsuarios( )
    },[])

    const getUsuarios = async () => {
        const res = await axios.get(URI)
        setUsuario(res.data)
    }

    const deleteUsuario = async (id) => {
        await axios.delete(`${URI}${id}`)
        getUsuarios()
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Link to="/crear" className='btn btn-primary mt-2 mb-2'><i className="fa-solid fa-plus"></i></Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Contraseña</th>
                                <th>Telefono</th>
                                <th>Rol</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map ((usuario) =>(
                            <tr key={usuario.id}>
                                <td> {usuario.id_usuario} </td>
                                <td> {usuario.nombre} </td>
                                <td> {usuario.correo} </td>
                                <td> {usuario.contrasena} </td>
                                <td> {usuario.telefono} </td>
                                <td> {usuario.rol} </td>
                                <td>
                                    <Link to={`/edit/${usuario.id_usuario}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>
                                    <button onClick={ ()=>deleteUsuario(usuario.id) } className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                        
                </div>
            </div>
        </div>
    )
}

export default CompMostarUsuarios