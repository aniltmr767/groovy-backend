import mongoose from "mongoose";
import CityModel from "../models/CityModel.js";

export const addNewCity = async (req, res) => {
  const city = req.body
  const newCity = new CityModel({ ...city, createdAt: new Date().toISOString() })
  try {
    await newCity.save()
    res.status(201).json(newCity)
  } catch (error) {
    res.status(409).json(error.message)
  }
}

export const getCities = async (req, res) => {
  try {
    const cities = await CityModel.find();
    console.log("cities ", cities)
    res.json({ data: cities });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const updateCity = async (req, res) => {
  const id = req?.params?.id;
  const city = req.body;
  try {
    const cities = await CityModel.findByIdAndUpdate({ _id: Object(id) }, { ...city }, { new: true });
    console.log("cities ", cities)
    res.json({ data: [], message: "Successfully updated the city." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const deleteCity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No city with id: ${id}`);

  await CityModel.findByIdAndRemove(id);

  res.json({ message: "City deleted successfully." });
}