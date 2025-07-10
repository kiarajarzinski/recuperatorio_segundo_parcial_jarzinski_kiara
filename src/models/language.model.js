import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Language = sequelize.define("Language", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creator: {
        type:DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

export default Language;