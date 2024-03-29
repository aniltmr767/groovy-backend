import express from 'express';

const router = express.Router();
import {
  saveReview, getAllReviews, updateReview, deleteReview,
  getReviewsByExp
} from "../controllers/reviews.js"

router.route("/")
  .get(getAllReviews)
  .post(saveReview);

router.route("/:review_id")
  .put(updateReview)
  .delete(deleteReview);

router.route("/experience/:id")
  .get(getReviewsByExp);



export default router;