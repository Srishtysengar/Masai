const library = {
    books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],

    addBook(book) {
        if (typeof book !== 'object' || !book.title || !book.author || !book.year) {
            console.log("Book information is incomplete or invalid.");
            return;
        }
        this.books.push(book);
        console.log(`Book "${book.title}" added successfully.`);
    },

    findBookByTitle(title) {
        if (typeof title !== 'string' || !title.trim()) {
            console.log("Invalid title provided.");
            return null;
        }
        return this.books.find(book => book.title === title) || "Book not found.";
    },

    removeBook(title) {
        if (typeof title !== 'string' || !title.trim()) {
            console.log("Invalid title provided.");
            return;
        }
        
        const index = this.books.findIndex(book => book.title === title);
        if (index !== -1) {
            const removedBook = this.books.splice(index, 1);
            console.log(`Book "${removedBook[0].title}" removed successfully.`);
        } else {
            console.log("Book not found.");
        }
    }
};


library.addBook({ title: "1984", author: "George Orwell", year: 1949 });

console.log("Total books in library:", library.books.length);
