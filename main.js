class Todo{
        constructor(content, checked, removed) {
            this.content = content;
            this.checked = checked;
            this.removed = removed;
        }
}

let removedItems = [];
let todoItems = [];

window.onload = function () {
    todoStartSetup();
    addListItemsOnClick();
    filterMenu();
    sortButton();
}

function checkChecked () {
    if (todo.checked == false) {
        todo.checked = true;
    } else {
        todo.checked = false;
    }
}


function addItems (content) {
    let todoList = document.getElementById('myTodoList');
    let inputfield = document.getElementById('newContent');

    let li = document.createElement("li");
    let btn = document.createElement("button");

    if (content != "") {
        btn.innerHTML = "&#10005;";
        btn.type = "button";
        btn.className = "removeListItem";
    
        li.innerHTML = content;
        li.className = "listItem";
    
        todoList.appendChild(li);
        li.appendChild(btn);

        let todo = new Todo(content, false, false)
        todoItems.push(todo);
        
        li.addEventListener('click', function() {
            li.classList.toggle("checked");
            checkChecked();
        })
        btn.addEventListener('click', function() {
            todo.removed = true;

            let removedItem = btn.parentElement;
            removedItem.classList.toggle("checked");
            checkChecked();
            removedItem.remove();
            removedItem.removeChild(removedItem.lastChild);
            
            let reverseBtn = document.createElement("button");
            reverseBtn.innerHTML = "&#8617;";
            reverseBtn.className = "reverseListItem";

            removedItem.appendChild(reverseBtn);
    
            removedItems.push(removedItem);

            reverseBtn.addEventListener('click', function () {
                todo.removed = false;

                removedItem.classList.toggle("checked");
                checkChecked();
                
                let reverseItem = reverseBtn.parentElement;
                reverseItem.removeChild(reverseItem.lastChild);

                reverseItem.appendChild(btn);

                reverseItem.classList.remove("removed");

                let index = removedItems.indexOf(reverseItem);
                if (index > -1) {
                    removedItems.splice(index, 1);
                }
                standardFilter();
            })

        })
    } else {
        alert("Du behöver skriva in något i textrutan för att lägga till en ny uppgift!");
    }
    inputfield.value = "";
    console.log(todoItems);

    
}

function todoStartSetup () {
    let todoString = ["handla", "tvätta", "göra läxor", "gå till frisören"];
    for (let i = 0; i < todoString.length; i++) {
        let todo = todoString[i];
        addItems(todo);
    }
}


function addListItemsOnClick () {
    let addNewContentBtn = document.getElementById('addNewContent');
    addNewContentBtn.addEventListener('click', () => { addItems(document.getElementById('newContent').value); })   
}


function filterMenu() {
    let filterBtn = document.getElementById('openMenu');
    let standardBtn = document.getElementById("standard");
    let checkedBtn = document.getElementById("checked");
    let undoneBtn = document.getElementById("undone");
    let removedBtn = document.getElementById("removed");

    filterBtn.addEventListener('click', function () {
        let openBtn = document.getElementById('dropdownFilter');
        if (openBtn.className == 'closed') {
            openBtn.className = 'opened';
        } else if (openBtn.className == 'opened') {
            openBtn.className = 'closed';
        }
    })

    standardBtn.addEventListener('click', standardFilter)

    checkedBtn.addEventListener('click', checkedFilter)

    undoneBtn.addEventListener('click', undoneFilter)

    removedBtn.addEventListener('click', removedFilter)


}
function standardFilter () {   
    let lis = document.getElementsByTagName("li");
    
    for (let i = 0; i < lis.length; i++) {
        let li = lis[i];

        if (removedItems.includes(li)) {
            li.style.display = "none";
        } else {
            li.style.display = "flex";
        }
    }
}

function checkedFilter () {
    let lis = document.getElementsByTagName("li");

    for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (!li.classList.contains("checked") || removedItems.includes(li)) {
            li.style.display = "none";

        } else {
            li.style.display = "flex";

        }
    }
}

function undoneFilter () {
    let lis = document.getElementsByTagName("li");

    for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.classList.contains("checked") || removedItems.includes(li)) {
            li.style.display = "none";
        } else {
            li.style.display = "flex";
        }
        
    }
}

function removedFilter () {
    let lis = document.getElementsByTagName("li");
    
    for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.classList.contains("listItem") && removedItems.includes(li)) {
            li.style.display = "flex";
        } else {
            li.style.display = "none";
        }
    }
    let todoList = document.getElementById('myTodoList');
    for (let i = 0; i < removedItems.length; i++) {
        removedItem = removedItems[i];
        removedItem.classList.add("removed");
        todoList.appendChild(removedItem);
    }
}

function sortButton () {
    document.getElementById("sort").addEventListener('click', sortTodos);
}

function sortTodos () {
    let todoList = document.getElementById("myTodoList");
    let lis = todoList.getElementsByTagName("li");
    var liArray = Array.from(lis);


    liArray.sort(function(a, b){
        var x = a.innerHTML.toLowerCase();
        var y = b.innerHTML.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
    todoList.innerHTML = " ";
    
    for (let i = 0; i <liArray.length; i++) {
        let sortedLi = liArray[i];
        todoList.appendChild(sortedLi);
    }       
}
















