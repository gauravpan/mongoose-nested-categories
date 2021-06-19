//magic is in line 12

import dbConnect from "../../utils/dbConnect";
import Categories from "../../models/Category";

export default async function handler(req, res) {
  try {
    await dbConnect();

    res.status(200).json({
      success: true,
      categories: await Categories.find({ parent: undefined }).populate({
        //populate the depth as much as you want
        path: "children",
        populate: { path: "children" },
      }),
    });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
