class SketchPad{
    constructor(container, size = 400){
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color: white;
            box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
            border: 2px solid #ccc;
            border-radius: 4px;
        `;
        container.appendChild(this.canvas);

        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);

        this.undoButton = document.createElement("button");
        this.undoButton.innerHTML = "Undo";
        container.appendChild(this.undoButton);

        this.context = this.canvas.getContext("2d");

        this.reset();

        this.#addEventListeners();
    }

    reset(){
        this.paths = [];
        this.isDrawing = false;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.undoButton.disabled = true;
    }

    #addEventListeners(){
        this.canvas.onmousedown = (event) => {
            const mouse = this.#getMouse(event);
            this.paths.push([mouse]);
            this.isDrawing = true;
        }

        this.canvas.onmousemove = (event) => {
            if (this.isDrawing){
                const mouse = this.#getMouse(event);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mouse);
                this.#redraw();
            }
        }
        
        document.onmouseup = () => {
            this.isDrawing = false;
        }

        this.canvas.ontouchstart = (event) => {
            const loc = event.touches[0];
            this.canvas.onmousedown(loc);
        }

        this.canvas.ontouchmove = (event) => {
            const loc = event.touches[0];
            this.canvas.onmousemove(loc);
        }

        document.ontouchend = () => {
            this.canvas.onmouseup();
        }

        this.undoButton.onclick = () => {
            this.paths.pop();
            this.#redraw();
        }
    }

    #redraw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.context, this.paths);
        if (this.paths.length>0){
            this.undoButton.disabled = false;
        }
        else{
            this.undoButton.disabled = true;
        }
    }

    #getMouse = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(event.clientX - rect.left),
            Math.round(event.clientY - rect.top)
        ];
    }
}
