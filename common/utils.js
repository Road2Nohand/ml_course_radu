const utils = {};

utils.formatPercent = (percent) => {
    return (percent * 100).toFixed(2) + "%";
}

utils.printProgress = (count, max) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent = utils.formatPercent(count/max);
    process.stdout.write(count + "/" + max + " (" + percent + ")");
}

utils.groupBy = (objArray, key) => {
    const groups = {};
    for (let obj of objArray) {
        const value = obj[key];
        if (groups[value] === undefined) {
            groups[value] = Array();
        }
        groups[value].push(obj);
    }
    return groups;
}

if (typeof module !== 'undefined') {
    module.exports = utils;
}