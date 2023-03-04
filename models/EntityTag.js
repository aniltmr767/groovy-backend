import express from 'express'
import mongoose from 'mongoose'

const EntityTagSchema = mongoose.Schema({
  tagId: [String],
  entityId: [String],
  entityType: String,
  updatedAt: {
    type: Date,
    default: new Date()
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const EntityTagModel = mongoose.model('Entities', EntityTagSchema)
export default EntityTagModel
