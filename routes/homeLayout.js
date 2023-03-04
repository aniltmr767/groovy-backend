import express from 'express';
import { addNewHomePageLayout, getHomePageLayoutByCity} from "../controllers/homeLayout.js"

const router = express.Router()

router.get('/:city', getHomePageLayoutByCity)
router.post('/:city',  addNewHomePageLayout)
// router.patch('/:id', updateCity)
// router.delete('/:id', deleteCity)

export default router