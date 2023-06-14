import express from 'express';
import { getAllTags, addNewTag, getExperienceByTagId, updateTag, deleteTag, getTagDetailsById, addExperienceToTags, removeExpFromTag } from "../controllers/tags.js"

const router = express.Router()

router.get('/', getAllTags)
router.get('/:tag_id', getTagDetailsById)
router.get('/:tag_id/experiences', getExperienceByTagId)
router.post('/:tag_id/:experience_id', addExperienceToTags)
router.delete('/:tag_id/:experience_id', removeExpFromTag)
router.post('/', addNewTag)
router.patch('/:id', updateTag)
router.delete('/:id', deleteTag)

export default router