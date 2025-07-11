import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Language = sequelize.define("Language", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  paradigm: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

export default Language;