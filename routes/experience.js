import express from 'express';
import { addNewExperience, getExperiences, updateExperienceById, deleteExperience, getExperienceById } from "../controllers/experience.js"

const router = express.Router()

router.get('/', getExperiences)
router.post('/', addNewExperience)
router.patch('/:id', updateExperienceById)
router.get('/:task_name', getExperienceById)
router.delete('/:id', deleteExperience)

export default router