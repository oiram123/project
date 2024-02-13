const express = require("express");
const router = express.Router();
const { mainApp } = require("../controllers/main");
import { validateRequest } from "../middleware/validateRequest";

router.post("/mainApp", validateRequest, mainApp);

export default router;











