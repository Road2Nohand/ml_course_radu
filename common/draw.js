const { deflate } = require("zlib");

const draw = {};

draw.path = (ctx, path, color="black") => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(...path[0]); // spreading to get x and y of each point in a path
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(...path[i]);
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
}

draw.paths = (ctx, paths, color="black") => {
    for (const path of paths) {
        draw.path(ctx, path, color);
    }
}

// falls Node import
if (typeof module !== "undefined") {
    module.exports = draw;
}