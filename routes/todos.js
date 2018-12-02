var app = require('express');
var router = app.Router();
var controller = require('../controllers/todos');

router.route('/')
    .get(controller.getTodos)
    .post(controller.createTodo);

router.route('/:id')
    .get(controller.getTodo)
    .put(controller.updateTodo)
    .delete(controller.deleteTodo);

module.exports = router;