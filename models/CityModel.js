import express from 'express'
import mongoose from 'mongoose'

const CitySchema = mongoose.Schema({
    cityName: String,
    cityShortName: String,
    imageUrl: String,
    active:Boolean,
    updatedAt:{
      type: Date,
      default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const CityModel = mongoose.model('Cities', CitySchema)
export default CityModel