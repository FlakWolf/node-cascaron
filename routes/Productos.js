
const { Router } = require("express");
const { check } = require("express-validator");

const { productosGet, productosPost } = require("../controllers/productoscontroller");



const router = Router();

//router.get('/', productosGet);


router.get('/', productosGet);

router.post('/', productosPost);

// [
//     check('Name', 'El Nombre es un valor obligatorio').not().isEmpty(),
//     check('Description', 'El correo no tiene un formato valido').not().isEmpty(),
//     check('Price', 'no puede ser vacio').not().isEmpty()
// ]
//     ,

module.exports = router;