const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  addFriend,
  removeFriend,
  deleteUser,
} = require("../../controllers/userController");

// /api/students
router.route("/").get(getUsers).post(createUser);

// // /api/students/:studentId
// router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// // /api/students/:studentId/assignments/:assignmentId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
