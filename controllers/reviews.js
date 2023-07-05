import mongoose from "mongoose";
import ReviewModel from "../models/ReviewModel.js";
import User from "../models/userModel.js";


export const saveReview = async (req, res, next) => {
  try {
    const review = req.body
    const newreview = new ReviewModel({ ...review, createdAt: new Date().toISOString() })
    try {
      await newreview.save()
      res.status(201).json(newreview)
    } catch (error) {
      res.status(409).json(error.message)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getAllReviews = async (req, res) => {
  const { page, limit } = req.query
  const limit_ = limit || 1000
  try {
    const LIMIT = Number(limit_) || 8;
    const startIndex = (Number(page || 0)) * LIMIT; // get the starting index of every page
    console.log("LIMIT", LIMIT, startIndex)
    const total = await ReviewModel.countDocuments({});
    console.log("total", total)
    const rev = await ReviewModel.aggregate([
      {
        '$addFields': {
          'user': {
            '$convert': {
              'input': '$user',
              'to': 'objectId'
            }
          },
          'expId': {
            '$convert': {
              'input': '$expId',
              'to': 'objectId'
            }
          }
        }
      }, {
        '$lookup': {
          'from': 'user_queries',
          'localField': 'user',
          'foreignField': '_id',
          'as': 'user'
        }
      }, {
        '$lookup': {
          'from': 'experiences',
          'localField': 'expId',
          'foreignField': '_id',
          'as': 'experience'
        }
      }, {
        '$unwind': {
          'path': '$user'
        }
      }, {
        '$unwind': {
          'path': '$experience'
        }
      }
    ]).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.json({ data: rev, currentPage: Number(page || 1), total, numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const updateReview = async (req, res, next) => {
  const { review_id } = req.params;
  const review_ = req.body;
  try {
    const review = await ReviewModel.findByIdAndUpdate({ _id: Object(review_id) }, { ...review_ }, { new: true });
    res.json({ data: [], message: "Successfully updated the tag." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const deleteReview = async (req, res) => {
  const { review_id } = req.params
  if (!review_id) {
    return res.status(500).json({ message: "missing parameters" })
  } else {
    await ReviewModel.findByIdAndRemove(review_id);
    res.status(200).json({ message: "Review removed successfully." });
  }

}

