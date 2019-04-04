var todoListing = document.getElementById('todoListing'),
    toggleAllButton = document.getElementById('toggleAll'),
    addTodoButton = document.getElementById('addTodo'),
    changeTodoButton = document.getElementById('changeTodo'),
    toggleCompletedButton = document.getElementById('toggleCompleted'),
    addTodoText = document.getElementById('addTodoText'),
    changeTodoText = document.getElementById('changeTodoText'),
    changeTodoPosition = document.getElementById('changeTodoPosition'),
    toggleCompletedPosition = document.getElementById('toggleCompletedPosition');

toggleAllButton
  .addEventListener('click', function() {
    todoList.toggleAll();
  });

addTodoButton
  .addEventListener('click', function() {
    todoList.addTodo(addTodoText.value);
    addTodoText.value = '';
  });

changeTodoButton
  .addEventListener('click', function() {
    todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value);
    changeTodoPosition.value = '';
    changeTodoText.value = '';
  });

todoListing.addEventListener('click', function(e) {
    if (e.target.textContent === 'Delete') {
      todoList.deleteTodo(parseInt(e.target.id));
    }
  });

toggleCompletedButton
  .addEventListener('click', function() {
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
    toggleCompletedPosition.value = '';
  });

function displayTodos(todos) {
  while (todoListing.hasChildNodes()) {
    todoListing.removeChild(todoListing.firstChild);
  }
  
  for(var i = 0; i < todos.length; i++) {
    var todoListItem = document.createElement('li');
    var todoListItemCheck = document.createElement('i');

    if (todos[i].todoComplete){
      todoListItemCheck.classList.add('far', 'fa-check-circle');
    } else {
      todoListItemCheck.classList.add('far', 'fa-times-circle');
    }

    todoListItem.append(todoListItemCheck);
    todoListItem.append(' ' + todos[i].todoText + ' ');
    todoListItem.append(createDeleteButton(i));
    todoListing.append(todoListItem);
  }
}

function createDeleteButton(todoPosition) {
  var todoListDeleteButton = document.createElement('button');
  todoListDeleteButton.classList.add('todo_form__button', 'delete_button');
  todoListDeleteButton.textContent = 'Delete';
  todoListDeleteButton.id = todoPosition;
  return todoListDeleteButton;
}