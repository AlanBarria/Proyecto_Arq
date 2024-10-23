import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Limpiar el estado de error

        try {
            const response = await axios.post('http://localhost:8000/usuarios/login', {
                correo,
                contrasena
            });

            if (response.data.success) {
                // Si el login es exitoso, redirigir a la página principal o dashboard
                alert('Inicio de sesión exitoso');
                navigate('/');  // Redirige a la página principal
            } else {
                setError(response.data.message);  // Mostrar error si las credenciales son incorrectas
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError('Error al iniciar sesión. Por favor, intente de nuevo.');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Correo:</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
                <div className='mb-4'>
                                <Link to="/registro" className='btn btn-primary'>
                                    <i className="fas fa-user-plus me-2"></i>Registrarse
                                </Link>
                            </div>
            </form>
        </div>
    );
};

export default Login;
