const employees = [
  { name: "Alice", tasksCompleted: 8, rating: 4.7 },
  { name: "Bob", tasksCompleted: 4, rating: 4.0 },
  { name: "Charlie", tasksCompleted: 6, rating: 3.5 },
  { name: "David", tasksCompleted: 10, rating: 4.9 },
  { name: "Eve", tasksCompleted: 7, rating: 2.8 },
];

const filteredEmployees = employees.filter((emp) => emp.tasksCompleted > 5);


const performanceMapped = filteredEmployees.map((emp) => {
  let performance = "";
  if (emp.rating > 4.5) {
    performance = "Excellent";
  } else if (emp.rating >= 3 && emp.rating <= 4.5) {
    performance = "Good";
  } else {
    performance = "Needs Improvement";
  }

  return { name: emp.name, performance };
});

const performancePriority = {
  Excellent: 3,
  Good: 2,
  "Needs Improvement": 1,
};

const sortedEmployees = performanceMapped.sort((a, b) => {
  return (
    performancePriority[b.performance] - performancePriority[a.performance]
  );
});

console.log("Final Evaluated Employees:");
console.log(sortedEmployees);
