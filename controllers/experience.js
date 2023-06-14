import mongoose from "mongoose";
import ExperienceModel from "../models/ExperienceModel.js";
import { checkMandatoryField } from "../utilities/helper.js";

const fieldArray = ["name", "taskShortName", "description"]

export const addNewExperience = async (req, res) => {
  const data = req.body

  const dataArray = Object.keys(data)
  const isAllFieldExists = checkMandatoryField(fieldArray, dataArray).isAllFieldExists;
  const missingFields = checkMandatoryField(fieldArray, dataArray).missingFields
  if (!isAllFieldExists) {
    const exp = await ExperienceModel.findOne({ taskShortName: data?.taskShortName })
    console.log("exp", exp)

    if (!exp) {
      const newExp = new ExperienceModel({ ...data, createdAt: new Date().toISOString() })
      try {
        await newExp.save()
        res.status(201).json(newExp)
      } catch (error) {
        res.status(409).json(error.message)
      }
    } else {
      res.status(500).json({ message: "Experience already exists" });
    }

  } else {
    res.status(500).json({ message: "Data is missing.", fields: missingFields });
  }
}

export const updateExperienceById = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const dataArray = Object.keys(data)
  const isAllFieldExists = checkMandatoryField(fieldArray, dataArray).isAllFieldExists;
  const missingFields = checkMandatoryField(fieldArray, dataArray).missingFields

  if (!isAllFieldExists) {
    try {
      const newData = await ExperienceModel.findByIdAndUpdate({ _id: Object(id) }, { ...data }, { new: true });
      res.json({ data: [], message: "Successfully updated the Experience." });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Data is missing.", fields: missingFields });
  }

}

export const getExperiences = async (req, res) => {
  const { page, limit, search = "" } = req.query
  console.log("get experience")
  const limit_ = search ? 1000 : limit
  try {
    const LIMIT = Number(limit_) || 8;
    const startIndex = (Number(page)) * LIMIT; // get the starting index of every page

    const total = await ExperienceModel.countDocuments({});
    const name_ = new RegExp(search, "i");
    const experiences = await ExperienceModel.find({ $or: [{ name: name_ }] }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.json({ data: experiences, currentPage: Number(page || 1), total, numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getExperiencesByTag = async (req, res, next) => {
  const tag = req?.params?.tag

}

export const getExperienceById = async (req, res, next) => {
  const task_name = req?.params?.task_name
  if (!task_name)
    return res.status(400).json({ message: "Not found." });
  const experience = await ExperienceModel.findOne({ taskShortName: task_name });
  if (experience) {
    return res.status(200).json({ data: experience });
  }
  return res.status(500).json({ message: "Not found." });
}

export const deleteExperience = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No experience with id: ${id}`);

  await ExperienceModel.findByIdAndRemove(id);

  res.json({ message: "Experience deleted successfully." });
}