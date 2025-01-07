const fs = require("fs");
const constants = require("../common/constants.js");

const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = Array();
let id = 1;

fileNames.forEach( fn => {
    const content = fs.readFileSync(constants.RAW_DIR + "/" + fn);
    const {session, student, drawings} = JSON.parse(content);
    for (let label in drawings) {
        samples.push({
            id,
            label,
            student_name: student,
            student_id: session
        });
        id++;
    }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));