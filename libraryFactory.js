function Book(title, author) {
    return {
        title: title,
        author: author,
        details: function () {
            console.log(`Title: ${this.title}, Author: ${this.author}`);
        }
    };
}

function createLibrary() {
    const books = [];

    return {
        addBook: function(book) {
            books.push(book);
        },
        removeBook: function(title) {
            const index = books.findIndex(book => book.title === title);
            if (index !== -1) {
                books.splice(index, 1);
            } else {
                console.log(`Book with title "${title}" not found.`);
            }
        },
        listBooks: function() {
            if (books.length === 0) {
                console.log("No books in the library.");
            } else {
                books.forEach(book => book.details());
            }
        }
    };
}

const library = createLibrary();

const book1 = Book("To Kill a Mockingbird", "Harper Lee");
const book2 = Book("1984", "George Orwell");

library.addBook(book1);
library.addBook(book2);
library.listBooks();
library.removeBook("1984");
library.listBooks();