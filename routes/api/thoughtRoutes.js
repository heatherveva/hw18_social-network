const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  addReaction,
  removeReaction,
  deleteThought,
} = require("../../controllers/thoughtController");

// /api/students
router.route("/").get(getThoughts);

// // /api/students/:studentId
// router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

// router.route("/:thoughtId/reactions").post(addReaction);

// // /api/students/:studentId/assignments/:assignmentId
// router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
