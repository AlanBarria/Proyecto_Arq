import express from "express";
import { getAllUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario, registrarUsuario, loginUsuario } from '../controllers/UsuarioController.js';

const router = express.Router();
router.post('/registro', registrarUsuario); 
router.post('/login', loginUsuario);
router.get("/", getAllUsuarios);
router.get("/:id", getUsuario);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);


export default router;
