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

// /api/thought
router.route("/").get(getThoughts);

// /api/thought/:thoughtId
router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .post(createThought)
  .delete(deleteThought);

// add a reaction
// api/thought/thoughtId/reactions/
router.route("/:thoughtId/reactions").post(addReaction);

// delete a reaction
// api/thought/thoughtId/reactions/reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
module.exports = router;
