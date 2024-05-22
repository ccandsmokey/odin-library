
let myLibrary = [];
let bookCounter = 0;

function Book(title, author, pages, year,read, id) {
  this.title = title
  this.author = author;
  this.pages = pages;
  this.year = year;
  this.read = read;
  this.id = id;
}

function addBookToLibrary() {
    function handleSubmit(event) {
        event.preventDefault();
      
        const data = new FormData(event.target);
      
        const values = Object.fromEntries(data.entries());

        if (values.read === "on") {
            values.read = "Has been read";
        } else {
            values.read = "Not read yet";
        }

        const bookId = bookCounter++
        console.log(bookId)

        const newBook = new Book(values.title, values.author, values.pages, values.year, values.read, bookId);
      
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

        // Create and append the cover image
        let cover = document.createElement("img");
        cover.src = 'cover-final.png';
        cover.classList.add('cover');
        card.appendChild(cover);

        // Create and append the list for book details
        let list = document.createElement("ul");
        list.classList.add("myUl");
        card.appendChild(list);

        // Create and append the remove button
        let removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        removeButton.textContent = 'Remove'; // Set button text
        removeButton.setAttribute('book-id', library.id);
        card.appendChild(removeButton);

        // Create and append the read button
        let readButton = document.createElement('button');
        readButton.classList.add('readButton');
        readButton.textContent = 'Mark as Read'; // Set button text
        readButton.setAttribute('book-id', library.id);
        card.appendChild(readButton);

        // Append the card to the cards container
        cardsContainer.appendChild(card);




        const labels = {
            title: "Title: ",
            author: "Author: ",
            pages: "Pages: ",
            year: "Year: ",
            read: "Status: ",
        };


        Object.entries(library).forEach(([key, value]) => {
            if (key !== 'id') { // Skip the id key
                let li = document.createElement("li");
                let labelText = document.createTextNode(labels[key]); // Get label text from labels object
                let valueText = document.createTextNode(value);
                li.appendChild(labelText);
                li.appendChild(valueText);
                list.appendChild(li);
            }
        });
    });
    removeBook();
    toggleRead();
}

function removeBook() {
    let removeButtons = document.getElementsByClassName('removeButton');
    Array.from(removeButtons).forEach(button => {
        button.addEventListener("click", function(event) {
            let bookId = parseInt(event.target.getAttribute('book-id'), 10);
            myLibrary = myLibrary.filter(book => book.id !== bookId);
            displayLibrary();
        });
    });
}

function toggleRead() {
    let readButtons = document.getElementsByClassName('readButton');
    Array.from(readButtons).forEach(button => {
        button.addEventListener("click", function(event) {
            let bookId = parseInt(event.target.getAttribute('book-id'), 10);
            let book = myLibrary.find(book => book.id === bookId)
            if (book){
                if (book.read === "Has been read") {
                    book.read = "Not read yet"
                } else {
                    book.read = "Has been read";
                }
        }
            displayLibrary();
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


