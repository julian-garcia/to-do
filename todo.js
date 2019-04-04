
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    if (todoText === '') return;
    this.todos.push({todoText: todoText, 
                     todoComplete: false});
    displayTodos(this.todos);
  },
  changeTodo: function(position, newVal) {
    if (newVal === '' || position !== position || 
        position < 0 || position >= this.todos.length) return;
    this.todos[position].todoText = newVal;
    displayTodos(this.todos);
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    displayTodos(this.todos);
  },
  toggleCompleted: function(position) {
    if (position !== position || 
        position < 0 || position >= this.todos.length) return;
    this.todos[position].todoComplete = !this.todos[position].todoComplete;
    displayTodos(this.todos);
  },
  toggleAll: function() {
    var trueCount = 0;
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].todoComplete === true) trueCount++;
    }
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos.length === trueCount) {
        this.todos[i].todoComplete = false;
      } else {
        this.todos[i].todoComplete = true;
      }
    }
    displayTodos(this.todos);
  }
};