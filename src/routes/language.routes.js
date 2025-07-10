import {Router} from 'express';
import {
    getAllLanguages,
    getLanguageById,
    createLanguage,
    updateLanguage,
    deleteLanguage
} from '../controllers/language.controller.js';

const router = Router();

router.get('/', getAllLanguages);
router.get('/:id', getLanguageById);
router.post('/', createLanguage);
router.put('/:id', updateLanguage);
router.delete('/:id', deleteLanguage);

export default router;