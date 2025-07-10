import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import languageRoutes from './src/routes/language.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/languages', languageRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
     console.log('base de datos conectada correctamente');
     app.listen(PORT, () => {
         console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
     });
    });
