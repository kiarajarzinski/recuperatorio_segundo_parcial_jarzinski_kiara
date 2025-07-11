import Language from "../models/language.model.js"; 
// para obtener todos los lenguajes
export const getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.findAll();
    res.json(languages);
  } catch (error) {
    console.error('Error al obtener los lenguajes:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

//  para obtener un lenguaje por id
export const getLanguageById = async (req, res) => {
  const { id } = req.params;
  try {
    const language = await Language.findByPk(id);
    if (!language) {
      return res.status(404).json({ error: 'Lenguaje no encontrado.' });
    }
    res.json(language);
  } catch (error) {
    console.error('Error al obtener lenguaje por id:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

//  para crear un nuevo lenguaje
export const createLanguage = async (req, res) => {
  const { name, paradigm, release_year } = req.body;
  try {
    if (!name || !paradigm) {
      return res.status(400).json({ error: 'Los campos "name" y "paradigm" son obligatorios.' });
    }

    if (release_year !== undefined && release_year !== null && !Number.isInteger(release_year)) {
        return res.status(400).json({ error: 'El campo "release_year" debe ser un número entero.' });
    }

    const existingLanguage = await Language.findOne({ where: { name } });
    if (existingLanguage) {
      return res.status(409).json({ error: 'el nombre ya esta en uso.' });
    }

    const newLanguage = await Language.create({
      name,
      paradigm,
      release_year
    });
    res.status(201).json(newLanguage);
  } catch (error) {
    console.error('Error al crear lenguaje:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'El nombre ya esta en uso.' });
    }
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// actualizar un lenguaje 
export const updateLanguage = async (req, res) => {
  const { id } = req.params;
  const { name, paradigm, release_year } = req.body;

  try {
    const language = await Language.findByPk(id);
    if (!language) {
      return res.status(404).json({ error: 'Lenguaje no encontrado.' });
    }

    if (!name || !paradigm) {
      return res.status(400).json({ error: 'Los campos "name" y "paradigm" son obligatorios.' });
    }

    if (release_year !== undefined && release_year !== null && !Number.isInteger(release_year)) {
        return res.status(400).json({ error: 'El campo "release_year" debe ser un numero entero.' });
    }

    const existingLanguageWithSameName = await Language.findOne({ where: { name } });
    if (existingLanguageWithSameName && existingLanguageWithSameName.id !== parseInt(id, 10)) {
      return res.status(409).json({ error: 'el nombre esta en uso.' });
    }

    // para actualizar el lenguaje
    language.name = name;
    language.paradigm = paradigm;
    language.release_year = release_year;
    await language.save();

    res.json(language);
  } catch (error) {
    console.error('Error al actualizar el lenguaje:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'el nombre ya esta en uso.' });
    }
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

//  eliminar un lenguaje
export const deleteLanguage = async (req, res) => {
  const { id } = req.params;
  try {
    const language = await Language.findByPk(id);
    if (!language) {
      return res.status(404).json({ error: 'Lenguaje no encontrado.' });
    }

    await language.destroy();
    res.json({ message: 'Lenguaje eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar lenguaje:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};