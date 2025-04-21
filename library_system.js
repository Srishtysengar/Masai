function Book(title, author, isAvailable = true) {
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
}

function Member(name) {
    this.name = name;
    this.borrowedBooks = [];
}

Member.prototype.borrowBook = function(book) {
    if (!book.isAvailable) {
        console.log(book.title + " is already borrowed.");
        return;
    }
    if (this.borrowedBooks.length >= 3) {
        console.log(this.name + " cannot borrow more than 3 books.");
        return;
    }
    book.isAvailable = false;
    this.borrowedBooks.push(book.title);
    console.log(this.name + " borrowed " + book.title);
};

function PremiumMember(name) {
    Member.call(this, name);
    this.specialCollectionAccess = true;
}

PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;

PremiumMember.prototype.borrowBook = function(book) {
    if (!book.isAvailable) {
        console.log(book.title + " is already borrowed.");
        return;
    }
    if (this.borrowedBooks.length >= 5) {
        console.log(this.name + " cannot borrow more than 5 books.");
        return;
    }
    book.isAvailable = false;
    this.borrowedBooks.push(book.title);
    console.log(this.name + " borrowed " + book.title);
};

let book1 = new Book("1984", "George Orwell");
let book2 = new Book("To Kill a Mockingbird", "Harper Lee");
let book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
let book4 = new Book("Moby Dick", "Herman Melville");
let book5 = new Book("War and Peace", "Leo Tolstoy");
let book6 = new Book("Ulysses", "James Joyce");

let regularMember = new Member("Alice");
let premiumMember = new PremiumMember("Bob");

let borrowForAlice = regularMember.borrowBook.bind(regularMember);
let borrowForBob = premiumMember.borrowBook.bind(premiumMember);

borrowForAlice(book1);
borrowForAlice(book2);
borrowForAlice(book3);
borrowForAlice(book4);

borrowForBob(book4);
borrowForBob(book5);
borrowForBob(book6);