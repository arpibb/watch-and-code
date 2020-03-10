const addTodoBox = document.querySelector('#add-todo');
const deleteButtons = document.querySelector('.deleteButton');

const toDoList = {
  todos: [],
  addTodo(todoText){
    this.todos.push({todoText, completed: false});
    view.displayTodos();
  },
  changeTodo(idx,newVal){
    this.todos[idx].todoText = newVal;
    view.displayTodos();
  },
  deleteTodo(idx){
    this.todos.splice(idx,1);
    view.displayTodos();
  },
  todoToggleCompleted(idx){
    this.todos[idx].completed = !this.todos[idx].completed;
    view.displayTodos();
  },
  todoToggleAll(){
    let completedCount = 0;
    this.todos.forEach(todo => todo.completed ? completedCount += 1 : completedCount);
    //console.log(completedArray)
    this.todos.forEach(todo => this.todos.length === completedCount ? todo.completed = false : todo.completed = true);
    view.displayTodos();
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
  deleteTodo(idx){
    toDoList.deleteTodo(idx);
  },
  toggleTodo(idx){
    let toggleToDoPos = document.querySelector('#toggleToDoPos');
    toDoList.todoToggleCompleted(idx);
    toggleToDoPos.value = "";
  },
  toggleAllTodos(){
    toDoList.todoToggleAll();
  }
}
const view = {
  displayTodos(){
    let unOrderedToDoList = document.querySelector('#toDoList')
    unOrderedToDoList.innerHTML = "";
    toDoList.todos.map((todo,idx) => {
      let toDoLi = document.createElement('li');
      toDoLi.id = idx;
      toDoLi.textContent = todo.completed ? `(X) ${todo.todoText}` :  `( ) ${todo.todoText}`;
      toDoLi.appendChild(this.createToggleButton());
      toDoLi.appendChild(this.createDeleteButton());
      unOrderedToDoList.appendChild(toDoLi);
  })
  },
  createDeleteButton(){
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    return deleteButton
  },
  createToggleButton(){
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Done';
    toggleButton.classList.add('toggle-button');
    return toggleButton
  },
  setUpEventListeners(){
    const todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', (e) => {
      if(e.target.className === "delete-button"){
        handlers.deleteTodo(e.target.parentNode.id);
      }
      else if(e.target.className === "toggle-button"){
        handlers.toggleTodo(e.target.parentNode.id);

      }
    });
  }
}

view.setUpEventListeners();