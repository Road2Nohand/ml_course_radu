const constants = {
    DATA_DIR: "../data",
    RAW_DIR: "../data/raw",
    DATASET_DIR: "../data/dataset",
    IMG_DIR: "../data/dataset/img",
    JSON_DIR: "../data/dataset/json",
    SAMPLES: "../data/dataset/samples.json"
};

const fs = require("fs");
const fileNames = fs.readdirSync(constants.RAW_DIR);

const samples = Array();