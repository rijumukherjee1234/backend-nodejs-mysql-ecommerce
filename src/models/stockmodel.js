const connection = require("../config/db");

const productmodel = {
  // Add category
  addstock: (
    ITEM,
    PRODUCT_CATEGORY_SYS_ID,
    STOCK_ENTRY_DATE,
    CREATED_BY,
    callback
  ) => {
    if (ITEM == "ADD") {
      const query = `INSERT INTO MASTER_STOCK_ENTRY (PRODUCT_CATEGORY_SYS_ID,STOCK_ENTRY_DATE,CREATED_BY) VALUES (?,?,?)`;
      connection.query(
        query,
        [
          PRODUCT_CATEGORY_SYS_ID,
          STOCK_ENTRY_DATE,
          CREATED_BY,
        ],
        (err, results) => {
          if (err) {
            return callback(err, null);
          }
          callback(null, results);
        }
      );
    }
  },
  stockdetailes:(
        data, 
    PRODUCT_SYS_ID,
    PRODUCT_SUB_CATEGORY_SYS_ID,
    PRODUCT_PRICE,
    PRODUCT_UOM,
    PRODUCT_QTY,
    GST,
    grandTotal,
    totalprice,
        callback
      ) => {
      
          const query = `INSERT INTO STOCK_ENTRY_DETAILES (STOCK_SYS_ID,PRODUCT_SYS_ID,
    PRODUCT_SUB_CATEGORY_SYS_ID,
    PRODUCT_PRICE,
    PRODUCT_UOM,
    PRODUCT_QTY,
    GST,
    TOTAL_PRICE,
    PRODUCT_GRAND_PRICE
  ) VALUES (?,?,?,?,?,?,?,?,?)`;
          connection.query(
            query,
            [data,
                PRODUCT_SYS_ID,
                PRODUCT_SUB_CATEGORY_SYS_ID,
                PRODUCT_PRICE,
                PRODUCT_UOM,
                PRODUCT_QTY,
                GST,
                grandTotal,
                totalprice
                
             
            ],
            (err, results) => {
              if (err) {
                return callback(err, null);
              }
              callback(null, results);
            }
          );
       
      },
      

      updatestock: (
        ITEM,
        STOCK_SYS_ID,
        STOCK_ENTRY_DATE,
      
        callback
      ) => {
        if (ITEM == "UPDATE") {
        //   const query = `INSERT INTO MASTER_STOCK_ENTRY (PRODUCT_CATEGORY_SYS_ID,STOCK_ENTRY_DATE,CREATED_BY) VALUES (?,?,?)`;
          const query = `UPDATE MASTER_STOCK_ENTRY
          SET STOCK_ENTRY_DATE = ? 
          WHERE STOCK_SYS_ID = ?`;
          connection.query(
            query,
            [
                STOCK_ENTRY_DATE,
                STOCK_SYS_ID
            ],
            (err, results) => {
              if (err) {
                return callback(err, null);
              }
              callback(null, results);
            }
          );
        }
      },
      updatestockdetailes:(
    
    PRODUCT_SYS_ID,
    PRODUCT_SUB_CATEGORY_SYS_ID,
    PRODUCT_PRICE,
    PRODUCT_UOM,
    PRODUCT_QTY,
    GST,
    grandTotal,
    totalprice,
    STOCK_DETAILES_SYS_ID, 
        callback
      ) => {
      
        const query = `UPDATE STOCK_ENTRY_DETAILES
        SET PRODUCT_SYS_ID=?, PRODUCT_SUB_CATEGORY_SYS_ID = ?, PRODUCT_PRICE=?,PRODUCT_UOM=?,PRODUCT_QTY=?,GST=?,TOTAL_PRICE=?,PRODUCT_GRAND_PRICE=?
        WHERE STOCK_DETAILES_SYS_ID = ?`;
          connection.query(
            query,
            [ 
                PRODUCT_SYS_ID,
                PRODUCT_SUB_CATEGORY_SYS_ID,
                PRODUCT_PRICE,
                PRODUCT_UOM,
                PRODUCT_QTY,
                GST,
                grandTotal,
                totalprice,
                STOCK_DETAILES_SYS_ID, 
             
            ],
            (err, results) => {
              if (err) {
                return callback(err, null);
              }
              callback(null, results);
            }
          );
       
      },
  
  //VIEW
  
   
};
module.exports = productmodel;
