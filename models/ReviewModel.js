import express from 'express'
import mongoose from 'mongoose'


const ReviewSchema = mongoose.Schema({
  user: String,
  review: String,
  rating: Number,
  expId: String,
  date: Object,
  location: Object,
  expImages: [String],
  updatedAt: {
    type: Date,
    default: new Date()
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const ReviewModel = mongoose.model('Reviews', ReviewSchema)
export default ReviewModel