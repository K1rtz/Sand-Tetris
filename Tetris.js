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

        this.frameDelay = 200;

    }

    start(){
        this.createCanvas()
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

        for(let j = this.rows-1; j >= 0; j--){
            for(let i = this.cols-1; i >= 0; i--){  
                //this.grid2[this.cols-4][this.rows-1] = 1;

                let state = this.grid[i][j]
                if(state === 1){
                    console.log('x')
                    let below = this.grid[i][j+1]
                    if(below != undefined && below === 0){

                        this.grid[i][j] = 0;
                        this.grid[i][j+1] = 1;
                        this.grid2[i][j+1] = 1;
                    }else if(below != undefined && below != 0){
                        let dRight = this.grid[i+1][j+1]
                        let dLeft = this.grid[i-1][j+1]
                        if(dRight != undefined && dRight === 0){
                            this.grid[i][j]  = 0
                            this.grid[i+1][j+1]  = 1
                            this.grid2[i+1][j+1]  = 1
                        }
                        else if(dLeft != undefined && dLeft === 0){
                            this.grid[i][j]  = 0
                            this.grid[i-1][j+1]  = 1
                            this.grid2[i-1][j+1]  = 1
                        }
                        else{
                            this.grid2[i][j] = 1;
                        }
                    }
                    else{
                        this.grid2[i][j] = 1;
                    }
                }
            }
        }
        //console.log(this.grid[this.cols-1][this.rows])
        this.swapGrids()

        
    }

    swapGrids(){
        this.grid = this.grid2.map(row => row.slice());


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

        // this.grid[0][1]= 1;
        // this.grid[0][2]= 1;
        // this.grid[0][3]= 1;
        // this.grid[0][4]= 1;
        // this.grid[0][5]= 1;

        // this.grid[4][90] = 1;
        // this.grid[4][91] = 1;
        // // this.grid[4][92] = 1;
        // this.grid[5][90] = 1;
        // this.grid[5][91] = 1;
        // this.grid[5][92] = 1;
        // this.grid[6][90] = 1;
        // this.grid[6][91] = 1;
        // this.grid[6][92] = 1;
        // this.grid[10][17] = 1;
        // this.grid[11][18] = 1;
        // this.grid[11][17] = 1;
        // this.grid[10][19] = 1;
        // this.grid[11][19] = 1;
        // this.grid[10][20] = 1;
        // this.grid[11][20] = 1;
        // this.grid[10][21] = 1;
        // this.grid[10][22] = 1;
        // this.grid[11][22] = 1;
        // this.grid[12][22] = 1;
        // this.grid[13][22] = 1;
        // this.grid[11][21] = 1;
        // this.grid[12][21] = 1;
        // this.grid[14][22] = 1;
        // this.grid[13][21] = 1;
        // this.grid[14][21] = 1;
        for(let i = 10; i<13; i++){
            for(let j = 80; j<83;j++){
                this.grid[i][j] = 1;
            }
        }

        this.host.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
    }
    animate(){
        //const frameDelay = 200;
        const currentTime = performance.now()
        if (currentTime - this.lastFrameTime >= this.frameDelay) {
            this.ctx.resetTransform()
            this.ctx.clearRect(0, 0, this.width, this.height)
            this.draw()
            
            this.lastFrameTime = currentTime
        }
        requestAnimationFrame(()=>this.animate())
    }
}

