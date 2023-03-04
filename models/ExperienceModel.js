import express from 'express'
import mongoose from 'mongoose'

const ExperienceSchema = mongoose.Schema({
    name: String,
    active:Boolean,
    codAvailable:Boolean,
    taskShortName:String,
    description:String,
    metaDescription:Object,
    caption:String,
    location:String,
    address:String,
    thumbnail:String,
    images:Array,
    category:[String],
    pinCode:String,
    type:String,
    price:String,
    SellingPrice:String,
    updatedBy:[String],
    updatedAt:{
      type: Date,
      default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const ExperienceModel = mongoose.model('Experiences', ExperienceSchema)
export default ExperienceModel