import { DataTypes } from "sequelize";
import db from "../database/db.js";

const UsuarioModel = db.define('usuarios', {
    nombre: { type: DataTypes.STRING },
    correo: { type: DataTypes.STRING, unique: true },
    contrasena: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    rol: { type: DataTypes.ENUM('conductor', 'pasajero') },
});

export default UsuarioModel;
