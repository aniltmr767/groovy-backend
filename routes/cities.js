import express from 'express';
import { getCities, addNewCity, updateCity, deleteCity } from "../controllers/cities.js"

const router = express.Router()

router.get('/', getCities)
router.post('/', addNewCity)
router.patch('/:id', updateCity)
router.delete('/:id', deleteCity)

export default router