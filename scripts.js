const addTodoBox = document.querySelector('#add-todo');

const toDoList = {
  todos: [],
  displayTodos() {
    let unOrderedToDoList = document.querySelector('#toDoList')
    unOrderedToDoList.innerHTML = "";
    this.todos.map(todo => {
      let toDoLi = document.createElement('li')
      toDoLi.textContent = todo.completed ? `(X) ${todo.todoText}` : `( ) ${todo.todoText}`;
      unOrderedToDoList.appendChild(toDoLi);
  })
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
    this.todos.splice(idx,1);
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
  addTodo(){
    let inputText = document.querySelector("#addTodo");
    toDoList.addTodo(inputText.value);
    inputText.value = '';
  },
  changeTodo(){
    let changeText = document.querySelector("#toDoText");
    let changeTextPos = document.querySelector("#toDoPos");
    toDoList.changeTodo(changeTextPos.valueAsNumber,changeText.value);
    changeText.value = "";
    changeTextPos.value = "";
  },
  deleteTodo(){
    let deleteTextPos = document.querySelector("#deleteToDoPos");
    toDoList.deleteTodo(deleteTextPos.valueAsNumber);
    deleteTextPos.value = "";
  },
  toggleTodo(){
    let toggleToDoPos = document.querySelector('#toggleToDoPos');
    toDoList.todoToggleCompleted(toggleToDoPos.valueAsNumber);
    toggleToDoPos.value = "";
  },
  toggleAllTodos(){
    toDoList.todoToggleAll();
  }
}
const view = {
  displayTodos(){

  }
}