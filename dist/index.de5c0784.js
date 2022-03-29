/**
 * Init contructor
 * @constructor
 * @param {number} id - id for Todo
 * @param {string} content - content for Todo 
 * @param {boolean} isDone - status for Todo
 */ function Todo(id, content, isDone) {
    this.id = id;
    this.content = content;
    this.isDone = isDone;
}
/**
   * Controler
   */ function TodoController() {
    this.todoList = [];
    this.id = 1;
    this.ENTER_KEY = 13;
    this.todoInput = document.getElementById('newTodo');
    this.todoListView = document.getElementById('todoListView');
}
TodoController.prototype = {
    getTodoFromLocalstorage: function(key) {
        let todoList = JSON.parse(localStorage.getItem(key)) || [];
        return todoList;
    },
    setTodoLocalstorage: function(key) {
        localStorage.setItem('todoList', JSON.stringify(key));
    },
    handleTodoItem: function(value) {
        this.isDone = false;
        let mainArray = todoController.getTodoFromLocalstorage('todoList');
        this.id = todoController.idLargestOfLocal(mainArray) + 1;
        let todoItem = new Todo(this.id, value, this.isDone);
        return todoItem;
    },
    idLargestOfLocal: function(mainArray) {
        let lengthArr = mainArray.length;
        if (lengthArr !== 0) return mainArray[lengthArr - 1].id;
        else return 0;
        return lastId;
    },
    addNewTodo: function(todo1, list, time) {
        list.push(todo1, time);
        todoController.setTodoLocalstorage(list);
        return todo1;
    },
    setAttributes: function(element, attrs) {
        for(let key in attrs)element.setAttribute(key, attrs[key]);
    },
    checkboxView: function(todoId) {
        let inpCheckbox = document.createElement('input');
        this.setAttributes(inpCheckbox, {
            type: 'checkbox',
            class: 'itemList',
            id: todoId
        });
        inpCheckbox.addEventListener('click', function(e) {
            let list = todoController.getTodoFromLocalstorage('todoList');
            let id = e.target.getAttribute('id');
            for(let i = 0; i < list.length; i++)if (list[i].id == id) list[i].isDone = e.target.checked;
            todoController.setTodoLocalstorage(list);
            todoController.countItem();
        });
        return inpCheckbox;
    },
    createLableView: function(todo2) {
        let lbContent = document.createElement('label');
        this.setAttributes(lbContent, {
            value: todo2.content,
            class: 'labelContent '
        });
        lbContent.innerHTML = todo2.content;
        return lbContent;
    },
    initTodoITem: function(todo) {
        let item = document.createElement('li');
        item.setAttribute('class', 'todoItem');
        item.addEventListener('dblclick', function(e) {
            item.classList.add('editing');
        });
        return item;
    },
    editInputView: function(todo3) {
        let list = todoController.getTodoFromLocalstorage('todoList');
        let inputEdit = document.createElement('input');
        this.setAttributes(inputEdit, {
            id: todo3.id,
            class: 'edit',
            value: todo3.content,
            type: 'text'
        });
        inputEdit.focus();
        inputEdit.onblur = function(e) {
            todoController.handleTodoUpdate(e);
        };
        inputEdit.onkeypress = function(e) {
            if (event.which == todoController.ENTER_KEY || event.keyCode == todoController.ENTER_KEY) todoController.handleTodoUpdate(e);
        };
        return inputEdit;
    },
    handleTodoUpdate: function(event) {
        let list = todoController.getTodoFromLocalstorage('todoList');
        let inputEdit = event.target;
        let todoItem = new Todo(inputEdit.id, inputEdit.value, false);
        todoController.updateTodoEdit(todoItem, list);
        let editing = document.querySelector('.editing');
        editing.classList.remove('editing');
        todoController.renderTodo();
    },
    updateTodoEdit: function(todo4, list) {
        for(let i = 0; i < list.length; i++)if (list[i].id == todo4.id) {
            list[i].content = todo4.content;
            todoController.setTodoLocalstorage(list);
            break;
        }
        return todo4;
    },
    removeButtonView: function(todo5) {
        let btnRemove = document.createElement('button');
        this.setAttributes(btnRemove, {
            class: 'remove',
            id: todo5.id
        });
        btnRemove.addEventListener('click', function(e) {
            let id = e.target.getAttribute('id');
            todoController.removeTodo(id);
            todoController.renderTodo();
            todoController.countItem();
        });
        return btnRemove;
    },
    todoView: function(todo6) {
        let item = this.initTodoITem(todo6);
        let inpCheckbox = this.checkboxView(todo6.id), lbContent = this.createLableView(todo6), inputEdit = this.editInputView(todo6), btnRemove = this.removeButtonView(todo6);
        item.appendChild(inpCheckbox);
        item.appendChild(lbContent);
        item.appendChild(inputEdit);
        item.appendChild(btnRemove);
        document.querySelector('#todoListView').appendChild(item);
        return item;
    },
    removeTodo: function(id, list) {
        list = todoController.getTodoFromLocalstorage('todoList');
        for(let i = 0; i < list.length; i++)if (list[i].id == id) {
            list.splice(i, 1);
            break;
        }
        todoController.setTodoLocalstorage(list);
    },
    countItem: function(index, list) {
        list = todoController.getTodoFromLocalstorage('todoList');
        index = 0;
        for(let i = 0; i < list.length; i++)if (!list[i].isDone) index++;
        document.getElementById('todoCount').innerHTML = index;
    },
    events: function() {
        todoController.todoInput.onkeyup = function(event) {
            if (event.which == todoController.ENTER_KEY || event.keyCode == todoController.ENTER_KEY) {
                let todoList = todoController.getTodoFromLocalstorage('todoList');
                let todoItem = todoController.handleTodoItem(todoController.todoInput.value);
                let date = new Date();
                let taskDate = date.toLocaleString();
                let time = document.createTextNode(" " + taskDate);
                let todo7 = todoController.addNewTodo(todoItem, todoList, time);
                todoController.todoView(todo7);
                todoController.todoInput.value = '';
                todoController.countItem();
            }
        };
        let addButton = document.getElementById('btnAdd');
        addButton.addEventListener('click', function() {
            let todoList = todoController.getTodoFromLocalstorage('todoList');
            let todoItem = todoController.handleTodoItem(todoController.todoInput.value);
            let todo8 = todoController.addNewTodo(todoItem, todoList);
            todoController.todoView(todo8);
            todoController.todoInput.value = '';
            todoController.countItem();
        });
        let list1 = document.getElementsByClassName('itemList');
        let checkAll = document.getElementById('toggleInputAll');
        checkAll.addEventListener('change', function(e) {
            let check;
            for(let i = 0; i < list1.length; i++){
                list1[i].checked = this.checked;
                check = e.target.checked;
                todoController.checkAllTodo(check);
            }
            todoController.countItem();
        });
        let listWork = document.getElementsByClassName('todoItem');
        let showAllItem = document.getElementById('allWorks');
        showAllItem.addEventListener('click', function() {
            for(let i = 0; i < listWork.length; i++)listWork[i].style.display = 'block';
        });
        let activeItem = document.getElementsByClassName('todoItem');
        let todoActive = document.getElementById('activedItems');
        todoActive.addEventListener('click', function() {
            for(let i = 0; i < list1.length; i++)if (!list1[i].checked) activeItem[i].style.display = 'block';
            else activeItem[i].style.display = 'none';
        });
        let completeItem = document.getElementsByClassName('todoItem');
        let todoCompleted = document.getElementById('completedTodos');
        todoCompleted.addEventListener('click', function() {
            for(let i = 0; i < list1.length; i++)if (list1[i].checked) completeItem[i].style.display = 'block';
            else completeItem[i].style.display = 'none';
        });
        let clearButton = document.getElementById('btnClear');
        clearButton.addEventListener('click', function() {
            let list = todoController.getTodoFromLocalstorage('todoList');
            todoController.clearCompleted(list);
            todoController.setTodoLocalstorage(list);
            todoController.renderTodo();
        });
    },
    clearCompleted: function(list) {
        while(list.find(({ isDone  })=>isDone
        ))list.splice(list.indexOf(list.find(({ isDone  })=>isDone
        )), 1);
    },
    checkAllTodo: function(check, todoList) {
        todoList = todoController.getTodoFromLocalstorage('todoList');
        for(let i = 0; i < todoList.length; i++){
            todoList[i].isDone = check;
            todoController.setTodoLocalstorage(todoList);
        }
    },
    renderTodo: function() {
        let list = todoController.getTodoFromLocalstorage('todoList');
        todoController.removeElement();
        for(let i = 0; i < list.length; i++){
            let element = todoController.todoView(list[i]);
            if (list[i].isDone) element.classList.add('checked');
        }
    },
    removeElement: function() {
        let todoListView = document.getElementById('todoListView');
        while(todoListView.hasChildNodes())todoListView.removeChild(todoListView.firstChild);
    }
};
function changeClass(elem) {
    let a = document.getElementsByTagName('a');
    for(let i = 0; i < a.length; i++)a[i].classList.remove('selected');
    elem.classList.add('selected');
}
let todoController = new TodoController();
let todo = new Todo();
todoController.events();
todoController.renderTodo();
todoController.countItem();

//# sourceMappingURL=index.de5c0784.js.map
