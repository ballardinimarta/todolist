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
    todoStart();
    addListItemsOnClick();
    filter();
    sort();
}


function addItems (content) {
    let todolist = document.getElementById('myTodoList');
    let inputfield = document.getElementById('newcontent');

    let li = document.createElement("li");
    let btn = document.createElement("button");

    if (content != "") {
        btn.innerHTML = "&#10005;";
        btn.type = "button";
        btn.className = "removeListItem";
    
        li.innerHTML = content;
        li.className = "listItem";
    
        todolist.appendChild(li);
        li.appendChild(btn);

        let todo = new Todo(content, false, false)
        todoItems.push(todo);
        
        li.addEventListener('click', function() {
            li.classList.toggle("Checked");
            if (todo.checked == false) {
                todo.checked = true;
            } else {
                todo.checked = false;
            }
        })
        btn.addEventListener('click', function() {
            todo.removed = true;

            let removedItem = btn.parentElement;

            removedItem.classList.toggle("Checked");
            if (todo.checked == false) {
                todo.checked = true;
            } else {
                todo.checked = false;
            }
    
            removedItem.remove();

            removedItem.removeChild(removedItem.lastChild);
            
            let reversebtn = document.createElement("button");
            reversebtn.innerHTML = "&#8617;";
            reversebtn.className = "reverseListItem";
            removedItem.appendChild(reversebtn);
    
            removedItems.push(removedItem);

            reversebtn.addEventListener('click', function () {
                removedItem.classList.toggle("Checked");
                if (todo.checked == false) {
                    todo.checked = true;
                } else {
                    todo.checked = false;
                }
                
                let reverseItem = reversebtn.parentElement;
                reverseItem.removeChild(reverseItem.lastChild);

                reverseItem.appendChild(btn);

                reverseItem.classList.remove("removed");
                todo.removed = false;

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
    
}

function todoStart () {
    let todoString = ["handla", "tvätta", "göra läxor", "gå till frisören"];
    for (let i = 0; i < todoString.length; i++) {
        let todo = todoString[i];
        addItems(todo);
    }
}


function addListItemsOnClick () {
    let addnewcontentbtn = document.getElementById('addnewcontent');
    addnewcontentbtn.addEventListener('click', () => { addItems(document.getElementById('newcontent').value); })   
}


function filter() {
    let filterBtn = document.getElementById('openMenu');
    let standardbtn = document.getElementById("standard");
    let undonebtn = document.getElementById("undone");
    let checkedbtn = document.getElementById("checked");
    let removedbtn = document.getElementById("removed");

    filterBtn.addEventListener('click', function () {
        let openBtn = document.getElementById('dropdownFilter');
        if (openBtn.className == 'closed') {
            openBtn.className = 'opened';
        } else if (openBtn.className == 'opened') {
            openBtn.className = 'closed';
        }
    })

    standardbtn.addEventListener('click', standardFilter)

    checkedbtn.addEventListener('click', checkedFilter)

    undonebtn.addEventListener('click', undoneFilter)

    removedbtn.addEventListener('click', removedFilter)


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
        if (!li.classList.contains("Checked") || removedItems.includes(li)) {
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
        if (li.classList.contains("Checked") || removedItems.includes(li)) {
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
    let todolist = document.getElementById('myTodoList');
    for (let i = 0; i < removedItems.length; i++) {
        removedItem = removedItems[i];
        removedItem.classList.add("removed");
        todolist.appendChild(removedItem);
    }
}

function sort () {
    document.getElementById("sort").addEventListener('click', sortTodos);
}
function sortTodos () {
    let list = document.getElementById("myTodoList");
    let lis = list.getElementsByTagName("LI");
    var lisArray = Array.from(lis);


    lisArray.sort(function(a, b){
        var x = a.innerHTML.toLowerCase();
        var y = b.innerHTML.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
    list.innerHTML = " ";
    
    for (let i = 0; i <lisArray.length; i++) {
        let li = lisArray[i];
        list.appendChild(li);
    }       
}















