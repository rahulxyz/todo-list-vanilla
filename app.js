//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filter = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todolist.addEventListener('click', deleteCheck);
filter.addEventListener('change', filterTodo);

//functions
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Save todo
    saveTodos(todoInput.value);

    //check btn
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todolist.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;

    //delete
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement
        const value = todo.getElementsByClassName('todo-item')[0].outerText;
        removeTodo(value);

        //animation
        todo.classList.add("deleted");
        todo.addEventListener('transitioned', function () {
            todo.remove();
        })


    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }


}

function filterTodo(event) {
    const todos = todolist.children;
    Array.from(todos).forEach(function (todo) {

        switch (event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveTodos(newTodo) {
    let todos;
    if (localStorage.getItem('todos') === null)
        todos = [];
    else {
        let list = localStorage.getItem('todos');
        todos = JSON.parse(list);
    }
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = JSON.parse(localStorage.getItem('todos'));

    todos.forEach((todo) => {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check btn
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append to list
        todolist.appendChild(todoDiv);

        //clear todo input value
        todoInput.value = "";

    });
}

function removeTodo(todo) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let index = todos.indexOf(todo);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}