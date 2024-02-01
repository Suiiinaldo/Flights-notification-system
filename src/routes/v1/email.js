const { Router } = require("express");
const router = Router();
const { EmailController } = require("../../controller");


router.post("/",
            EmailController.create);


module.exports = router;