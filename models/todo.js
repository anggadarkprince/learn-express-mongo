const mongoose = require('mongoose');
let todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Name cannot be blank'
    },
    is_completed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

let Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;