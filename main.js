// Skapa en class för mini Todo-objekt
class Todo{
        constructor(content, checked, removed) {
            this.content = content;
            this.checked = checked;
            this.removed = removed;
        }
}
// mina globala arrays
let removedItems = [];
let todoItems = [];

window.onload = function () {
    todoStartSetup();
    addListItemsOnClick();
    filterMenu();
    sortButton();
}
// en funktion för att todos ej ska bli avcheckade när dom blir borttagna eller reversed
function checkChecked (todo) {
    if (todo.checked == false) {
        todo.checked = true;
    } else {
        todo.checked = false;
    }
}

// funktionen för att lägga till ett li element i min ul
function addItems (content) {
    let todoList = document.getElementById('myTodoList');
    let inputfield = document.getElementById('newContent');

    let li = document.createElement("li");
    let btn = document.createElement("button");

    // lägger allt i en if för att förhindra tomma li element
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
        
        // eventlistner för att checka av todo om man klickar på li-elementet
        li.addEventListener('click', function() {
            li.classList.toggle("checked");
            checkChecked(todo);
        })
        // eventlistner för att ta bort ett element om man trycker på krysset
        btn.addEventListener('click', function() {
            todo.removed = true;

            let removedItem = btn.parentElement;
            removedItem.classList.toggle("checked");
            checkChecked(todo);
            removedItem.remove();
            removedItem.removeChild(removedItem.lastChild);
            
            //Lägg till ny knapp som gör att man kan "reversa" en borttagning av en todo 
            let reverseBtn = document.createElement("button");
            reverseBtn.innerHTML = "&#8617;";
            reverseBtn.className = "reverseListItem";

            removedItem.appendChild(reverseBtn);
    
            removedItems.push(removedItem);

            // eventlistner för nya reverseknappen som gör att todon kommer tillbaka till hur den var innan den blev borttagen
            reverseBtn.addEventListener('click', function () {
                todo.removed = false;

                removedItem.classList.toggle("checked");
                checkChecked(todo);
                
                let reverseItem = reverseBtn.parentElement;
                reverseItem.removeChild(reverseItem.lastChild);

                reverseItem.appendChild(btn);

                reverseItem.classList.remove("removed");

                let index = removedItems.indexOf(reverseItem);
                if (index > -1) {
                    removedItems.splice(index, 1);
                }
                //Visa standardvyn efter reverse
                standardFilter();
            })

        })
    } else {
        // om textrutan är tom ska denna alert visas
        alert("Du behöver skriva in något i textrutan för att lägga till en ny uppgift!");
    }
    // Rensa textrutan efter man lagt till todo
    inputfield.value = "";
    console.log(todoItems);

    
}

// funktion för att lägga till några standard todos för start
function todoStartSetup () {
    let todoString = ["handla", "tvätta", "göra läxor", "gå till frisören"];
    for (let i = 0; i < todoString.length; i++) {
        let todo = todoString[i];
        addItems(todo);
    }
}

// funktion för att lägga till nya todos från input
function addListItemsOnClick () {
    let addNewContentBtn = document.getElementById('addNewContent');
    addNewContentBtn.addEventListener('click', () => { addItems(document.getElementById('newContent').value); })   
}

// funktion för filtrering
function filterMenu() {
    let filterBtn = document.getElementById('openMenu');
    let standardBtn = document.getElementById("standard");
    let checkedBtn = document.getElementById("checked");
    let undoneBtn = document.getElementById("undone");
    let removedBtn = document.getElementById("removed");

    // eventlistner för att skapa en osynlig menu tills knapptryck
    filterBtn.addEventListener('click', function () {
        let openBtn = document.getElementById('dropdownFilter');
        if (openBtn.className == 'closed') {
            openBtn.className = 'opened';
        } else if (openBtn.className == 'opened') {
            openBtn.className = 'closed';
        }
    })

    // lägga till respektive eventlistner för alla olika knappar
    standardBtn.addEventListener('click', standardFilter)

    checkedBtn.addEventListener('click', checkedFilter)

    undoneBtn.addEventListener('click', undoneFilter)

    removedBtn.addEventListener('click', removedFilter)


}

// visa alla avklarade och oavklarade dvs "standardvyn"
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

// visa alla avklarade
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

// visa alla oavklarade
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

// visa alla borttagna
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

//lägg till eventlistner för "sortera-knappen"
function sortButton () {
    document.getElementById("sort").addEventListener('click', sortTodos);
}

// funktionen för att sortera alla todos i bokstavsordning med hjälp av ".sort();"
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
    // töm html
    todoList.innerHTML = " ";
    
    // lägg till i sorterad ording istället
    for (let i = 0; i <liArray.length; i++) {
        let sortedLi = liArray[i];
        todoList.appendChild(sortedLi);
    }       
}
















