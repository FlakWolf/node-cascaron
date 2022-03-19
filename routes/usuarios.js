const { Router } = require('express');
const { check, body } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { esRolvalido, correoExiste, existeIdMoongo } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIdMoongo),
    check('rol').custom(esRolvalido),



    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El Nombre es un valor obligatorio').not().isEmpty(),
    check('correo', 'El correo no tiene un formato valido').isEmail(),
    check('password', 'El password debe contener al menos 6 letras').isLength({ min: 6 }),
    check('rol').custom(esRolvalido),
    check('correo').custom(correoExiste),
    validarCampos

]
    , usuariosPost);

router.delete('/', usuariosDelete);


module.exports = router;