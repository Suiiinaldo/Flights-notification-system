const express = require("express");
const emailRoutes = require("./email");

const { InfoController } = require("../../controller");

const router = express.Router();

router.get("/info", InfoController.info);

router.use("/ticket",emailRoutes);

module.exports = router;
