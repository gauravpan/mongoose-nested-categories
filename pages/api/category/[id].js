// magic is in line 45 and line 64

import dbConnect from "../../../utils/dbConnect";
import Category from "../../../models/Category";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const category = await Category.findById(id).populate("children");
        if (!category) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const category = await Category.findByIdAndUpdate(id, req.body);
        if (!category) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "POST" /* Edit a model by its ID */:
      try {
        const newCategory = await Category.create(req.body);

        if (newCategory.parent) {
          console.log(newCategory.parent);
          await Category.updateOne(
            { _id: newCategory.parent },
            { $push: { children: newCategory.id } }
          );
        }

        if (!newCategory) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: newCategory });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedcategory = await Category.findOneAndDelete({ _id: id });

        await Category.updateOne(
          { _id: deletedcategory.parent },
          { $pull: { children: deletedcategory.id } }
        );

        if (!deletedcategory) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
