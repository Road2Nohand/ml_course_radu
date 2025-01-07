//#region Globals

const fs = require("fs");
const draw = require("../common/draw.js");
const constants = require("../common/constants.js");
const utils = require("../common/utils.js");

const { createCanvas } = require("canvas");
const CANVAS = createCanvas(400, 400);
const CTX = CANVAS.getContext("2d");

//#endregion Globals


//#region Functions

function generateImageFile(outFile, paths) {
    // canvas needs to be cleared after every print
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    draw.paths(CTX, paths);
    const buffer = CANVAS.toBuffer("image/png");
    fs.writeFileSync(outFile, buffer);
    console.log("Saved .png of drawing");
}

//#endregion Functions


//#region Main
const fileNames = fs.readdirSync(constants.RAW_DIR);

const samples = Array();
let id = 1;

// go trough all files in /data/raw
fileNames.forEach( fn => {
    full_fn = constants.RAW_DIR + "/" + fn
    console.log("Reading File:", full_fn);
    const content = fs.readFileSync(full_fn);
    const {session, student, drawings} = JSON.parse(content);
    // get each drawing
    for (let label in drawings) {
        samples.push({
            id,
            label,
            student_name: student,
            student_id: session
        });

        // save the drawing with the id
        const paths = drawings[label];
        // save as JSON
        json_file_name_with_id = constants.JSON_DIR + "/" + id + ".json";
        console.log(`Saved drawing ${label} from user ${student} with filename ${json_file_name_with_id}`);
        fs.writeFileSync(json_file_name_with_id, JSON.stringify(paths));
        
        // save as IMG
        img_file_name_with_id = constants.IMG_DIR + "/" + id + ".png";
        generateImageFile(img_file_name_with_id, paths);

        utils.printProgress(id, fileNames.length*8); // 8 drawings per student

        id++;
    }
});

// save in samples.json
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));


//#endregion Main
