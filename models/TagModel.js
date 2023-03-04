import express from 'express'
import mongoose from 'mongoose'

const TagsSchema = mongoose.Schema({
    title: String,
    name: String,
    description:String,
    metaDescription:Object,
    metaTitle:Object,
    seoDesctiption:Object,
    cardLayout:String,
    imageUrl:String,
    cities:[String],
    updatedAt:{
      type: Date,
      default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const TagModel = mongoose.model('Tags', TagsSchema)
export default TagModel