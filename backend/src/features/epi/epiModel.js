import { DataTypes } from "sequelize";
import { connection } from "../../config/sequelize.js";

export const epiModel = connection.define(
    "epis",
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        validade: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        lote: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        data_chegada: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }

    },

    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }

);