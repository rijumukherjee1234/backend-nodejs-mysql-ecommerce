const connection = require("../../config/db");

const productmodel = {
  // Add category
  addProduct: (
    ITEM,
    PRODUCT_CATEGORY_SYS_ID,
    PRODUCT_SUB_CATEGORY_SYS_ID,
    PRODUCT_NAME,
    PRODUCT_DESCRIPTION,
  
    CREATED_BY,
    callback
  ) => {
    if (ITEM == "ADD") {
      const query = `INSERT INTO MASTER_PRODUCT_TABLE (PRODUCT_CATEGORY_SYS_ID,PRODUCT_SUB_CATEGORY_SYS_ID,PRODUCT_NAME,PRODUCT_DESCRIPTION,CREATED_BY) VALUES (?,?,?,?,?)`;
      connection.query(
        query,
        [
          PRODUCT_CATEGORY_SYS_ID,
          PRODUCT_SUB_CATEGORY_SYS_ID,
          PRODUCT_NAME,
          PRODUCT_DESCRIPTION,
       
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
  addimage: (
   data,image,
    callback
  ) => {
   
      const query = `INSERT INTO PRODUCT_IMAGE (PRODUCT_SYS_ID,PRODUCT_IMAGE) VALUES (?,?)`;
      connection.query(
        query,
        [
          data,
          image
       
        
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
    viewproduct: (ITEM,PRODUCT_CATEGORY_SYS_ID,PRODUCT_SUB_CATEGORY_SYS_ID, callback) => {

      if(ITEM=="VIEW_ALL"){
          const query = `SELECT * FROM MASTER_PRODUCT_TABLE AS PRODUCTID LEFT JOIN PRODUCT_IMAGE AS image  ON PRODUCTID.PRODUCT_SYS_ID = image.PRODUCT_SYS_ID WHERE PRODUCT_CATEGORY_SYS_ID = ? AND PRODUCT_SUB_CATEGORY_SYS_ID = ?`;
      connection.query(query,[PRODUCT_CATEGORY_SYS_ID,PRODUCT_SUB_CATEGORY_SYS_ID], (err, results) => {
          if (err) {
console.log(err);

            return callback(err, null);
          }
          callback(null, results);
        });
      }
      // const query = `INSERT INTO PRODUCT_CATEGORY (PRODUCT_CATEGORY) VALUES (?)`;

    },
    specificproduct: (ITEM,PRODUCT_SYS_ID, callback) => {

      if(ITEM=="SPECIFIC"){
          const query = `SELECT * FROM MASTER_PRODUCT_TABLE AS PRODUCTID LEFT JOIN PRODUCT_IMAGE AS image  ON PRODUCTID.PRODUCT_SYS_ID = image.PRODUCT_SYS_ID WHERE PRODUCT_SYS_ID =?`;
      connection.query(query,[PRODUCT_SYS_ID], (err, results) => {
          if (err) {
console.log(err);

            return callback(err, null);
          }
          callback(null, results);
        });
      }
      // const query = `INSERT INTO PRODUCT_CATEGORY (PRODUCT_CATEGORY) VALUES (?)`;

    },
};
module.exports = productmodel;
