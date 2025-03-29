let book = { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 };

function traverseObject(obj) {
    for (let key in obj) {
        console.log(key + ": " + obj[key]);
    }
}

traverseObject(book);