const stockmodel = require("../models/stockmodel");
const subcategorymodel = require("../models/maserdatamodel/masterdatasubcategory");
exports.addstock = (req, res) => {
  const {
    ITEM,
    PRODUCT_CATEGORY_SYS_ID,
    STOCK_ENTRY_DATE,
    CREATED_BY,
    PRODUCTS
   

  } = req.body;

  if (
    !PRODUCT_CATEGORY_SYS_ID ||
    !STOCK_ENTRY_DATE
  ) {
    return res
      .status(400)
      .json({
        message:
          "Wrong input given for add",
      });
  }

  if (
    ITEM != "ADD" ||
    !STOCK_ENTRY_DATE
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

     

      stockmodel.addstock(
            ITEM,
            PRODUCT_CATEGORY_SYS_ID,
            STOCK_ENTRY_DATE,
            CREATED_BY,
            (err, results) => {
              if (err) {
                console.log(err);

                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }
              console.log(results.insertId,"results");
              
const data =results.insertId;
const insertdetailes = PRODUCTS.map((product)=>{
    return new Promise((resolve , reject)=>{
        const grandTotal = product.PRODUCT_QTY * product.PRODUCT_PRICE;
        const taxTotal = (grandTotal *  product.GST )/100;
        const totalprice = grandTotal+ taxTotal
        stockmodel.stockdetailes(
            data,
            product.PRODUCT_SYS_ID,
            product.PRODUCT_SUB_CATEGORY_SYS_ID,
            product.PRODUCT_PRICE,
            product.PRODUCT_UOM,
            product.PRODUCT_QTY,
            product.GST,
            grandTotal,
            totalprice,
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
      message: "Stock entry and product details added successfully"
    });
  })
  .catch((error) => {
    console.error("Error inserting product details:", error);
    res.status(500).json({ message: "Failed to insert product details" });
  });


            
            }
          );
        }
      );
   
};

  
exports.updatestock = (req, res) => {
    const {
      ITEM,
      PRODUCT_CATEGORY_SYS_ID,
      STOCK_ENTRY_DATE,
      STOCK_SYS_ID,
      PRODUCTS
     
  
    } = req.body;
  
    if (
      !STOCK_SYS_ID ||
      !STOCK_ENTRY_DATE
    ) {
      return res
        .status(400)
        .json({
          message:
            "Wrong input given for update",
        });
    }
  
    if (
      ITEM != "UPDATE" ||
      !STOCK_ENTRY_DATE
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
  
       
  
        stockmodel.updatestock(
              ITEM,
           STOCK_SYS_ID,
              STOCK_ENTRY_DATE,
           
              (err, results) => {
                if (err) {
                  console.log(err);
  
                  return res
                    .status(500)
                    .json({ message: "Internal server error" });
                }
               
                
 
  const insertdetailes = PRODUCTS.map((product)=>{
    console.log(product);
    
      return new Promise((resolve , reject)=>{
        const grandTotal = product.PRODUCT_QTY * product.PRODUCT_PRICE;
        const taxTotal = (grandTotal *  product.GST )/100;
        const totalprice = grandTotal+ taxTotal
          stockmodel.updatestockdetailes(
         
              product.PRODUCT_SYS_ID,
              product.PRODUCT_SUB_CATEGORY_SYS_ID,
              product.PRODUCT_PRICE,
              product.PRODUCT_UOM,
              product.PRODUCT_QTY,
              product.GST,
              grandTotal,
              totalprice,
              product.STOCK_DETAILES_SYS_ID,
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
        message: "Stock entry and product details updated successfully"
      });
    })
    .catch((error) => {
      console.error("Error inserting product details:", error);
      res.status(500).json({ message: "Failed to insert product details" });
    });
  
  
              
              }
            );
          }
        );
     
  };