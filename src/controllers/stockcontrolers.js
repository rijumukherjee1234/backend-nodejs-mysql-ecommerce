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

  // get stock entry
  exports.viewstockdetailes = (req, res) => {
    const { ITEM,STOCK_ENTRY_DATE,PRODUCT_CATEGORY_ID } = req.query;
  
    if (!ITEM) {
      return res.status(400).json({ message: "please add payload" });
    }
    if (ITEM != "VIEW_ALL") {
      return res.status(200).json({ message: "Wrong input given for" });
    }
  
    stockmodel.viewstockdetailes(ITEM,STOCK_ENTRY_DATE,PRODUCT_CATEGORY_ID, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
  
      res.status(200).json({
        status: "True",
        response: results,
      });
    });
  };

  //INITITATE TO PURCHASE ORDER

  exports.approvestock = (req, res) => {
    const {
      ITEM,
      PRODUCT_CATEGORY_SYS_ID,
      STOCK_ENTRY_DATE,
      STOCK_SYS_ID,
    } = req.body;
  
    // Validate input
    if (ITEM !== "APPROVE_STOCK_ENTRY" || !STOCK_ENTRY_DATE) {
      return res.status(400).json({ message: "Wrong input given for add" });
    }
  
    // Step 1: Insert into PURCHASE_ORDER_TABLE
    stockmodel.approvestock(
      ITEM,
      PRODUCT_CATEGORY_SYS_ID,
      STOCK_ENTRY_DATE,
      STOCK_SYS_ID,
      (err, insertResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
        }
  
        const purchaseOrderId = insertResult.insertId;
  
        // Step 2: Fetch details from STOCK_ENTRY_DETAILES
        stockmodel.getstockid(STOCK_SYS_ID, (err2, detailRows) => {
          if (err2) {
            console.error(err2);
            return res.status(500).json({ message: "Failed to fetch product details" });
          }
  
          if (!detailRows || detailRows.length === 0) {
            return res.status(404).json({ message: "No product details found for this stock" });
          }
  
          // Step 3: Insert each product detail into PURCHASE_ORDER_DETAILS (or similar)
          const insertPromises = detailRows.map((product) => {
            return new Promise((resolve, reject) => {
              stockmodel.stockapprovedetailes(
                purchaseOrderId,
                product.STOCK_SYS_ID,
                product.PRODUCT_QTY,
                product.PRODUCT_UOM,
                product.TOTAL_PRICE,
                (err3, result3) => {
                  if (err3) {
                    console.error("Insert detail error:", err3);
                    return reject(err3);
                  }
                  resolve(result3);
                }
              );
            });
          });
  
          // Step 4: Await all inserts
          Promise.all(insertPromises)
            .then(() => {
              res.status(200).json({
                status: true,
                message: "Stock entry and product details approved successfully",
              });
            })
            .catch((error) => {
              console.error("Error inserting product details:", error);
              res.status(500).json({ message: "Failed to insert product details" });
            });
        });
      }
    );
  };
  