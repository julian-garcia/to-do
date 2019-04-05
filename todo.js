// Backend todo list alongside methods to add/change/delete items
var todoList = {
  todos: (localStorage.getItem('todos') === null) ? [] : JSON.parse(localStorage.getItem('todos')),
  storeTodos: function() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  },
  addTodo: function(todoText) {
    if (todoText === '') return;
    this.todos.push({todoText: todoText, 
                     todoComplete: false});
    this.storeTodos();
    displayTodos(this.todos);
  },
  changeTodo: function(position, newVal) {
    if (newVal === '' || position !== position || 
        position < 0 || position >= this.todos.length) return;
    this.todos[position].todoText = newVal;
    this.storeTodos();
    displayTodos(this.todos);
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.storeTodos();
    displayTodos(this.todos);
  },
  toggleCompleted: function(position) {
    if (position !== position || 
        position < 0 || position >= this.todos.length) return;
    this.todos[position].todoComplete = !this.todos[position].todoComplete;
    this.storeTodos();
    displayTodos(this.todos);
  },
  toggleAll: function() {

    var trueCount = 0;
    var totalTodos = this.todos.length;

    this.todos.forEach(function(todo) {
      if (todo.todoComplete === true) trueCount++;
    });

    this.todos.forEach(function(todo) { 
      todo.todoComplete = !(totalTodos === trueCount); 
    });
    this.storeTodos();
    displayTodos(this.todos);
  }
};