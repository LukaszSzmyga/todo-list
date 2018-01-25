var data = JSON.parse(localStorage.getItem('todoList')) || {
    todo: [],
    done: []
};

function updateDataInLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

document.addEventListener("DOMContentLoaded", function() {

var listToDo = document.querySelector('#todo');
var listDone = document.querySelector('#done');
var submitButton = document.querySelector('#add');
var newTask = document.querySelector('#adding');

function addData() {    
    var value = newTask.value;
    newTask.value = '';
    
    if(value === '' || value === ' ') {
        return alert('This field couldn\'t be empty!');
    };
    
    data.todo.push(value);
    updateDataInLocalStorage();
    
    var li = document.createElement('li');
    var span = document.createElement('span');
    var doneButton = document.createElement('button');
    var removeButton = document.createElement('button');
    var editButton = document.createElement('button');
    
    doneButton.classList.add('done');
    removeButton.classList.add('remove');
    editButton.classList.add('edit');
    
    li.appendChild(span);
    span.textContent = value;
    li.appendChild(doneButton);
    li.appendChild(removeButton);
    li.appendChild(editButton);
    editButton.textContent = 'Edit';
    listToDo.appendChild(li);
    
    listToDo.insertBefore(li, listToDo.childNodes[0]);
    
    removeButton.addEventListener('click', function() {
        var parent = this.parentNode.parentNode;
        var id = parent.id;
        
        if (id === 'todo') {
            data.todo.splice(data.todo.indexOf(value), 1);            
        } else {
            data.done.splice(data.done.indexOf(value), 1);
        }
        updateDataInLocalStorage();
        
        parent.removeChild(li);
    })
    
    doneButton.addEventListener('click', function() {
        listDone.appendChild(li);
        listDone.insertBefore(li, listDone.childNodes[0]);
        
        data.todo.splice(data.todo.indexOf(value), 1);
        data.done.push(value);
        updateDataInLocalStorage();
    });
    
    editButton.onclick = function() {
        var listItem = this.parentNode;
        var newInput = document.createElement('input');
        var replaceButton = document.createElement('button');
        replaceButton.textContent = 'add';
        newInput.type = 'text';
        newInput.value = span.textContent;
        span = listItem.replaceChild(newInput, span);
        replaceButton.classList.add('replace');
        listItem.appendChild(replaceButton);
        
        replaceButton.onclick = function() {
            replaceValue = newInput.value;
            span.textContent = replaceValue;
            newInput = listItem.replaceChild(span, newInput);
            listItem.removeChild(replaceButton);
        };
    };
};
    
submitButton.addEventListener('click', addData);
 
});