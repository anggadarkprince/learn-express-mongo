document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const todoList = document.getElementById('todo-list');

    todoList.addEventListener('click', function (e) {
        const element = e.target;
        if (element.classList.contains('delete-todo')) {
            e.stopPropagation();
            const todo = element.parentNode;
            const id = todo.dataset.id;
            const options = {method: 'DELETE', headers: {'Content-Type': 'application/json'}};
            fetch(`/api/todos/${id}`, options)
                .then(res => res.json())
                .then(todo.remove())
                .catch(console.log);
        } else if (element.classList.contains('task')) {
            const id = element.dataset.id;
            let isCompleted = element.dataset.completed;
            isCompleted = (isCompleted == 'true' || isCompleted == 1) ? true : false;

            const options = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    is_completed: !isCompleted
                })
            };
            fetch(`/api/todos/${id}`, options)
                .then(res => res.json())
                .then(todo => {
                    element.classList.toggle('done');
                    element.dataset.completed = todo.is_completed.toString();
                })
                .catch(console.log);
        }
        console.log(element.type);
    });

    function addTodo(todo) {
        var todoItem = document.createElement("li");
        var todoTitle = document.createTextNode(todo.title);
        var todoDelete = document.createElement('span');
        todoDelete.classList.add('delete-todo');
        todoDelete.appendChild(document.createTextNode('x'));

        todoItem.dataset.id = todo._id;
        todoItem.dataset.completed = todo.is_completed.toString();
        todoItem.appendChild(todoTitle);
        todoItem.appendChild(todoDelete);
        todoItem.classList.add('task');
        if (todo.is_completed) {
            todoItem.classList.add('done');
        }

        todoList.insertBefore(todoItem, todoList.firstChild)
    }

    function addTodos(todos) {
        todos.forEach(function (todo) {
            addTodo(todo);
        });
    }

    function createTodo(title) {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                is_completed: false
            })
        }
        fetch('/api/todos', options)
            .then(res => res.json())
            .then(addTodo)
            .catch(console.log);
    }

    fetch('/api/todos')
        .then(res => res.json())
        .then(addTodos)
        .catch(console.log);

    const inputTodo = document.getElementById('todoInput');
    inputTodo.addEventListener('keypress', function (e) {
        if (e.which == 13) {
            createTodo(this.value);
            this.value = '';
        }
    })
});