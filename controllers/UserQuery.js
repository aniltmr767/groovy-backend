import mongoose from "mongoose";
import UserQueryModel from "../models/UserQueryModel.js";
import ProfileModel from "../models/ProfileModel.js";
import UserModal from "../models/userModel.js";
import { checkMandatoryField } from "../utilities/helper.js";


const fieldArray = ["name", "phone", "address", "date", "query"]

export const addNewUserQuery = async (req, res) => {
  const data = req.body

  const dataArray = Object.keys(data)
  const isAllFieldExists = checkMandatoryField(fieldArray, dataArray).isAllFieldExists;
  const missingFields = checkMandatoryField(fieldArray, dataArray).missingFields
  if (!isAllFieldExists) {
    // const query = await UserQueryModel.findOne({ phone: data?.phone, experience: data?.experience })
    const user = await UserModal.findOne({ phone: data?.phone })
    console.log("data ----------", data)
    // if (!query) {
    const newQuery = await UserQueryModel({ ...data, createdAt: new Date().toISOString() })
    if (!user) {
      let userData = {
        name: data?.name,
        phone: data?.phone,
        emailId: data?.emailId
      }
      let newUser = await UserModal({ ...userData, createdAt: new Date().toISOString() })
      try {
        await newUser.save()
      } catch (error) {
        console.log("error ", error)
      }

      try {
        let profileData = {
          name: data?.name,
          emailId: data?.emailId || "",
          mobile: data?.phone,
          city: data?.city,
          address: data?.address,
          userId: newUser?._id
        }
        const newProfile = await ProfileModel({ ...profileData, createdAt: new Date().toISOString() })
        console.log("new profile created", newProfile)
        await newProfile.save()
      } catch (error) {
        console.log("profile error", error)
      }
    }
    try {
      await newQuery.save()
      res.status(201).json(newQuery)
    } catch (error) {
      res.status(409).json(error.message)
    }
    // } else {
    //   res.status(500).json({ message: "Query already exists" });
    // }

  } else {
    res.status(500).json({ message: "Data is missing.", fields: missingFields });
  }
}


export const getUserQueries = async (req, res) => {
  const { page, search, limit } = req.query
  try {
    const LIMIT = Number(limit) || 8;
    const startIndex = (Number(page || 0)) * LIMIT
    console.log("startindex", startIndex)
    const total = await UserQueryModel.countDocuments({});
    console.log("totla", total)
    const query = await UserQueryModel.aggregate([
      {
        $addFields: {
          "experience": {
            $convert:
            {
              input: "$experience",
              to: "objectId",
              onError: "",  // Optional.
              onNull: ""    // Optional.
            }
          }
        }
      },

      {
        $lookup:
        {
          from: "experiences",
          localField: "experience",
          foreignField: "_id",
          as: "experience"
        }
      },
      {
        $unwind: {
          path: "$experience",
          "preserveNullAndEmptyArrays": true
        }
      }
    ]).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.status(200).json({ data: query, currentPage: Number(page || 1), total, numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateUserQuery = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const dataArray = Object.keys(data)


  if (dataArray.includes("status")) {
    try {
      const newData = await UserQueryModel.findByIdAndUpdate({ _id: Object(id) }, { "status": data?.status }, { new: true });
      res.json({ data: [], message: "Successfully updated the status." });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "status is missing.", });
  }

}