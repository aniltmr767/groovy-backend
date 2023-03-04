import express from 'express';
import { getAllTags, addNewTag, getExperienceByTagId, updateTag, deleteTag, getTagDetailsById } from "../controllers/tags.js"

const router = express.Router()

router.get('/', getAllTags)
router.get('/:tag_id', getTagDetailsById)
router.get('/:tag_id/experiences', getExperienceByTagId)
router.post('/', addNewTag)
router.patch('/:id', updateTag)
router.delete('/:id', deleteTag)

export default router