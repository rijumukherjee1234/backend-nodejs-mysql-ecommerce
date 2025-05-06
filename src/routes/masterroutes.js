const express = require('express');
const { login } = require('../controllers/auth'); // Import controller
const CategoryModel = require('../controllers/masterdata/masterdatacategory.js');
const subcategorymodel = require('../controllers/masterdata/masterdatasubcategory.js');
const masterproduct = require('../controllers/masterdata/masterproduct.js');
const stockproduct = require('../controllers/stockcontrolers.js');
const verifyToken = require('../middlewares/verifytoken.js');
const upload = require("../middlewares/fileuploas.js");
const router = express.Router();

// Login route
router.post('/api-post-add-master-category',verifyToken, CategoryModel.addCategory);
router.get('/api-get-view-category',verifyToken, CategoryModel.viewcategory);
router.post('/api-post-add-master-sub-category',verifyToken, subcategorymodel.subcategory);
router.get('/api-get-view-sub-category',verifyToken, subcategorymodel.getsubcategory);
router.post('/api-post-create-master-product',upload.array("COURSE_IMAGES", 5), masterproduct.addProduct);
router.get('/api-get-view-master-product',verifyToken,  masterproduct.viewproduct);
router.get('/api-get-view-specific-master-product',verifyToken, masterproduct.specificproduct);
router.post('/api-post-product-stock-entry',verifyToken, stockproduct.addstock);
router.post('/api-post-update-product-stock-entry',verifyToken, stockproduct.updatestock);

module.exports = router;
