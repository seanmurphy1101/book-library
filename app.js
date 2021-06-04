let myLibrary = [];
let inputTitle = "";
let inputAuthor = "";
let inputPages = 0;
let inputRead = false;

// Book constructor function
// Book(titile: String, author: String, pages: number, read: boolean): Void
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => title+","+author+","+pages.toString();
}

// addBookToLibrary(): Void
function addBookToLibrary(){
    if (inputTitle==="" || inputAuthor===""){
        alert("please fill all fields");
        return;
    }
    else if (inputPages<1){
        alert("please enter a valid page number");
        return;
    }
    document.getElementById("inputT").value = "";
    document.getElementById("inputA").value = "";
    document.getElementById("inputP").value = "";
    document.getElementById("inputR").checked = false;
    myLibrary.push(new Book(inputTitle, inputAuthor, inputPages, inputRead));
    display();
    updateLocalStorage();
}

// display(): Void
function display(){
    // reset and access container
    clearContainer();
    let c = document.getElementById("catalogue");
    myLibrary.forEach(function(e){
        for (let i =0; i<3; ++i){
            // create div elements for title, author, and pages
            let div = document.createElement("div");
            div.setAttribute('id', myLibrary.indexOf(e).toString());
            div.classList.add("grid-item");
            div.classList.add(myLibrary.indexOf(e).toString());
            if (i===0){
                div.innerHTML = e.title;
            }
            else if (i===1){
                div.innerHTML = e.author;
            }
            else {
                div.innerHTML = e.pages;
            }
            c.appendChild(div);
        }
        // create read button and set beginning state
        let button = document.createElement("button");
        button.innerHTML = e.read ? "read" : "not read";
        button.classList.add(e.read ? "button1" : "button2");
        // add event listerner to switch states on click
        button.addEventListener('click', function(event){toggleButton((myLibrary.indexOf(e)+myLibrary.length).toString())});
        button.setAttribute('id', (myLibrary.indexOf(e)+myLibrary.length).toString());
        // create a wrapper for the button
        let wrapper = document.createElement("div");
        wrapper.appendChild(button);
        wrapper.classList.add(myLibrary.indexOf(e).toString());
        wrapper.classList.add("button-wrap");
        // create another wrapper and the remove button, which callls remove on cclick
        let wrapper2 = document.createElement("div");
        wrapper2.classList.add("button-wrap");
        let button2 = document.createElement("button");
        wrapper2.appendChild(button2);
        wrapper2.classList.add(myLibrary.indexOf(e).toString());
        button2.innerHTML = "remove";
        button2.classList.add("button3");
        button2.classList.add("remove");
        button2.addEventListener('click', function(){remove(myLibrary.indexOf(e).toString())});
        // append both to container
        c.appendChild(wrapper);
        c.appendChild(wrapper2);
    });
}

// toggleButton(id: String): Void
function toggleButton(id){
    let button = document.getElementById(id);
    button.innerHTML = button.innerHTML === "read" ? "not read" : "read";
    button.classList.toggle("button1");
    button.classList.toggle("button2");
}

// remove(row: number): Void
function remove(row){
    // remove book from library and redisplay so that rows have proper class numbers
    myLibrary.splice(row, 1);
    display();
    updateLocalStorage();

}

function setTitle(){
    inputTitle = document.getElementById("inputT").value;
}

function setAuthor(){
    inputAuthor = document.getElementById("inputA").value;
}

function setPages(){
    inputPages = document.getElementById("inputP").value;
}

function setRead(){
    inputRead = document.getElementById("inputR").checked;
}

// clearContainer(): Void
function clearContainer(){
    // remove all div elements except for the title
    let container = document.getElementById("catalogue");
    let children = container.querySelectorAll("div");
    let newArr = Array.from(children).filter((e) => !e.classList.contains("title-wrap"));
    console.log(newArr);
    newArr.forEach((e) => container.removeChild(e));
}

function checkLocalStorage() {
    try {
        if (localStorage.getItem("myLibrary")) {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        return myLibrary;
        }
    }
    catch(exception){
        console.log(exception);
    }
}

function updateLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

myLibrary.push(new Book("Example Title", "Author", 400, false));    
checkLocalStorage();
display();