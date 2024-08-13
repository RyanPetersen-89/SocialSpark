const router = require("express").Router();
const apiRoutes = require("./api");

// mount API routes at /api
router.use("/api", apiRoutes);

// catch-all for unmatched routes
router.use((_req, res) => res.status(404).json({ error: "Route not found!" }));

module.exports = router;