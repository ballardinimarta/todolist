window.onload = function () {
    todoStart();
    addListItemsOnClick();
    filter();
}
let removedItems = [];


function addItems (content) {
    let todolist = document.getElementById('myTodoList');

    let li = document.createElement("li");
    let btn = document.createElement("button");

    btn.innerHTML = "&#10005;";
    btn.type = "button";
    btn.className = "removeListItem";

    li.innerHTML = content;
    li.className = "listItem";

    todolist.appendChild(li);
    li.appendChild(btn);

    li.addEventListener('click', function() {
        li.classList.toggle("Checked");
    })
    btn.addEventListener('click', function() {
        let removedItem = btn.parentElement;

        removedItem.remove();

        removedItems.push(removedItem);

        console.log(removedItems)
    })

}

function todoStart () {
    let todos = ["Handla", "Tvätta", "Göra läxor"];
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
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

    standardbtn.addEventListener('click', function() {        
    })

    undonebtn.addEventListener('click', function() {})

    checkedbtn.addEventListener('click', function() {})

    removedbtn.addEventListener('click', function() {})


}











