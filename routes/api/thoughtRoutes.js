const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// route for /api/thoughts
router
  .route("/")
  .get(getThoughts) // get all thoughts
  .post(createThought); // create a new thought

// route for /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought) // get a single thought by ID
  .put(updateThought) // update a thought by ID
  .delete(deleteThought); // delete a thought by ID

// route for /api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(addReaction) // add a reaction to a thought
  .delete(deleteReaction); // remove a reaction from a thought

module.exports = router;