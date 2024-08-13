const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// route for /api/users
router
  .route("/")
  .get(getUsers) // get all users
  .post(createUser); // create a new user

// route for /api/users/:userId
router
  .route("/:userId")
  .get(getSingleUser) // get a single user by ID
  .put(updateUser) // update a user by ID
  .delete(deleteUser); // delete a user by ID

// route for /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addFriend) // add a friend to a user
  .delete(deleteFriend); // remove a friend from a user

module.exports = router;