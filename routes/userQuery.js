import express from 'express';
import { addNewUserQuery, getUserQueries, updateUserQuery } from "../controllers/UserQuery.js"

const router = express.Router()

router.get('/', getUserQueries)
router.post('/', addNewUserQuery)
router.patch('/:id', updateUserQuery)
// router.get('/:task_name', getExperienceById)
// router.delete('/:id', deleteExperience)

export default router