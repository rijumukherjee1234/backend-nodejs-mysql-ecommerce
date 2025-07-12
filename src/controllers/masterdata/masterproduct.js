const productmodel = require("../../models/maserdatamodel/masterproductmodel");
const subcategorymodel = require("../../models/maserdatamodel/masterdatasubcategory");
exports.addProduct = (req, res) => {
  const {
    ITEM,
    PRODUCT_CATEGORY_SYS_ID,
    PRODUCT_SUB_CATEGORY_SYS_ID,
    PRODUCT_NAME,
    PRODUCT_DESCRIPTION,
   
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
           
            CREATED_BY,
            (err, results) => {
              if (err) {
                console.log(err);

                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }
              const data =results.insertId;
              const PRODUCT_IMAGES = req.files
              ? req.files.map((file) => `/uploads/${file.filename}`)
              : [];
           
          
            
              
              const insertdetailes = PRODUCT_IMAGES.map((product)=>{
                console.log(product,"product");
                
                return new Promise((resolve , reject)=>{
                 
                  productmodel.addimage(
                        data,
                        product,
                        
                         (err, results) => {
                            if (err) {
                                reject(err);
                                console.log(err)
                              } else {
                                resolve(results);
                              }
            
                  
                       
                      });
                })
            })
            Promise.all(insertdetailes) .then(() => {
              res.status(200).json({
                status: "True",
                message: "Product and image save successfully"
              });
            })
            .catch((error) => {
              console.error("Error inserting product details:", error);
              res.status(500).json({ message: "Failed to insert product details" });
            });

              // res.status(200).json({
              //   status: "True",
              //   message: "Product added successfully",
              // });
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

const returndata =results.map((data)=>
  ({

PRODUCT_SYS_ID:data.PRODUCT_SYS_ID,
PRODUCT_CATEGORY_SYS_ID:data.PRODUCT_CATEGORY_SYS_ID,
PRODUCT_DESCRIPTION:data.PRODUCT_DESCRIPTION,
PRODUCT_IMAGE_DETAILES:{
  PRODUCT_IMAGE_SYS_ID:data.PRODUCT_IMAGE_SYS_ID,
  PRODUCT_IMAGE:data.PRODUCT_IMAGE
}


})
)

      if (results.length > 0) {
        res.status(200).json({
          status: "True",
          response: returndata,
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
