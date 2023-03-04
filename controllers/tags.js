import mongoose from "mongoose";
import EntityTagModel from "../models/EntityTag.js";
import ExperienceModel from "../models/ExperienceModel.js";
import TagModel from "../models/TagModel.js";

export const addNewTag = async (req, res) => {
  const tag = req.body
  const newTag = new TagModel({ ...tag, createdAt: new Date().toISOString() })
  try {
    await newTag.save()
    res.status(201).json(newTag)
  } catch (error) {
    res.status(409).json(error.message)
  }
}

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.find();
    res.json({ data: tags });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getTagDetailsById = async (req, res) => {
  let tagId = req.params.tag_id
  try {
    const tags = await TagModel.findOne({ title: tagId });
    res.json({ data: tags });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const updateTag = async (req, res) => {
  const { id } = req.params;
  const tag_ = req.body;
  try {
    const tag = await TagModel.findByIdAndUpdate({ _id: Object(id) }, { ...tag_ }, { new: true });
    res.json({ data: [], message: "Successfully updated the tag." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const addExperienceToTags = async (req, res) => {
  const { tag_id, experience_id } = req.params
  const data = req.body
  if (!tag_id || !experience_id) {
    return res.status(500).json({ message: "missing parameters" })
  }
  const entity = EntityTagModel.findOne({ tagId: tag_id, entityId: (experience_id) })
  if (entity) {
    return res.status(500).json({ message: "Entity already exists" });
  }
  const newEntity = new EntityTagModel({ ...data, createdAt: new Date().toISOString() })
  try {
    await newEntity.save()
    return res.status(201).json(newEntity)
  } catch (error) {
    return res.status(409).json(error.message)
  }
}

export const getExperienceByTagId = async (req, res) => {
  const { tag_id } = req.params
  const { page, search } = req.query
  try {
    const LIMIT = 10;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await EntityTagModel.countDocuments({ tagId: tag_id });
    // const tagsExperience = await EntityTagModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    // const ids = tagsExperience.map(val => mongoose.Types.ObjectId(val.entityId))
    // const experiencesDetails = await ExperienceModel.find({ '_id': { $in: ids } })
    const experiencesDetails = await ExperienceModel.find()
    return res.json({ data: experiencesDetails, currentPage: Number(page || 1), numberOfPages: Math.ceil(total / LIMIT) })
  } catch (error) {
    return res.json({ message: error.message })
  }
}




export const deleteTag = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No tag with id: ${id}`);

  await TagModel.findByIdAndRemove(id);

  res.json({ message: "Tag deleted successfully." });
}