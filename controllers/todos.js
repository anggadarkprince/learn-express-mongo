const db = require('../models');

exports.getTodos = (req, res) => {
    db.Todo.find()
        .then(todos => {
            res.json(todos);
        })
        .catch(res.send);
};

exports.createTodo = (req, res) => {
    const body = req.body;
    db.Todo.create(body)
        .then(todo => {
            res.status(201).json(todo);
        })
        .catch(res.send);
};

exports.getTodo = (req, res) => {
    db.Todo.findById(req.params.id)
        .then(todo => {
            res.json(todo);
        })
        .catch(res.send);
};

exports.updateTodo = (req, res) => {
    const body = req.body;
    db.Todo.findOneAndUpdate({_id: req.params.id}, body, {new: true})
        .then(todo => {
            res.json(todo);
        })
        .catch(res.send);
};

exports.deleteTodo = (req, res) => {
    db.Todo.remove({_id: req.params.id})
        .then(result => {
            res.json(result);
        })
        .catch(res.send);
};

module.exports = exports;