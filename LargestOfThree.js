let studentScores = {
    John: 85,
    Emma: 92,
    Sam: 67,
    Bob: 45
  };
  
  function getGrade(score) {
      return score >= 90 ? "A" :
             score >= 80 ? "B" :
             score >= 70 ? "C" :
             score >= 60 ? "D" : "F";
  }
  
  for (let student in studentScores) {
      console.log(`${student} - ${getGrade(studentScores[student])}`);
  }