// document.addEventListener('DOMContentLoaded', function() {

const myLibrary = [{title: "bible", author:"god", pages:"10001", year:"1bc", read:"yes"}];

function Book(title, author, pages, year,read) {
  this.title = title
  this.author = author;
  this.pages = pages;
  this.year = year;
  this.read = read;
}

function addBookToLibrary() {
    function handleSubmit(event) {
        event.preventDefault();
      
        const data = new FormData(event.target);
      
        const values = Object.fromEntries(data.entries());
        
        const newBook = new Book(values.title, values.author, values.pages, values.year, values.read);
      
        myLibrary.push(newBook);

        displayLibrary();

        event.target.reset();

        $('.center').hide();
    }
    
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
}

function displayLibrary() {
    const table = document.getElementById("book");
    
    // Clear the table
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    
    let card = document.getElementById("book")
    myLibrary.forEach(library => {
        let tr = document.createElement('tr');
        Object.values(library).forEach(value => { 
            let td = document.createElement('td');
            td.innerHTML= value;
            tr.appendChild(td);
        });
        card.appendChild(tr);
    });
}

// Call addBookToLibrary once DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addBookToLibrary();
    displayLibrary();
    $(document).ready(function() {
        $('#show').on('click', function() {
            $('.center').show();
        });
    
        $('#close').on('click', function() {
            $('.center').hide();
            $('#show').show();
        });
    });
});

