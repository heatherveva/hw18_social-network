const router = require("express").Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  addReaction,
  deleteReaction,
  deleteThought,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .post(createThought)
  .delete(deleteThought);

// router.route("/:thoughtId/reactions").post(addReaction);

// /api/students/:studentId/assignments/:assignmentId
router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction)
  .post(addReaction);

module.exports = router;
