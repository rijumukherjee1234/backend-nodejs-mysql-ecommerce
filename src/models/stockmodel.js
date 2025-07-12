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


      viewstockdetailes:(ITEM,STOCK_ENTRY_DATE,PRODUCT_CATEGORY_SYS_ID, callback) => {
        if (ITEM == "VIEW_ALL") {
            const query = `SELECT * FROM MASTER_STOCK_ENTRY AS STOCK_ID LEFT JOIN STOCK_ENTRY_DETAILES AS STOCK_DETAILES_ID  ON STOCK_ID.STOCK_SYS_ID = STOCK_DETAILES_ID.STOCK_SYS_ID WHERE STOCK_ENTRY_DATE = ? AND PRODUCT_CATEGORY_SYS_ID = ?`;
          connection.query(query,[STOCK_ENTRY_DATE,PRODUCT_CATEGORY_SYS_ID], (err, results) => {
            if (err) {
              return callback(err, null);
            }
            callback(null, results);
          });
        }
        // const query = `INSERT INTO PRODUCT_CATEGORY (PRODUCT_CATEGORY) VALUES (?)`;
      },
  //VIEW
  approvestock: (
    ITEM,
        PRODUCT_CATEGORY_SYS_ID,
        STOCK_ENTRY_DATE,
        STOCK_SYS_ID,
    callback
  ) => {
    if (ITEM == "APPROVE_STOCK_ENTRY") {
      const query = `INSERT INTO PURCHASE_ORDER_TABLE (STOCK_CATEGORY,STOCK_ENTRY_DATE,STOCK_SYS_ID) VALUES (?,?,?)`;

      
      connection.query(
        query,
        [
            PRODUCT_CATEGORY_SYS_ID,
            STOCK_ENTRY_DATE,
            STOCK_SYS_ID,
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
  getstockid:(stocksysid,callback) => {
  
      const query = `SELECT * FROM STOCK_ENTRY_DETAILES WHERE STOCK_SYS_ID =?`;
      connection.query(query,[stocksysid], (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      });
   
    // const query = `INSERT INTO PRODUCT_CATEGORY (PRODUCT_CATEGORY) VALUES (?)`;
  },
  stockapprovedetailes:(
    data, 
    STOCK_SYS_ID,
    PRODUCT_QTY,
    PRODUCT_UOM,
    TOTAL_PRICE,

    callback
  ) => {
  
      const query = `INSERT INTO PURCHASE_ORDER_DETAILES (PURCHASE_ORDER_ID,STOCK_SYS_ID,
PURCHASE_ORDER_QTY,
PURCHASE_ORDER_UOM,
PURCHASE_PRICE
) VALUES (?,?,?,?,?)`;
      connection.query(
        query,
        [data,
            STOCK_SYS_ID,
            PRODUCT_QTY,
            PRODUCT_UOM,
            TOTAL_PRICE,
            
         
        ],
        (err, results) => {
          if (err) {
            return callback(err, null);
          }
          callback(null, results);
        }
      );
   
  },
   
};
module.exports = productmodel;
