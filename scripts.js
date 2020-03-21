const addTodoBox = document.querySelector('#add-todo');
const deleteButtons = document.querySelector('.deleteButton');
const controls = document.querySelector('.display-controls');
const itemLeft = document.querySelector('#item-left');
const toggleAllBtn = document.querySelector('#toggle-all-btn');

const toDoList = {
  todos: [],
  addTodo(todoText){
    this.todos.push({todoText, completed: false});
    localStorage.setItem('todos',JSON.stringify(this.todos));
    view.displayTodos();
  },
  changeTodo(idx,newVal){
    this.todos[idx].todoText = newVal;
    view.displayTodos();
  },
  deleteTodo(idx){
    this.todos.splice(idx,1);
    localStorage.setItem('todos',JSON.stringify(this.todos));
    view.displayTodos();
  },
  todoToggleCompleted(idx){
    this.todos[idx].completed = !this.todos[idx].completed;
    localStorage.setItem('todos',JSON.stringify(this.todos));
    view.displayTodos();
  },
  todoToggleAll(){
    let completedCount = 0;
    this.todos.forEach(todo => todo.completed ? completedCount += 1 : completedCount);
    this.todos.forEach(todo => this.todos.length === completedCount ? todo.completed = false : todo.completed = true);
    localStorage.setItem('todos',JSON.stringify(this.todos));
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
    toDoList.changeTodo(changeTextPos.valueAsNumber, changeText.value);
    changeText.value = "";
    changeTextPos.value = "";
  },
  deleteTodo(idx){
    toDoList.deleteTodo(idx);
  },
  toggleTodo(idx){
    toDoList.todoToggleCompleted(idx);
  },
  toggleAllTodos(){
    toDoList.todoToggleAll();
  },
  displayCompletedTodos(){
    console.log('displaying all');
  }
};

const view = {
  displayTodos(){
    let unOrderedToDoList = document.querySelector('#toDoList')
    unOrderedToDoList.innerHTML = "";
    let notCompletedTodos = 0;
    toDoList.todos.map((todo,idx) => {
      let toDoLi = document.createElement('li');
      let toDoDiv = document.createElement('div');
      toDoDiv.classList.add('toDoDiv');

      toDoLi.classList.add('toDoLi');
      toDoLi.id = idx;

      let toDoLabel = document.createElement('label');
      toDoLabel.classList.add('toDoLi-text');
      toDoLabel.textContent = todo.todoText;
      
      let toggleImgSrc = '';
      //if the todo is completed crossing out the text and switching between icons before the text
      todo.completed ? toDoLabel.classList.add('completed') : toDoLabel.classList.remove('completed');
      todo.completed ? notCompletedTodos : notCompletedTodos +=1;
      //todo.completed ? toggleImgSrc="assets/icons/icons8-checkmark-48.png" : toggleImgSrc="assets/icons/icons8-circle-50.png";
      toDoDiv.appendChild(this.createToggleButton(toggleImgSrc));
      toDoDiv.appendChild(toDoLabel);
      toDoDiv.appendChild(this.createDeleteButton());
      toDoLi.appendChild(toDoDiv)
      unOrderedToDoList.appendChild(toDoLi);

  })
    if(toDoList.todos.length !== 0){
      controls.classList.remove('hidden');
      toggleAllBtn.classList.remove('hidden');
      toggleAllBtn.classList.add('visible-inline');
      itemLeft.textContent = `${notCompletedTodos} item left`;
    }
    else{
      controls.classList.add('hidden');
      toggleAllBtn.classList.add('hidden')
    }
  },
  createDeleteButton(){
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    return deleteButton
  },
  createToggleButton(src){
    const toggleButton = document.createElement('input');
    toggleButton.setAttribute('type','checkbox');
    //toggleButton.setAttribute('src',src)
    toggleButton.classList.add('toggle-button');
    return toggleButton
  },
  setUpEventListeners(){
    const todosUl = document.querySelector('ul');
    const addTodo = document.querySelector("#addTodo");
    todosUl.addEventListener('click', (e) => {
      if(e.target.className === "delete-button"){
        handlers.deleteTodo(e.target.parentNode.id);
      }
      else if(e.target.className === "toggle-button"){
        handlers.toggleTodo(e.target.parentNode.parentNode.id);
      }
      
    });
    todosUl.addEventListener('dblclick', (e) => {
      console.log(e.target.textContent)
      const editingInput = document.createElement('input');
      if(e.target.className === "toDoLi-text"){
        console.log(e.target.textContent)
        
      }
    });
    addTodo.addEventListener('keydown',(e)=>{
      if(e.code ==='Enter' && e.target.value !== ""){
        handlers.addTodo();
      }
    });
    
  }
}
toDoList.todos = JSON.parse(localStorage.getItem('todos')) || [];
view.setUpEventListeners();
view.displayTodos();