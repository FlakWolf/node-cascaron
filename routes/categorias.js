const { Router } = require('express');
const { check } = require('express-validator');
const res = require('express/lib/response');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/existe-Categoria');
const { validarJWT } = require('../middlewares');

const { validarCampos } = require('../middlewares');
const { modelName } = require('../models/usuario');

const router = Router();



router.get('/', obtenerCategorias);


router.get('/:id',
    [
        check('id', 'No es un id de moongo valido').isMongoId(),
        check('id').custom(existeCategoria)
    ],
    validarCampos,
    obtenerCategoria);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', '')
],
    validarCampos,
    crearCategoria);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
], validarCampos, actualizarCategoria);

router.delete('/:id', [], validarCampos, borrarCategoria);


module.exports = router;