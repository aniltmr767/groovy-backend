import express from 'express'
import mongoose from 'mongoose'

const CategorySchema = mongoose.Schema({
    categoryName: String,
    image_url: String,
    updatedAt:{
      type: Date,
      default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const CategoryModel = mongoose.model('Categories', CategorySchema)
export default CategoryModel