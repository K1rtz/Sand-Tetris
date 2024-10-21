import { Cell } from "./Cell.js";
export class Tetris{


    constructor(host){
        this.host = host
        this.lastFrameTime = 0
        this.width = 300;
        this.height = 500;
        this.grid = []
        this.grid2 = []
        this.cells = []

        this.ctx

    }

    start(){
        this.createCanvas()
        this.createGrid()
        this.draw()
        this.animate()
    }  

    draw(){

        this.cells.forEach(e=>e.show())
        for(let i  = 0; i < this.height/5; i++){
            for(let j = 0; j< this.width/5; j++){
                //this.dropDownCheck(this.grid[i][j])
                if(!this.grid[i][j] == 1){
                    this.grid2[i][j] = 0;
                    if(i>0){
                        this.grid2[i-1][j] = 1;
                    }
                }
            }
        }
        this.swapGrids();


        
    }

    swapGrids(){
        [this.grid, this.grid2] = [this.grid2, this.grid]
    }

    createGrid(){
        for(let i  = 0; i < this.height/5; i++){
            this.grid[i] = []
            this.grid2[i] = []
            for(let j = 0; j< this.width/5; j++){
                let c = new Cell(i, j, 5, this.ctx, this.grid);
                this.cells.push(c);
                this.grid[i][j] = 0;
                this.grid2[i][j] = 0;
            }
        }

        this.grid[50][50] = 1;
        this.grid[0][0] = 1;
        this.grid[99][0] = 1;
        this.grid[99][59] = 1;
        this.grid2[1][1] = false;

    }



    createCanvas(){
        const canvas = document.createElement('canvas');
        canvas.classList.add('canva')
        canvas.width = this.width;
        canvas.height = this.height;
        this.host.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
    }
    animate(){
        const frameDelay = 200;
        const currentTime = performance.now()
        if (currentTime - this.lastFrameTime >= frameDelay) {
            this.ctx.resetTransform()
            this.ctx.clearRect(0, 0, this.width, this.height)
            this.draw()
            
            this.lastFrameTime = currentTime
        }
        requestAnimationFrame(()=>this.animate())
    }
}

