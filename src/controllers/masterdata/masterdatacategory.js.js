const CategoryModel = require("../../models/maserdatamodel/masterdatamodel");

exports.addCategory = (req, res) => {
  const { ITEM, PRODUCT_CATEGORY } = req.body;

  if (!PRODUCT_CATEGORY || !ITEM) {
    return res
      .status(400)
      .json({ message: "PLEASE ADD PRODUCT_CATEGORY && ITEM" });
  }
  if (ITEM != "ADD") {
    return res.status(200).json({ message: "Wrong input given for add" });
  }

  CategoryModel.addCategory(ITEM, PRODUCT_CATEGORY, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json({
      status: "True",
      message: "Category added successfully",
    });
  });
};

exports.viewcategory = (req, res) => {
  const { ITEM } = req.query;

  if (!ITEM) {
    return res.status(400).json({ message: "please add payload" });
  }
  if (ITEM != "VIEW_ALL") {
    return res.status(200).json({ message: "Wrong input given for" });
  }

  CategoryModel.viewcategory(ITEM, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json({
      status: "True",
      response: results,
    });
  });
};
