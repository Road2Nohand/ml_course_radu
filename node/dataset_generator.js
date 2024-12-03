//#region Globals

const fs = require("fs");
const draw = require("../common/draw.js");
const { createCanvas } = require("canvas");

const CANVAS = createCanvas(400, 400);
const CTX = CANVAS.getContext("2d");

const constants = {
    DATA_DIR: "../data",
    RAW_DIR: "../data/raw",
    DATASET_DIR: "../data/dataset",
    IMG_DIR: "../data/dataset/img",
    JSON_DIR: "../data/dataset/json",
    SAMPLES: "../data/dataset/samples.json"
};

//#endregion Globals


//#region Functions

function generateImageFile(outFile, paths) {
    // canvas needs to be cleared after every print
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    draw.paths(CTX, paths);
    const buffer = CANVAS.toBuffer("image/png");
    fs.writeFileSync(outFile, buffer);
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
        console.log("Saved .png of drawing");

        id++;
    }
});

// save in samples.json
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));


//#endregion Main
