import mongoose from "mongoose";
import HomeLayoutModel from "../models/HomePageLayoutModel.js";
import TagModel from "../models/TagModel.js";

export const addNewHomePageLayout = async (req, res) => {
  const city = req?.params?.city
  const data = req.body
  if (city) {
    const layout = new HomeLayoutModel({ ...data, createdAt: new Date().toISOString() })
    try {
      await layout.save()
      res.status(201).json(layout)
    } catch (error) {
      res.status(409).json(error.message)
    }
  } else res.status(500).json("city is missing")
}

export const getHomePageLayoutByCity = async (req, res) => {
  const city = req.params.city
  if (city) {
    const data_layout = await HomeLayoutModel.aggregate([{ $match: { city: city } }, { $group: { _id: "$layoutType" } }])
    let data = {}
    if (data_layout) {
      for (let index = 0; index < data_layout.length; index++) {
        data[data_layout[index]?._id] = await HomeLayoutModel.find({ city: city, active: 1, layoutType: data_layout[index]?._id })
      }
    }
    if (data.tag) {
      const ids = data?.tag?.map(val => val.entity)
      let data_tag = await TagModel.find({ 'title': { $in: ids } })
      data.tag = [...data_tag]
    }

    if (data["featured-tag"]) {
      const ids = data["featured-tag"]?.map(val => val.entity)
      let data_tag = await TagModel.find({ 'title': { $in: ids } })
      data["featured-tag"] = [...data_tag]
    }
    return res.status(200).json({ data: data });
  } else res.status(500).json("city is missing")
}




export const updateHomePageLayout = async (req, res, next) => {
  const { id } = req.params;
  const layout_ = req.body;
  try {
    console.log("object id", id)
    const layout = await HomeLayoutModel.findByIdAndUpdate({ _id: Object(id) }, { ...layout_ }, { new: true });
    res.json({ data: [], message: "Successfully updated the Layout." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getAllLayouts = async (req, res, next) => {
  const { page, limit } = req.query
  const limit_ = limit || 1000
  try {
    const LIMIT = Number(limit_) || 8;
    const startIndex = (Number(page || 0)) * LIMIT; // get the starting index of every page
    console.log("LIMIT", LIMIT, startIndex)
    const total = await HomeLayoutModel.countDocuments({});
    console.log("total", total)
    const layouts = await HomeLayoutModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

    res.json({ data: layouts, currentPage: Number(page || 1), total, numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteLayout = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(500).json({ message: "missing parameters" })
  } else {
    await HomeLayoutModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Review removed successfully." });
  }

}

