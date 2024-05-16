// document.addEventListener('DOMContentLoaded', function() {

const myLibrary = [{title: "Breath", author:"James Nesdtor", pages:"354", year:"2018", read:"yes"}];

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
    let cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = '';
    
    myLibrary.forEach(library => {
        let card = document.createElement('div');
        card.classList.add('card');
        let cards = document.getElementById("cards");
        cards.appendChild(card);
        let list = document.createElement("ul")
        list.classList.add("myUl")
        card.appendChild(list)
        Object.values(library).forEach(value => { 
            let li = document.createElement("li");
            let text = document.createTextNode(value);
            li.appendChild(text);
            list.appendChild(li);
        });
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

