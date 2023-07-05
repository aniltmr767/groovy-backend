import express from 'express';

const router = express.Router();
import { saveReview, getAllReviews, updateReview, deleteReview } from "../controllers/reviews.js"

router.route("/")
  .get(getAllReviews)
  .post(saveReview);

router.route("/:review_id")
  .put(updateReview)
  .delete(deleteReview);



export default router;