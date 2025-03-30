function analyzeStudentResults(students){
    let passCount = 0;
    let failCount = 0;
    let totalScholarship = 0;

    students.forEach(student => {
        if(student.math >= 40 && student.science>=40 && student.english>=40){
            passCount++;
            totalScholarship += 5000;
        }else{
            failCount++;
        }
    });
    return {
        passCount,
        failCount,
        totalScholarship
    };
}

const studentData =[
    { name: "Aryan", math: 60, science: 50, english: 70 },

    { name: "Ishita", math: 30, science: 40, english: 35 },
    
    { name: "Rahul", math: 80, science: 85, english: 78 },
    
    { name: "Pooja", math: 55, science: 60, english: 58 },
    
    { name: "Krishna", math: 20, science: 30, english: 25 },
    
    { name: "Ananya", math: 90, science: 95, english: 92 },
    
    { name: "Raj", math: 35, science: 45, english: 50 },
    
    { name: "Simran", math: 60, science: 62, english: 61 },
    
    { name: "Manoj", math: 70, science: 75, english: 72 },
    
    { name: "Priya", math: 40, science: 42, english: 39 },
    
    ];

    console.log(analyzeStudentResults(studentData));