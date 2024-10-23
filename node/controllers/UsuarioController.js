import { where } from "sequelize";
import bcrypt from 'bcrypt';
import UsuarioModel from "../models/UsuarioModel.js";


//Mustra todos los usuarios
export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll()
        res.json(usuarios)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mustra un usuario
//Muestra un usuario
export const getUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findByPk(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Crea un usuario
export const createUsuario = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.create(req.body)
        res.json({
            "message":"¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

//Actualiza un usuario
export const updateUsuario = async (req, res) => {
    try {
        await UsuarioModel.update(req.body,{
            where: {
                id_usuario: req.params.id
            }
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

//Elimina un usuario
export const deleteUsuario = async (req, res) => {
    try {
        const result = await UsuarioModel.destroy({
            where: {
                id_usuario: req.params.id
            }
        });
        if (result === 1) {
            res.json({
                "message": "¡Registro eliminado correctamente!"
            });
        } else {
            res.status(404).json({
                "message": "Usuario no encontrado o ya fue eliminado"
            });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const registrarUsuario = async (req, res) => {
    const { nombre, correo, contrasena, telefono, rol } = req.body;

    // Validación del dominio del correo en el servidor
    if (!correo.endsWith('@duocuc.cl')) {
        return res.status(400).json({ success: false, message: 'El correo debe ser de dominio @duocuc.cl' });
    }

    try {
        // Verificar si el correo ya está en uso
        const usuarioExistente = await UsuarioModel.findOne({ where: { correo } });
        if (usuarioExistente) {
            return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        // Crear el nuevo usuario
        await UsuarioModel.create({
            nombre,
            correo,
            contrasena: hashedPassword,
            telefono,
            rol
        });

        res.status(201).json({ success: true, message: '¡Registro exitoso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

export const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        // Buscar el usuario por correo
        const usuario = await UsuarioModel.findOne({ where: { correo } });

        if (!usuario) {
            console.log("Correo no encontrado:", correo);  // Log para verificar el correo
            return res.status(404).json({ success: false, message: 'Correo no encontrado' });
        }

        console.log("Usuario encontrado:", usuario);  // Verifica el usuario

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        console.log("Contraseña coincide:", isMatch);  // Verifica si las contraseñas coinciden

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Si las credenciales son correctas
        const usuarioSeguro = {
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        };

        res.json({ success: true, message: 'Inicio de sesión exitoso', usuario: usuarioSeguro });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

