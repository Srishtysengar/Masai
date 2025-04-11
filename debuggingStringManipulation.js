function manageStudents() {
    let students = ["Alice", "Bob", "Charlie"];

    // Add "David" at index 1
    students.splice(1, 0, "David");

    // Check if "Eve" is in the list
    console.log('Contains "Eve"', students.includes("Eve"));  // Should return false

    // Convert the array to a string with names separated by commas
    console.log('Student List',students.join(","));  // Expected: "Alice,David,Bob,Charlie"

    return students;
}

let updatedStudents=manageStudents();


//TestCases
//Adding a student At the different Position. eg:end
function testAddAtEnd(){
    let students=[...updatedStudents];
    students.splice(students.length, 0, "Eve");
    console.log("After adding Eve at the End", students.join(", "));
}

//checking the existence of Bob
function testIncludesBob(){
    console.log('Contains "Bob"', updatedStudents.includes("Bob"));
}

//converting to string and checking the output format
function testJoinString(){
    let joined = updatedStudents.join(", ");
    console.log("Joined string:", joined);
}

testAddAtEnd();
testIncludesBob();
testJoinString();