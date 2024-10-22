import { Cell } from "./Cell.js";
export class Tetris{


    constructor(host){
        this.host = host
        this.lastFrameTime = 0
        this.width = 300;
        this.height = 500;
        this.w = 5;
        this.rows
        this.cols
        this.grid
        this.grid2
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

        //this.cells.forEach(e=>e.show())
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                if(this.grid[i][j] == 0)
                    this.ctx.fillStyle = 'black'
                else
                    this.ctx.fillStyle = 'white'
                this.ctx.fillRect(i*this.w,j*this.w,this.w, this.w);
                this.grid2[i][j] = 0;
            }
        }

        // for(let i = 0; i < this.cols; i++){
        //     for(let j = 0; j < this.rows; j++){
        //         let state = this.grid[i][j]
        //         if(state === 1){
        //             console.log('x')
        //             let below = this.grid[i][j+1]
        //             if(below === 0){
        //                 // this.grid2[i][j] = 0;
        //                 this.grid2[i][j+1] = 1;
                        
        //             }
        //         }
        //     }
        // }
        for(let i = this.cols-1; i >= 0; i--){
            for(let j = this.rows-1; j >= 0; j--){
                let state = this.grid[i][j]
                if(state === 1){
                    console.log('x')
                    let below = this.grid[i][j+1]
                    if(below === 0){
                        // this.grid2[i][j] = 0;
                        this.grid[i][j] = 0;
                        this.grid2[i][j+1] = 1;
                        
                    }
                }
            }
        }
        this.swapGrids()

        
    }

    swapGrids(){
        // [this.grid, this.grid2] = [this.grid2, this.grid]
        // prom = this.grid2;

        this.grid = this.grid2.map(row => row.slice());
        // console.log(this.grid[10])

    }

    createGrid(){
        // for(let i  = 0; i < this.height/5; i++){
        //     this.grid[i] = []
        //     this.grid2[i] = []
        //     for(let j = 0; j< this.width/5; j++){
        //         let c = new Cell(i, j, 5, this.ctx, this.grid);
        //         this.cells.push(c);
        //         this.grid[i][j] = 0;
        //         this.grid2[i][j] = 0;
        //     }
        // }

    }



    createCanvas(){
        const canvas = document.createElement('canvas');
        canvas.classList.add('canva')
        canvas.width = this.width;
        canvas.height = this.height;
        this.cols = this.width/this.w;
        this.rows = this.height/this.w;
        this.grid = new Array(this.cols).fill(0).map(() => new Array(this.rows).fill(0));
        this.grid2 = new Array(this.cols).fill(0).map(() => new Array(this.rows).fill(0));

        for(let i = 0; i< this.cols; i++){
            for(let j = 0; j <this.rows; j++){
                this.grid[i][j] = 0;
                this.grid2[i][j] = 0;
            }
        }


        this.grid[10][20] = 1;
        this.grid[10][21] = 1;
        this.grid[10][22] = 1;
        this.grid[11][21] = 1;

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

