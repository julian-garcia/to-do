var todoListing = document.getElementById('todoListing'),
    addTodoButton = document.getElementById('addTodo'),
    addTodoText = document.getElementById('addTodoText'),
    toggleTodos = document.getElementById('toggleTodos');

document.addEventListener('DOMContentLoaded', function() {
  displayTodos(todoList.todos);
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
      todoList.toggleCompleted(todoPosition);
    }
  });

addTodoText.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      todoList.addTodo(addTodoText.value);
      addTodoText.value = '';
    }
  });

todoListing.addEventListener('keyup', function(e) {
  if (e.target.classList.contains('todo_form__input')) {
    var caretPosition = e.target.selectionStart;
    var todoPosition = parseInt(e.target.getAttribute('data-position'));

    if (e.target.value === '') {
      todoList.deleteTodo(todoPosition);
      return;
    }

    todoList.changeTodo(todoPosition, e.target.value);

    var inputElement = document.querySelector('.todo_form__input[data-position="' + todoPosition + '"]');
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
    var spanElement = createSpan('item_buttons');
    var status;

    status = (todo.todoComplete) ? 'fa-grin' : 'fa-check';

    todoListItem.append(createInput(i, todo.todoText));
    spanElement.append(createIcon(i, 'fas', status, 'status_button'));
    spanElement.append(createIcon(i, 'far', 'fa-trash-alt', 'delete_button'));
    todoListItem.append(spanElement);
    todoListing.append(todoListItem);

    var inputElement = document.querySelector('.todo_form__input[data-position="' + i + '"]');

    if (todo.todoComplete){
      inputElement.classList.add('todo_form__input--strike');
      inputElement.disabled = true;
    } else {
      inputElement.classList.remove('todo_form__input--strike');
      inputElement.disabled = false;
    }
  });
  toggleAllContext();
  noTodosPlaceholder();
}

function createButton(todoPosition, buttonClasses, buttonText, buttonId, disabled) {
  var newButton = document.createElement('button');
  newButton.classList.add('todo_form__button', ...buttonClasses);
  newButton.textContent = buttonText;
  newButton.setAttribute('data-position', todoPosition);
  newButton.id = buttonId;
  if (disabled) {
    newButton.setAttribute('disabled', disabled);
  } else {
    newButton.removeAttribute('disabled');
  }
  return newButton;
}

function createIcon(todoPosition, faClass1, faClass2, iconClass) {
  var newIcon = document.createElement('i');
  newIcon.classList.add(faClass1, faClass2, iconClass);
  newIcon.setAttribute('data-position', todoPosition);
  return newIcon;
}

function createSpan(spanClass) {
  var newSpan = document.createElement('span');
  newSpan.classList.add(spanClass);
  return newSpan;
}

function createInput(todoPosition, todoText) {
  var newInput = document.createElement('input');
  newInput.setAttribute('type', 'text');
  newInput.value = todoText;
  newInput.className = 'todo_form__input';
  newInput.setAttribute('data-position', todoPosition);
  return newInput;
}

function toggleAllContext() {
  while (toggleTodos.hasChildNodes()) {
    toggleTodos.removeChild(toggleTodos.firstChild);
  }

  var disabled, trueCount = 0;
  var totalTodos = todoList.todos.length;

  todoList.todos.forEach(function(todo) {
    if (todo.todoComplete === true) trueCount++;
  });

  if (totalTodos == 0) {
    buttonClass = 'fa-toggle-off';
    disabled = true;
  } else {
    if (totalTodos == trueCount) {
      buttonClass = 'fa-toggle-on';
    } else {
      buttonClass = 'fa-toggle-off';
    }
    disabled = false;
  }

  toggleTodos.append(createButton(0, ['todo_form__button', 'todo_form__button--lg', 'fas', buttonClass], '', 'toggleAll', disabled));

  document.getElementById('toggleAll')
    .addEventListener('click', function() {
      todoList.toggleAll();
    });
}

function noTodosPlaceholder() {
  if (todoList.todos.length === 0) {
    var noTodosParagraph = document.createElement('h2');
    noTodosParagraph.textContent = 'You have zero to do... Add a task above';
    todoListing.append(noTodosParagraph);
  }
}