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