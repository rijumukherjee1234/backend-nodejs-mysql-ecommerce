const connection = require("../config/db");

// Function to find a user by username and password
exports.findUserByCredentials = (USER_NAME, callback) => {
  const query = "SELECT * FROM ADMIN_LOGIN WHERE USER_NAME = ?";
  connection.query(query, [USER_NAME], callback);
};
