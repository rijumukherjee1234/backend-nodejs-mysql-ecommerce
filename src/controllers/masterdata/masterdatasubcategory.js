const subcategorymodel = require("../../models/maserdatamodel/masterdatasubcategory");

exports.subcategory = (req, res) => {
  const { ITEM, PRODUCT_CATEGORY_SYS_ID, SUB_CATEGORY_NAME } = req.body;

  if (!PRODUCT_CATEGORY_SYS_ID || !ITEM || !SUB_CATEGORY_NAME) {
    return res
      .status(400)
      .json({
        message: "PLEASE ADD PRODUCT_CATEGORY_SYS_ID && ITEM && SUB_CATEGORY_NAME",
      });
  }
  if (ITEM != "ADD" || !PRODUCT_CATEGORY_SYS_ID) {
    return res.status(200).json({ message: "Wrong input given for add" });
  }

  const SUB_CATEGORY_IMAGE = req.file
  ? `/uploads/${req.file.filename}`
  : null;

  subcategorymodel.findcategorysysid(
    PRODUCT_CATEGORY_SYS_ID,
    (err, results) => {
      if (!results) {
        return res
          .status(200)
          .json({ message: "product category not exist in table" });
      }

      subcategorymodel.addSubCategory(
        ITEM,
        PRODUCT_CATEGORY_SYS_ID,
        SUB_CATEGORY_NAME,
        SUB_CATEGORY_IMAGE,
        (err, results) => {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          }

          res.status(200).json({
            status: "True",
            message: "SubCategory added successfully",
          });
        }
      );
    }
  );
};

exports.getsubcategory = (req, res) => {
  const { ITEM, PRODUCT_CATEGORY_SYS_ID } = req.query;

  if (!ITEM || !PRODUCT_CATEGORY_SYS_ID) {
    return res.status(400).json({ message: "please add payload" });
  }
  if (ITEM != "VIEW_ALL") {
    return res.status(200).json({ message: "Wrong input given for" });
  }
  subcategorymodel.findcategorysysid(
    PRODUCT_CATEGORY_SYS_ID,
    (err, results) => {
      if (!results) {
        return res
          .status(200)
          .json({ message: "product category not exist in table" });
      }
      subcategorymodel.getsubcategory(
        ITEM,
        PRODUCT_CATEGORY_SYS_ID,
        (err, results) => {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          }
          if (results.length > 0) {
            res.status(200).json({
              status: "True",
              response: results,
            });
          } else {
            res.status(200).json({
              status: "False",
              response: "No data found",
            });
          }
        }
      );
    }
  );
};
