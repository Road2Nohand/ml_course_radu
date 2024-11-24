class SketchPad {

    constructor(container, size=400) {
        // canvas creation
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color: rgba(255, 255, 255, 0.8);
            box-shadow: 0px 0px 10px 2px gray;
            border-radius: 5px;
            border: 1px solid white;
        `;
        container.appendChild(this.canvas);

        // undo button
        this.undoBtn = document.createElement("button");
        this.undoBtn.innerHTML = "Rückgängig ↩";
        this.undoBtn.className = "formItem";
        this.undoBtn.disabled = true;
        container.appendChild(this.undoBtn);

        // draw tools
        this.ctx = this.canvas.getContext("2d");
        this.paths = [];
        this.isDrawing = false;
        this.mousePos = [0, 0];
        this.#addEventListeners();
        this.animate();
    }

    reset() {
        this.ctx = this.canvas.getContext("2d");
        this.paths = [];
        this.#redraw();
    }

    // private method, can only be called within this class
    #addEventListeners() {
        // left-click
        this.canvas.onmousedown = (e, type) => {
            // prevent drawing with left click
            if (e.button === 0 || type === "touch") {
                const mouse = this.#getMousePos(e);
                this.paths.push([mouse]); // array with first position, beeing the place where 1. time left-click.
                this.isDrawing = true;
            }
        }
        // right-click
        this.canvas.oncontextmenu = (e) => {
            e.preventDefault();
            if (e.button === 2) {
                this.#undo();
            }
        }
        // mouse-move
        this.canvas.onmousemove = (e) => {
            const mouse = this.#getMousePos(e);
            this.mousePos = mouse;
            if (this.isDrawing) {
                const lastPath = this.paths[this.paths.length-1];
                lastPath.push(mouse); // every pixel of movement will add
                this.#redraw();
            }
        }
        // mouse-up
        document.onmouseup = () => {
            this.isDrawing = false;
        }

        // touch-eventlistener
        this.canvas.ontouchstart = (e) => {
            const firstEvent = e.touches[0]; // ignore multi-touch
            this.canvas.onmousedown(firstEvent, "touch");
        }
        this.canvas.ontouchmove = (e) => {
            const firstEvent = e.touches[0];
            this.canvas.onmousemove(firstEvent);
        }
        document.ontouchend = (e) => {
            this.canvas.onmouseup(e);
        }

        // Redo Function
        document.onkeydown = (e) => {
            if (e.ctrlKey && e.key === "z") {
                e.preventDefault();
                this.#undo();
            }
        }
        this.undoBtn.onclick = () => this.#undo();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.#redraw();
        this.#drawPencil(this.mousePos);
    }

    #redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);

        // disable redo button if nothing drawed
        this.undoBtn.disabled = this.paths.length > 0 ? false : true;
    }

    #getMousePos(e) {
        const canvas_rect = this.canvas.getBoundingClientRect();
        return [
            // correct mouse position with offset of canvas
            Math.round(e.clientX - canvas_rect.left),
            Math.round(e.clientY - canvas_rect.top) // TODO: <- test if rounding is bad here
        ];
    }

    #undo() {
        this.paths.pop(); // remove last path
        this.#redraw();
    }

    #drawPencil(mouse) {
        const pencilSize = 10;
        this.ctx.beginPath();
        this.ctx.arc(mouse[0], mouse[1], pencilSize / 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        this.ctx.fill();
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1; // make stroke thinner
        this.ctx.stroke();
    }
}