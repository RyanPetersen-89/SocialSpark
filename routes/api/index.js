const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// mount user routes under "/users" path
router.use("/users", userRoutes);
// Mount thought routes under "/thoughts" path
router.use("/thoughts", thoughtRoutes);

module.exports = router;