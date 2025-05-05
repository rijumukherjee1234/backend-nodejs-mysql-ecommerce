const connection = require("../../config/db");

const subcategorymodel = {
  // Add category
  addSubCategory: (
    ITEM,
    PRODUCT_CATEGORY_SYS_ID,
    SUB_CATEGORY_NAME,
    callback
  ) => {
    if (ITEM == "ADD") {
      const query = `INSERT INTO PRODUCT_SUBCATEGORY (PRODUCT_CATEGORY_SYS_ID,SUBCATEGORY_NAME) VALUES (?,?)`;
      connection.query(
        query,
        [PRODUCT_CATEGORY_SYS_ID, SUB_CATEGORY_NAME],
        (err, results) => {
          if (err) {
            console.error("Error in addCity model:", err);
            return callback(err, null);
          }
          callback(null, results);
        }
      );
    }
    // const query = `INSERT INTO PRODUCT_CATEGORY (PRODUCT_CATEGORY) VALUES (?)`;
  },
  
  //sample json
  //{
//     "ITEM":"ADD",
//     "PRODUCT_CATEGORY_SYS_ID":"1",
//     "SUB_CATEGORY_NAME":"Check Shirts"

// }

  findcategorysysid: (PRODUCT_CATEGORY_SYS_ID, callback) => {
    const sql =
      "SELECT * FROM PRODUCT_CATEGORY WHERE PRODUCT_CATEGORY_SYS_ID = ?";
    connection.query(sql, [PRODUCT_CATEGORY_SYS_ID], (err, results) => {
      if (err) {
        console.log(err, "err");
        return callback(err, null);
      }
      callback(null, results.length > 0 ? results[0] : null); // Return user if found
    });
  },
  findsubcategorysysid: (PRODUCT_SUB_CATEGORY_SYS_ID, callback) => {
    const sql =
      "SELECT * FROM PRODUCT_SUBCATEGORY WHERE PRODUCT_SUB_CATEGORY_SYS_ID = ?";
    connection.query(sql, [PRODUCT_SUB_CATEGORY_SYS_ID], (err, results) => {
      if (err) {
        console.log(err, "err");
        return callback(err, null);
      }
      callback(null, results.length > 0 ? results[0] : null); // Return user if found
    });
  },
  //VIEW
  getsubcategory: (ITEM, PRODUCT_CATEGORY_SYS_ID, callback) => {
    if (ITEM == "VIEW_ALL") {
      const query = `SELECT * FROM PRODUCT_SUBCATEGORY WHERE PRODUCT_CATEGORY_SYS_ID = ? `;
      connection.query(query, [PRODUCT_CATEGORY_SYS_ID], (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      });
    }
    // const query = `INSERT INTO PRODUCT_CATEGORY (PRODUCT_CATEGORY) VALUES (?)`;
  },
};
module.exports = subcategorymodel;
