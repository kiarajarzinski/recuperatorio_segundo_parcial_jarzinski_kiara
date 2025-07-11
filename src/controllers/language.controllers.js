import Language from "../models/language.model.js";

//para obtener todos los lenguajes 
export const getAllLanguages = async (req, res) => {
    try {
        const languages = await Language.findAll();
        res.json(languages);
    } catch (error) {
         console.error('Error al obtener los lenguajes:', error);
         res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

//para obtener un lenguaje por id
export const getLanguageById = async (req, res) => {
    try {
        const { id } = req.params;
        const language = await Language.findByPk(id);
        if (!language) {
            return res.status(404).json({ error: "Lenguaje no encontrado" });
        }
        res.json(language);
    } catch (error) {
        console.error({ "Error al obtener el lenguaje": error });
        res.status(500).json({ error: "error interno del servidor" });
    }
};

//para crear un lenguaje 
export const createLanguage = async (req, res) => {
    try {
        const { name, creator, year, description } = req.body;

        if (!name || !creator || !year) {
            return res.status(400).json({ error: "Los campos 'name', 'creator' y 'year' son obligatorios." });
        }

         if (year !== undefined && year !== null && !Number.isInteger(year)) {
        return res.status(400).json({ error: 'El campo "year" debe ser un número entero.' });
    }
        const exists = await Language.findOne({ where: { name } });
        if (exists) {
            return res.status(400).json({ message: "El lenguaje ya existe" });
        }

        const newLanguage = await Language.create({ name, creator, year, description });
        res.status(201).json(newLanguage);
    } catch (error) {
        console.error('Error al crear lenguaje:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'El nombre ya esta en uso.' });
        }
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

//para actualizar un lenguaje
export const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, creator, year, description } = req.body;

        const language = await Language.findByPk(id);
        if (!language) {
            return res.status(404).json({ error: "Lenguaje no encontrado" });
        }

          if (!name || !creator || !year || !id ) {
              return res.status(400).json({ error: 'Los campos "name", "creator" y "year" son obligatorios.' });
          }

           if (year !== undefined && year !== null && !Number.isInteger(year)) {
        return res.status(400).json({ error: 'El campo "year" debe ser un número entero.' });
    }

        if (name && name !== language.name) {
            const exists = await Language.findOne({ where: { name } });
            if (exists) {
                return res.status(400).json({ error: "El nombre ya esta en uso" });
            }
        }

    language.name = name;
    language.creator = creator;
    language.year = year;
    language.description = description || language.description; 

    await language.save();

     res.json(language);
  } catch (error) {
    console.error('Error al actualizar lenguaje:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'El nombre ya está en uso.' });
    }
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

//para eliminar un lenguaje
export const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const language = await Language.findByPk(id);
        if (!language) {
            return res.status(404).json({ error: "Lenguaje no encontrado" });
        }
        await language.destroy();
        res.json({ message: "Lenguaje eliminado correctamente" });
    } catch (error) {
        console.error({ "Error al eliminar el lenguaje": error });
        res.status(500).json({ error: "Error interno del servidor" });
    }
};