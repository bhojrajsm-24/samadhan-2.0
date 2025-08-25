//task-2 of hackathon...
let marks = [45, 67, 89, 34, 99, 76];
let highest = marks[0]; // pehle element ko highest maan lo

for (let i = 1; i < marks.length; i++) {
  if (marks[i] > highest) {
    highest = marks[i]; // agar bada number milta hai to update kar do
  }
}

console.log("Highest marks are: " + highest);
