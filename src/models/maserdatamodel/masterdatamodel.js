const connection = require("../../config/db");

const CategoryModel = {
  // Add category
  addCategory: (ITEM, PRODUCT_CATEGORY,CATEGORY_IMAGE, callback) => {
    if (ITEM == "ADD") {
      const query = `INSERT INTO PRODUCT_CATEGORY (PRODUCT_CATEGORY,PRODUCT_CATEGORY_IMAGE) VALUES (?,?)`;
      connection.query(query, [PRODUCT_CATEGORY,CATEGORY_IMAGE], (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      });
    }
    // const query = `INSERT INTO PRODUCT_CATEGORY (PRODUCT_CATEGORY) VALUES (?)`;
  },
// sample json
// {
//   "ITEM":"ADD",
//   "PRODUCT_CATEGORY":"Furniture"
// }

  //VIEW
  viewcategory: (ITEM, callback) => {
    if (ITEM == "VIEW_ALL") {
      const query = `SELECT * FROM PRODUCT_CATEGORY`;
      connection.query(query, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      });
    }
    // const query = `INSERT INTO PRODUCT_CATEGORY (PRODUCT_CATEGORY) VALUES (?)`;
  },
};
module.exports = CategoryModel;
