import Language from "../models/language.model.js";

export const getAllLanguages = async (req, res) => {
    try {
        const languages = await Language.findAll();
        res.status(200).json(languages);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los lenguajes", error: error.message });
    }
};

export const getLanguageById = async (req, res) => {
    try {
        const { id } = req.params;
        const language = await Language.findByPk(id);
        if (!language) {
            return res.status(404).json({ message: "Lenguaje no encontrado" });
        }
        res.status(200).json(language);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el lenguaje", error: error.message });
    }
};

export const createLanguage = async (req, res) => {
    try {
        const { name, creator, year, description } = req.body;

        if (!name || !creator || !year) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        const exists = await Language.findOne({ where: { name } });
        if (exists) {
            return res.status(400).json({ message: "El lenguaje ya existe" });
        }

        const newLanguage = await Language.create({ name, creator, year, description });
        res.status(201).json(newLanguage);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el lenguaje", error: error.message });
    }
};

export const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, creator, year, description } = req.body;

        const language = await Language.findByPk(id);
        if (!language) {
            return res.status(404).json({ message: "Lenguaje no encontrado" });
        }

        if (name && name !== language.name) {
            const exists = await Language.findOne({ where: { name } });
            if (exists) {
                return res.status(400).json({ message: "El nombre ya esta en uso" });
            }
        }

        await language.update({ name, creator, year, description });
        res.status(200).json(language);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el lenguaje", error: error.message });
    }
};

export const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const language = await Language.findByPk(id);
        if (!language) {
            return res.status(404).json({ message: "Lenguaje no encontrado" });
        }
        await language.destroy();
        res.status(200).json({ message: "Lenguaje eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el lenguaje", error: error.message });
    }
};