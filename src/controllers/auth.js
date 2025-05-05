const userModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
console.log(SECRET_KEY);
exports.login = (req, res) => { 
  const { USER_NAME, PASSWORD } = req.body;

  if (!USER_NAME || !PASSWORD) {
    return res
      .status(500)
      .json({ message: "Username or password missing for login" });
  }

  userModel.findUserByCredentials(USER_NAME, (error, results) => {
    console.log(results,"results");
    
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  
    if (!results || results.length === 0) {
      return res.status(200).json({ status:"false",  message: "User account not avalable in this system" });
    }
  
    const user = results[0];
    const token = jwt.sign(
      { id: user.AUTH_SYS_ID, username: user.USER_NAME },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    if (PASSWORD != user.PASSWORD) {
        return res.status(200).json({status:"false",  message: "Wrong Passsword plz check it" });
      }else{
        return res.status(200).json({status:"true",  message: "Login successfully",data:results[0],token });
      }
 
   
  });
};
