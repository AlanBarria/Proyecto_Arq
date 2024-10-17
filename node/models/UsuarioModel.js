import db from "../database/db.js";

import { DataTypes } from "sequelize";

const UsuarioModel = db.define('usuarios',{
    nombre: {type: DataTypes.STRING},
    correo: {type: DataTypes.STRING},
    contraseña: {type: DataTypes.STRING},
    telefono: {type: DataTypes.NUMBER},
    rol: {type: DataTypes.BOOLEAN},
})

export default UsuarioModel