const { getAll, create, remove } = require('../controllers/category.controllers');
const express = require('express');
const verifyJWT = require('../utils/verify.JWT');

const routerCategory = express.Router();

routerCategory.route('/')
    .get(getAll)
    .post(verifyJWT, create);

routerCategory.route('/:id')
    .delete(verifyJWT, remove)

module.exports = routerCategory;