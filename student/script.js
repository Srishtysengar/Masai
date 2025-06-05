//selecting the DOM eklements
const form = document.getElementById("form");
const submitbtn = document.getElementById("submit");
const search = document.getElementById("search");
const table = document.getElementById("studentTable");

let student = [];            //array storing the student objects
let editIndex = -1;          //to keep a track that whether we are editing existing student or not(-1 = not editing)

form.addEventListener("submit", function (e) {
  e.preventDefault();        //preventing the reload of a page when a form is submitting

  //fetching the form inputs now
  const nameInput = document.getElementById("name");
  const batchInput = document.getElementById("batch");
  const ageInput = document.getElementById("age");
  const scoreInput = document.getElementById("score");

  const name = nameInput.value.trim();
  const batch = batchInput.value.trim();
  const age = +ageInput.value;
  const score = +scoreInput.value;

  //validating inputs
  if (!name || !batch || age <= 0 || score < 0 || score > 100) {
    alert("Enter Valid Data");
    return;
  }

  const newStudent = { name, batch, age, score };

  // edit functionality
  if (editIndex === -1) {
    student.push(newStudent);
  } else {
    student[editIndex] = newStudent;
    editIndex = -1;
    submitbtn.textContent = "Submit";
  }

  form.reset();
  updateTable();
});

//Update table functionality
function updateTable() {
  table.innerHTML = "";

  const searchText = search.value.toLowerCase();

  student.forEach((stu, index) => {
    if (!stu.name.toLowerCase().includes(searchText)) return;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${stu.name}</td>
      <td>${stu.batch}</td>
      <td>${stu.age}</td>
      <td>${stu.score}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

//edit the student details
function editStudent(index) {
  const stu = student[index];

  document.getElementById("name").value = stu.name;
  document.getElementById("batch").value = stu.batch;
  document.getElementById("age").value = stu.age;
  document.getElementById("score").value = stu.score;

  editIndex = index;
  submitbtn.textContent = "Update Student";
}

// delete a student detail using index
function deleteStudent(index) {
  student.splice(index, 1);
  updateTable();
}

// sorting functions
function sortByAge() {
  student.sort((a, b) => a.age - b.age);
  updateTable();
}

function sortByScore() {
  student.sort((a, b) => b.score - a.score);
  updateTable();
}

search.addEventListener("input", updateTable);
