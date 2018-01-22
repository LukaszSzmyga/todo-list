var data = JSON.parse(localStorage.getItem('todoList')) || {
    todo: [],
    done: []
};

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

var listToDo = document.querySelector('#todo');
var listDone = document.querySelector('#done');
var submitButton = document.querySelector('button');
var input = document.querySelector('input');
var ul = document.querySelector('ul');

function addData() {    
    var value = input.value;
    input.value = '';
    
    if(value === '' || value === ' ') {
        return alert('This field couldn\'t be empty!');
    };
    
    data.todo.push(value);
    dataObjectUpdated();
    
    var li = document.createElement('li');
    var span = document.createElement('span');
    var doneButton = document.createElement('button');
    var removeButton = document.createElement('button');
    
    li.appendChild(span);
    span.textContent = value;
    li.appendChild(doneButton);
    li.appendChild(removeButton);
    listToDo.appendChild(li);
    
    listToDo.insertBefore(li, listToDo.childNodes[0]);
    
    removeButton.addEventListener('click', function(e) {
        listToDo.removeChild(li);
        data.todo.splice(data.todo.indexOf(value), 1);
    });
    
    removeButton.addEventListener('click', function(e) {
        listDone.removeChild(li);
        data.done.splice(data.done.indexOf(value), 1);
    });
    
    doneButton.addEventListener('click', function(e) {
        listDone.appendChild(li);
        listDone.insertBefore(li, listDone.childNodes[0]);
        
        data.todo.splice(data.todo.indexOf(value), 1);
        data.done.push(value);
        dataObjectUpdated();
    });
    
    function rename() {
        var newText = prompt('What should this item be renamed to?')
        
        if (!newText || newText === '' || newText === ' ') {
            return false;
        }
        span.textContent = newText;
    };
    span.addEventListener('dblclick', rename);
};

submitButton.addEventListener('click', addData);