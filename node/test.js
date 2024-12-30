const fs = require("fs");

let samples = fs.readFileSync("../data/dataset/samples.json");
samples = JSON.parse(samples);

var avg_size = 0;

const studentNames = samples.map( sample => {
    let name = sample.student_name.toLowerCase();
    avg_size += name.length;
    return name;
});

avg_size = avg_size / samples.length;

console.log(studentNames);
console.log("The Average Name size was:", avg_size.toFixed(2));
