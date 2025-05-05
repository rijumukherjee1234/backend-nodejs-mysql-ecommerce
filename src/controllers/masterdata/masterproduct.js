const productmodel = require("../../models/maserdatamodel/masterproductmodel");
const subcategorymodel = require("../../models/maserdatamodel/masterdatasubcategory");
exports.addProduct = (req, res) => {
  const {
    ITEM,
    PRODUCT_CATEGORY_SYS_ID,
    PRODUCT_SUB_CATEGORY_SYS_ID,
    PRODUCT_NAME,
    PRODUCT_DESCRIPTION,
    PRODUCT_IMAGE,
    CREATED_BY,
  } = req.body;

  if (
    !PRODUCT_CATEGORY_SYS_ID ||
    !ITEM ||
    !PRODUCT_SUB_CATEGORY_SYS_ID ||
    !PRODUCT_NAME
  ) {
    return res
      .status(400)
      .json({
        message:
          "Please add  PRODUCT_CATEGORY_SYS_ID,PRODUCT_SUB_CATEGORY_SYS_ID,PRODUCT_NAME,ITEM",
      });
  }

  if (
    ITEM != "ADD" ||
    !PRODUCT_CATEGORY_SYS_ID ||
    !PRODUCT_SUB_CATEGORY_SYS_ID
  ) {
    return res.status(200).json({ message: "Wrong input given for add" });
  }

  subcategorymodel.findcategorysysid(
    PRODUCT_CATEGORY_SYS_ID,
    (err, results) => {
      if (!results) {
        return res
          .status(200)
          .json({ message: "product category not exist in table" });
      }

      subcategorymodel.findsubcategorysysid(
        PRODUCT_SUB_CATEGORY_SYS_ID,
        (err, results) => {
          if (!results) {
            return res
              .status(200)
              .json({ message: "product subcategory not exist in table" });
          }

          productmodel.addProduct(
            ITEM,
            PRODUCT_CATEGORY_SYS_ID,
            PRODUCT_SUB_CATEGORY_SYS_ID,
            PRODUCT_NAME,
            PRODUCT_DESCRIPTION,
            PRODUCT_IMAGE,
            CREATED_BY,
            (err, results) => {
              if (err) {
                console.log(err);

                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }

              res.status(200).json({
                status: "True",
                message: "Product added successfully",
              });
            }
          );
        }
      );
    }
  );
};

   exports.viewproduct = (req, res) => {
    const { ITEM,PRODUCT_CATEGORY_SYS_ID,PRODUCT_SUB_CATEGORY_SYS_ID } = req.query;

    if (!ITEM) {
      return res.status(400).json({ message: "please add payload" });
    }
    if (ITEM !="VIEW_ALL") {
      return res.status(200).json({ message: "Wrong input given" });
    }

    productmodel.viewproduct(ITEM,PRODUCT_CATEGORY_SYS_ID,PRODUCT_SUB_CATEGORY_SYS_ID, (err, results) => {

      if (err) {
        console.log(err);
        
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
    });
   };

   exports.specificproduct = (req, res) => {
    const { ITEM,PRODUCT_SYS_ID} = req.query;

    if (!ITEM) {
      return res.status(400).json({ message: "please add payload" });
    }
    if (ITEM !="SPECIFIC") {
      return res.status(200).json({ message: "Wrong input given" });
    }

    productmodel.specificproduct(ITEM,PRODUCT_SYS_ID, (err, results) => {

      if (err) {
        console.log(err);
        
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
    });
   };
