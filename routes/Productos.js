
const { Router } = require("express");
const { productosGet } = require("../controllers/productoscontroller");



const router = Router();

//router.get('/', productosGet);


router.get('/', productosGet);

module.exports = router;