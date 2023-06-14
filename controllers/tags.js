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
  const { name } = req.query
  try {
    const name_ = new RegExp(name, "i");
    const tags = await TagModel.find({ $or: [{ name: name_ }] });
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
  const data = { tagId: tag_id, entityId: experience_id }
  if (!tag_id || !experience_id) {
    return res.status(500).json({ message: "missing parameters" })
  }
  const entity = await EntityTagModel.findOne({ tagId: tag_id, entityId: experience_id })

  if (entity) {
    return res.status(500).json({ message: "Entity already exists" });
  }
  const newEntity = await new EntityTagModel({ ...data, createdAt: new Date().toISOString() })
  try {
    await newEntity.save()
    return res.status(201).json(newEntity)
  } catch (error) {
    return res.status(409).json(error.message)
  }
}

export const removeExpFromTag = async (req, res) => {
  const { tag_id, experience_id } = req.params
  if (!tag_id || !experience_id) {
    return res.status(500).json({ message: "missing parameters" })
  }
  const entity = await EntityTagModel.findOne({ tagId: tag_id, entityId: experience_id })
  console.log(entity)
  if (entity) {
    await EntityTagModel.findByIdAndRemove(entity._id);
    res.json({ message: "Experinece Remove successfully." });
  } else {
    res.json({ message: "Experinece not found." });
  }
}

export const getExperienceByTagId = async (req, res) => {
  const { tag_id } = req.params
  const { page, search } = req.query
  console.log("tag id ", tag_id)
  try {
    const LIMIT = 10;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await EntityTagModel.countDocuments({ tagId: tag_id });
    console.log("total", total)
    const tagsExperience = await EntityTagModel.find({ tagId: tag_id }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    console.log("tagsExperience", tagsExperience)

    const ids = tagsExperience.map(val => val.entityId)
    console.log("ids", ids)

    const experiencesDetails = await ExperienceModel.find({ 'taskShortName': { $in: ids } })
    console.log("experiencesDetails", ids)

    // const experiencesDetails = await ExperienceModel.find()
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

