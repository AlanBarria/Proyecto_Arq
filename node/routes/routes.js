 import express from "express";
 import {getAllUsuarios, getUsuario} from '../controllers/UsuarioController'
 const router = express.Router()

 router.get("/". getAllUsuarios)
 router.get("/:id". getUsuario)