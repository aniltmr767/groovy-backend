import express from 'express';
import { addNewHomePageLayout, deleteLayout, getAllLayouts, getHomePageLayoutByCity, updateHomePageLayout } from "../controllers/homeLayout.js"

const router = express.Router()

router.get('/:city', getHomePageLayoutByCity)
router.post('/:city', addNewHomePageLayout)
// router.patch('/:id', updateCity)
// router.delete('/:id', deleteCity)

router.route("/")
  .get(getAllLayouts)
  .post(addNewHomePageLayout);

router.route("/:id")
  .put(updateHomePageLayout)
  .delete(deleteLayout);

export default router