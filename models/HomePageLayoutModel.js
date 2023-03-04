import express from 'express'
import mongoose from 'mongoose'

const HomeLayoutSchema = mongoose.Schema({
    city:String,
    layoutType:String, // tag, experience , banner
    entity:String, // tags- aniversery-special, candle-light-dinner
    active:Boolean,
    position:Number,
    image:String,
    url:String,
    updatedAt:{
      type: Date,
      default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const HomeLayoutModel = mongoose.model('home_layout', HomeLayoutSchema)
export default HomeLayoutModel