import { DataTypes } from "sequelize";
import db from "../database/db.js";

const UsuarioModel = db.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Establece 'id_usuario' como la clave primaria
        autoIncrement: true // Autoincremental
    },
    nombre: { type: DataTypes.STRING },
    correo: { type: DataTypes.STRING, unique: true },
    contrasena: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    rol: { type: DataTypes.ENUM('conductor', 'pasajero') },
},{
    timestamps: false // Desactiva las columnas createdAt y updatedAt
});

export default UsuarioModel;
