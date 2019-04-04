var todoListing = document.getElementById('todoListing'),
    toggleAllButton = document.getElementById('toggleAll'),
    addTodoButton = document.getElementById('addTodo'),
    addTodoText = document.getElementById('addTodoText'),
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

todoListing.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete_button')) {
      todoList.deleteTodo(parseInt(e.target.getAttribute('data-position')));
    }
    if (e.target.classList.contains('status_button')) {
      var todoPosition = parseInt(e.target.getAttribute('data-position'));
      var todoStatus = document.querySelector('i[data-position="' + todoPosition + '"]');
      
      if (todoStatus.classList.contains('fa-times-circle')) {
        todoList.toggleCompleted(todoPosition);
        document.querySelector('.status_button[data-position="' + todoPosition + '"]').innerText = 'Re-Do';
      } else {
        todoList.toggleCompleted(todoPosition);
        document.querySelector('.status_button[data-position="' + todoPosition + '"]').innerText = 'Done';
      }
    }
  });

todoListing.addEventListener('keyup', function(e) {
  if (e.target.classList.contains('todo_input')) {
    var caretPosition = e.target.selectionStart;
    var todoPosition = parseInt(e.target.getAttribute('data-position'));
    todoList.changeTodo(todoPosition, e.target.value);

    var inputElement = document.querySelector('.todo_input[data-position="' + todoPosition + '"]');
    inputElement.focus();
    inputElement.setSelectionRange(caretPosition, caretPosition)
  }
});

function displayTodos(todos) {
  while (todoListing.hasChildNodes()) {
    todoListing.removeChild(todoListing.firstChild);
  }
  
  todos.forEach(function(todo, i) {
    var todoListItem = document.createElement('li');
    var todoListItemCheck = document.createElement('i');
    var status;

    if (todo.todoComplete){
      todoListItemCheck.classList.add('far', 'fa-check-circle');
      status = 'Re-Do';
    } else {
      todoListItemCheck.classList.add('far', 'fa-times-circle');
      status = 'Done';
    }

    todoListItemCheck.setAttribute('data-position', i);
    todoListItem.append(todoListItemCheck);
    todoListItem.append(createTodoInput(i, todo.todoText));
    todoListItem.append(createButton(i, 'status_button', status));
    todoListItem.append(createButton(i, 'delete_button', 'X'));
    todoListing.append(todoListItem);
  });
}

function createButton(todoPosition, buttonClass, buttonText) {
  var newButton = document.createElement('button');
  newButton.classList.add('todo_form__button', buttonClass);
  newButton.textContent = buttonText;
  newButton.setAttribute('data-position', todoPosition);
  return newButton;
}

function createTodoInput(todoPosition, todoText) {
  var todoListItemInput = document.createElement('input');
  todoListItemInput.setAttribute('type', 'text');
  todoListItemInput.value = todoText;
  todoListItemInput.className = 'todo_input';
  todoListItemInput.setAttribute('data-position', todoPosition);
  return todoListItemInput;
}