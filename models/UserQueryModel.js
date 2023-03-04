import express from 'express'
import mongoose from 'mongoose'

const UserQuerySchema = mongoose.Schema({
  name: String,
  phone: String,
  city: String,
  address: String,
  emailId: String,
  date: String,
  time: String,
  query: String,
  status: { type: Boolean, default: false },
  experience: { type: String },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const UserQueryModel = mongoose.model('user_query', UserQuerySchema)
export default UserQueryModel