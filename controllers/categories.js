import mongoose from "mongoose";
import CategoryModel from "../models/CategoryModel.js";

export const addNewCategory = async (req, res) => {
  const data = req.body
  const newData = new CategoryModel({ ...data, createdAt: new Date().toISOString() })
  try {
    await newData.save()
    res.status(201).json(newData)
  } catch (error) {
    res.status(409).json(error.message)
  }
}

export const getAllCategories = async (req, res) => {
  try {
    const data = await CategoryModel.find();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const updateCategory = async (req, res) => {
  const id = req.params;
  const data = req.body;
  try {
    const newData = await CategoryModel.findByIdAndUpdate(id, { ...data, id }, { new: true });
    res.status(200).json({ data: [], message: "Successfully updated the city." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}