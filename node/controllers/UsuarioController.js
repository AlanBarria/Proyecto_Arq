import { where } from "sequelize";
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
export const getUsuario = async (req, res) => {
    try {
        const usuario = UsuarioModel.findAll()
            where:{
                id:req.params.id
        }
        res.json(usuario)
    } catch (error) {
        res.json({message: error.message})
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
                id: req.params.id
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
        await UsuarioModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}