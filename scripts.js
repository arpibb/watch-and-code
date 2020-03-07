const addTodoBox = document.querySelector('#add-todo');

const toDoList = {
  todos: [],
  displayTodos() {
    if(this.todos.length !==0){
      this.todos.forEach(todo => {
        todo.completed ? console.log(`(X) ${todo.todoText}`) : console.log(`( ) ${todo.todoText}`)
    })}
    else{
      console.log('Todo list is emppty');
    }
  },
  addTodo(todoText){
    this.todos.push({todoText, completed: false});
    this.displayTodos();
  },
  changeTodo(idx,newVal){
    this.todos[idx].todoText = newVal;
    this.displayTodos();
  },
  deleteTodo(idx){
    this.splice(idx,1);
    this.displayTodos();
  },
  todoToggleCompleted(idx){
    this.todos[idx].completed = !this.todos[idx].completed;
    this.displayTodos();
  },
  todoToggleAll(){
    let completedCount = 0;
    this.todos.forEach(todo => todo.completed ? completedCount +=1 : completedCount);
    //console.log(completedArray)
    if(this.todos.length === completedCount){
      this.todos.forEach(todo => todo.completed = false);
    }
    else{
      this.todos.forEach(todo => todo.completed = true);
    }
    this.displayTodos();
  }
};

const handlers = {
  displayTodos(){
    toDoList.displayTodos();
  },
  toggleAllTodos(){
    toDoList.todoToggleAll();
  },
  addTodo(){
    let inputText = document.querySelector("#addTodo");
    toDoList.addTodo(inputText.value);
    inputText.value = '';
  }
}